import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const errors = [];
const baseURL = process.env.QA_BASE_URL || 'http://localhost:3000';
const viewports = [[1440, 900], [1366, 768], [768, 1024], [390, 844], [320, 740]];
try {
  for (const [width, height] of viewports) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    const section = page.locator('#about-experience');
    await section.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    await section.locator('img').evaluate(image => image.decode());
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal((await section.locator('h2').innerText()).replace(/\s+/g, ' '), '20 Years on the Ground. Experience That Builds Confidence.');
    assert.deepEqual(await section.locator('li').allTextContents(), ['Machinery & Equipment', 'Skilled Workforce', 'Complete Site Execution']);
    assert.ok(!/civil\s+works/i.test(await page.locator('body').innerText()));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}px`);
    await section.locator('li').last().scrollIntoViewIfNeeded();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => [...document.querySelectorAll('#about-experience [data-scroll-reveal]')].every(element => getComputedStyle(element).transform === 'none'));
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    assert.deepEqual(audit.violations.map(v => `${v.id}: ${v.description}`), []);
    const credit = section.getByRole('link');
    assert.ok((await credit.getAttribute('href')).startsWith('https://unsplash.com/photos/'));
    await credit.focus();
    assert.ok(await credit.evaluate(element => document.activeElement === element));
    await credit.evaluate(element => element.blur());
    await section.screenshot({ path: `artifacts/phase-2/experience-${width}x${height}.png` });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.evaluate(() => scrollTo(0, 0));
    await section.locator('li').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('#about-experience li')].every(element => getComputedStyle(element).transform === 'none'));
    results.push({ viewport: `${width}x${height}`, overflow: false, axeViolations: 0, reducedMotion: 'passed', scrollReveal: 'passed', image: 'loaded', keyboardCredit: 'passed' });
    await context.close();
  }
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await noJS.newPage();
  await page.goto(baseURL);
  await page.locator('#about-experience').scrollIntoViewIfNeeded();
  assert.ok(await page.locator('#experience-heading').isVisible());
  assert.equal(await page.locator('#about-experience li').count(), 3);
  await noJS.close();
  const sourceHashes = JSON.parse((await readFile('artifacts/phase-2/approved-source-hashes.json', 'utf8')).replace(/^\uFEFF/, ''));
  for (const file of sourceHashes) {
    assert.equal(createHash('sha256').update(await readFile(file.Path)).digest('hex').toUpperCase(), file.Hash, `Approved file changed: ${file.Path}`);
  }
  assert.deepEqual(errors, []);
  await writeFile('artifacts/phase-2/browser-results.json', JSON.stringify({ baseURL, results, errors, approvedSources: 'unchanged', noJavaScript: 'passed' }, null, 2));
  console.log(JSON.stringify({ results, errors, approvedSources: 'unchanged', noJavaScript: 'passed' }, null, 2));
} finally {
  await browser.close();
}
