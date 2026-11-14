import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const baseURL = process.env.QA_BASE_URL || 'http://localhost:3100';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const problems = [];
await mkdir('artifacts/phase-1', { recursive: true });
try {
  for (const [width, height] of [[1440, 900], [1366, 768], [960, 900], [768, 1024], [390, 844], [320, 740]]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    page.on('pageerror', error => problems.push(error.message));
    page.on('console', message => { if (message.type() === 'error') problems.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) problems.push(`${response.status()} ${response.url()}`); });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}px`);
    assert.ok(await page.evaluate(() => [...document.images].every(image => image.complete && image.naturalWidth > 0)), 'Images loaded');
    assert.ok(await page.evaluate(() => document.fonts.check('600 20px "Manrope Variable"') && document.fonts.check('400 16px "Inter Variable"')));
    assert.ok(!/civil\s+works/i.test(await page.locator('body').innerText()));
    await page.keyboard.press('Tab');
    await page.getByRole('link', { name: 'Skip to content' }).evaluate(element => { if (document.activeElement !== element) throw Error('Skip link is not first focus target'); });
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content');
    await page.locator('h1').click();
    await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
    await page.waitForFunction(() => [...document.querySelectorAll('[data-hero-reveal]')].every(el => getComputedStyle(el).transform === 'none'));
    assert.ok(!(await page.locator('body').innerText()).includes('Homepage preview'));
    const captionFits = await page.locator('.photo-title').evaluate(el => { const caption = el.getBoundingClientRect(); const photo = el.closest('.hero-photo').getBoundingClientRect(); return caption.left >= photo.left && caption.right <= photo.right && caption.top >= photo.top && caption.bottom <= photo.bottom; });
    assert.ok(captionFits, 'Image caption stays inside the photograph');
    await page.screenshot({ path: `artifacts/phase-1/home-${width}x${height}.png`, fullPage: true });
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    assert.deepEqual(accessibility.violations.map(v => `${v.id}: ${v.description}`), [], `Accessibility at ${width}px`);
    if (width < 960) {
      const menu = page.locator('.menu-toggle');
      assert.equal(await page.locator('#primary-navigation').isVisible(), false);
      await menu.focus();
      await page.keyboard.press('Enter');
      assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Home');
      await page.getByRole('button', { name: 'Projects', exact: true }).click();
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Projects');
      await page.screenshot({ path: `artifacts/phase-1/menu-${width}x${height}.png`, fullPage: true });
      const menuAudit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      assert.equal(menuAudit.violations.length, 0);
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Menu');
    }
    for (const label of ['Explore Our Projects', 'Get in Touch']) {
      const action = page.getByRole('button', { name: label, exact: true });
      await action.click();
      const dialog = page.getByRole('dialog');
      assert.equal(await dialog.isVisible(), true);
      const dialogAudit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      assert.equal(dialogAudit.violations.length, 0);
      await dialog.getByRole('button', { name: 'Back to homepage' }).click();
      assert.equal(await dialog.isVisible(), false);
      assert.equal(await action.evaluate(element => document.activeElement === element), true);
    }
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
    assert.equal(await page.locator('[data-hero-reveal]').first().evaluate(element => getComputedStyle(element).transform), 'none');
    assert.equal(await page.locator('.hero-photo img').evaluate(element => getComputedStyle(element).transform), 'none');
    assert.equal(await page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor), 'rgb(250, 249, 246)');
    results.push({ width, height, overflow: false, images: 'loaded', fonts: 'loaded', axeViolations: 0, interactions: 'passed', reducedMotion: 'passed', lightTheme: 'passed' });
    await context.close();
  }
  assert.deepEqual(problems, []);
  await writeFile('artifacts/phase-1/browser-results.json', JSON.stringify({ baseURL, results, browserErrors: problems }, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}

