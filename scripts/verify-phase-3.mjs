import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const baseURL = process.env.QA_BASE_URL || 'http://localhost:3200';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const problems = [];
await mkdir('artifacts/phase-3', { recursive: true });

const viewports = [
  [1440, 900],
  [1366, 768],
  [768, 1024],
  [390, 844],
  [320, 740],
];

try {
  for (const [width, height] of viewports) {
    console.log(`Checking viewport ${width}x${height}...`);
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    page.on('pageerror', (err) => problems.push(err.message));
    page.on('console', (msg) => { if (msg.type() === 'error') problems.push(msg.text()); });
    page.on('response', (res) => { if (res.status() >= 400) problems.push(`${res.status()} ${res.url()}`); });

    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const section = page.locator('#services');
    await section.scrollIntoViewIfNeeded();

    // Verify Heading & Structure
    assert.equal(await page.locator('h1').count(), 1);
    const h2Text = (await section.locator('h2').innerText()).trim();
    assert.equal(h2Text, 'Expertise Built on Experience.');

    // Verify negative check
    const bodyText = await page.locator('body').innerText();
    assert.ok(!/civil\s+works/i.test(bodyText), 'Must never contain the rejected phrase "civil works"');

    // Verify No Horizontal Overflow
    const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
    assert.ok(noOverflow, `Overflow at ${width}x${height}`);

    // Verify visible images loaded
    const visibleImages = await section.locator('img').evaluateAll((imgs) => {
      const visible = imgs.filter((img) => img.offsetParent !== null);
      return visible.length > 0 && visible.every((img) => img.complete && img.naturalWidth > 0);
    });
    assert.ok(visibleImages, 'Visible services images loaded and rendered');

    // Accessibility check
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    assert.deepEqual(audit.violations.map((v) => `${v.id}: ${v.description}`), [], `Accessibility violations at ${width}px`);

    if (width >= 1024) {
      // Desktop: Test tab selection
      const tabs = section.locator('[role="tab"]');
      assert.equal(await tabs.count(), 6);

      // Click second tab (Earthwork & Backfilling)
      await tabs.nth(1).click();
      assert.equal(await tabs.nth(1).getAttribute('aria-selected'), 'true');
      assert.equal(await tabs.nth(0).getAttribute('aria-selected'), 'false');
      assert.ok((await section.locator('[role="tabpanel"] h3').innerText()).includes('Earthwork & Backfilling'));

      // Keyboard navigation (ArrowDown)
      await tabs.nth(1).focus();
      await page.keyboard.press('ArrowDown');
      assert.equal(await tabs.nth(2).getAttribute('aria-selected'), 'true');
      assert.ok((await section.locator('[role="tabpanel"] h3').innerText()).includes('Excavation, Cutting & Filling'));

      // Reset to first
      await tabs.nth(0).click();
    } else {
      // Mobile / Tablet: Test accordion interaction
      const accordions = section.locator('[aria-controls^="accordion-panel-"]');
      assert.equal(await accordions.count(), 6);

      // Tap on second accordion item
      const secondBtn = accordions.nth(1);
      await secondBtn.click();
      assert.equal(await secondBtn.getAttribute('aria-expanded'), 'true');
      const panel = section.locator('#accordion-panel-earthwork-backfilling');
      assert.ok(await panel.isVisible(), 'Accordion panel opened');
    }

    // Capture screenshot
    await section.screenshot({ path: `artifacts/phase-3/services-${width}x${height}.png` });

    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.ok(await section.isVisible(), 'Services section remains visible in reduced-motion');

    results.push({
      viewport: `${width}x${height}`,
      overflow: false,
      axeViolations: 0,
      headingVerified: true,
      imagesLoaded: true,
      interaction: 'passed',
      reducedMotion: 'passed',
    });

    await context.close();
  }

  assert.deepEqual(problems, [], `Browser console/network problems: ${problems.join('; ')}`);
  await writeFile('artifacts/phase-3/browser-results.json', JSON.stringify({ baseURL, results, problems }, null, 2));
  console.log('Phase 3 verification passed successfully:');
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
