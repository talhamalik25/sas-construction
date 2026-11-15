import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';

const directory = 'artifacts/premium-redesign/baseline';
await mkdir(directory, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const viewports = [
  { width: 1920, height: 1080, name: '1920' },
  { width: 1440, height: 900, name: '1440' },
  { width: 1366, height: 768, name: '1366' },
  { width: 1024, height: 768, name: '1024' },
  { width: 768, height: 1024, name: '768' },
  { width: 390, height: 844, name: '390' },
  { width: 375, height: 812, name: '375' },
  { width: 320, height: 740, name: '320' },
];

const auditResults = [];

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://localhost:3208', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Measure overflow & clipped elements
  const metrics = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const overflowing = [...document.querySelectorAll('*')]
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.right > docWidth + 1;
      })
      .map(el => ({ tag: el.tagName, id: el.id, class: el.className }));
    return {
      docWidth,
      scrollWidth: document.documentElement.scrollWidth,
      hasOverflow: document.documentElement.scrollWidth > docWidth,
      overflowingCount: overflowing.length,
      overflowing: overflowing.slice(0, 5)
    };
  });

  // Full page screenshot
  await page.screenshot({ path: `${directory}/fullpage-${vp.name}.png`, fullPage: true });

  // Section screenshots
  const sections = ['about-experience', 'services', 'projects', 'how-we-work', 'why-sas', 'project-inquiry', 'contact'];
  for (const s of sections) {
    const loc = page.locator(`#${s}`);
    if (await loc.count()) {
      await loc.scrollIntoViewIfNeeded();
      if (['1440', '390'].includes(vp.name)) {
        await loc.screenshot({ path: `${directory}/${s}-${vp.name}.png` });
      }
    }
  }

  // Accessibility
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();

  auditResults.push({
    viewport: vp,
    metrics,
    violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description }))
  });

  console.log(`Audited ${vp.width}x${vp.height}: overflow=${metrics.hasOverflow}, violations=${axe.violations.length}`);
  await page.close();
  await context.close();
}

await writeFile(`${directory}/audit-results.json`, JSON.stringify(auditResults, null, 2));
await browser.close();
