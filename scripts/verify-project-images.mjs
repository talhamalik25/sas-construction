import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const baseURL = process.env.QA_BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const problems = [];
await mkdir('artifacts/image-research', { recursive: true });

const viewports = [
  [1440, 900],
  [1366, 768],
  [768, 1024],
  [390, 844],
  [320, 740],
];

try {
  for (const [width, height] of viewports) {
    console.log(`Checking Phase 4 Projects on viewport ${width}x${height}...`);
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    page.on('pageerror', (err) => problems.push(err.message));
    page.on('console', (msg) => { if (msg.type() === 'error') problems.push(msg.text()); });
    page.on('response', (res) => { if (res.status() >= 400) problems.push(`${res.status()} ${res.url()}`); });

    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const section = page.locator('#projects');
    await section.scrollIntoViewIfNeeded();

    // Verify Heading
    assert.equal(await page.locator('h1').count(), 1);
    const h2Text = (await section.locator('h2').innerText()).trim();
    assert.equal(h2Text, 'Built Through Experience. Proven on the Ground.');

    // Verify negative checks
    const bodyText = await page.locator('body').innerText();
    assert.ok(!/civil\s+works/i.test(bodyText), 'Must never contain the rejected phrase "civil works"');
    assert.ok(!/partner/i.test(section.innerText().then ? await section.innerText() : ''), 'NLC/FWO must not be claimed as partners');

    // Verify No Horizontal Overflow
    const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
    assert.ok(noOverflow, `Overflow at ${width}x${height}`);

    // Await visible image decoding
    await section.locator('img').evaluateAll(async (elements) => {
      await Promise.all(elements.map((img) => img.decode().catch(() => {})));
    });

    // Verify visible images loaded
    const visibleImages = await section.locator('img').evaluateAll((imgs) => {
      const visible = imgs.filter((img) => img.offsetParent !== null);
      return visible.length > 0 && visible.every((img) => img.complete && img.naturalWidth > 0);
    });
    assert.ok(visibleImages, 'Visible project images loaded and rendered');

    assert.equal(await section.locator('img').count(), 1, 'Only the approved location photograph is rendered');
    assert.equal(await section.locator('[data-project-panel]').count(), 2, 'Featured unverified photos use text panels');
    assert.ok(await section.getByText(/Location reference.*not evidence of SAS execution/).isVisible());
    // Accessibility check
    const audit = await new AxeBuilder({ page }).include('#projects').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    assert.deepEqual(audit.violations.map((v) => `${v.id}: ${v.description}`), [], `Accessibility violations at ${width}px`);

    // Verify filter interaction
    const filterButtons = section.locator('[role="tablist"] button');
    assert.equal(await filterButtons.count(), 5);

    // Filter to "Roads & Paving"
    await filterButtons.nth(1).click();
    assert.equal(await filterButtons.nth(1).getAttribute('aria-selected'), 'true');

    // Reset filter to "All Projects"
    await filterButtons.nth(0).click();
    assert.equal(await filterButtons.nth(0).getAttribute('aria-selected'), 'true');

    // Test Project Scope Details Modal
    const detailsBtn = section.getByRole('button', { name: /view scope details|details/i }).first();
    await detailsBtn.click();
    const modal = page.locator('dialog[open]');
    assert.ok(await modal.isVisible(), 'Project details modal opened');
    await page.keyboard.press('Escape');
    assert.ok(!(await modal.isVisible()), 'Project details modal closed on Escape');

    // Every remaining record must use its own text panel, including the full details dialog.
    const rows = section.locator('button[aria-expanded]');
    assert.equal(await rows.count(), 6);
    for (let row = 0; row < 6; row++) {
      await rows.nth(row).click();
      const panel = section.locator('[id^="project-row-panel-"]');
      assert.equal(await panel.locator('img').count(), 0);
      assert.equal(await panel.locator('[data-project-panel]').count(), 1);
      await panel.getByRole('button', {name:'Full Scope Details'}).click();
      assert.equal(await modal.locator('img').count(), 0);
      assert.equal(await modal.locator('[data-project-panel]').count(), 1);
      await page.keyboard.press('Escape');
      await rows.nth(row).click();
    }
    await section.getByRole('button', {name:'Details', exact:true}).first().click();
    assert.equal(await modal.locator('img').count(), 1);
    assert.equal(await modal.getByRole('link', {name:'CC BY-SA 4.0'}).count(), 1);
    assert.ok(await modal.getByText(/Location reference.*not evidence/).isVisible());
    await page.keyboard.press('Escape');
    await page.evaluate(() => document.activeElement?.blur());
    await page.addStyleTag({content:'nextjs-portal { display: none; }'});
    const mediaFits = await section.locator('[data-project-panel], [data-project-photo]').evaluateAll(elements => elements.every(e => e.getBoundingClientRect().right <= e.closest('article').getBoundingClientRect().right));
    assert.ok(mediaFits, 'Media fits its card without hidden clipping');
    // Capture screenshot
    await section.screenshot({ path: `artifacts/image-research/projects-${width}x${height}.png` });

    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.ok(await section.isVisible(), 'Projects section remains visible in reduced-motion');

    results.push({
      viewport: `${width}x${height}`,
      overflow: false,
      axeViolations: 0,
      headingVerified: true,
      imagesLoaded: true,
      filtering: 'passed',
      modalInteraction: 'passed',
      reducedMotion: 'passed',
    });

    await context.close();
  }

  assert.deepEqual(problems, [], `Browser console/network problems: ${problems.join('; ')}`);
  await writeFile('artifacts/image-research/browser-results.json', JSON.stringify({ baseURL, results, problems }, null, 2));
  console.log('Phase 4 verification passed successfully:');
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}

