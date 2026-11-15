import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

const baseURL = process.env.QA_BASE_URL || 'http://localhost:3200';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const problems = [];
try {
  for (const width of [1440, 960, 768, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    page.on('pageerror', e => problems.push(e.message));
    page.on('console', m => { if (m.type() === 'error') problems.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`); });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    const menu = page.locator('.menu-toggle');
    if (width < 960) {
      await menu.click();
      await expect(menu).toHaveAttribute('aria-expanded', 'true');
      await page.keyboard.press('Escape');
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await expect(menu).toBeFocused();
    }
    for (const [label, hash] of [['About', '#about-experience'], ['Services', '#services'], ['Projects', '#projects']]) {
      if (width < 960) await menu.click();
      const link = nav.getByRole('link', { name: label, exact: true });
      await link.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(`${baseURL}/${hash}`);
      await expect(page.locator(hash)).toBeFocused();
      assert.equal(await page.locator('dialog[open]').count(), 0);
      if (width < 960) await expect(menu).toHaveAttribute('aria-expanded', 'false');
    }
    if (width < 960) await menu.click();
    for (const name of ['Contact', 'Request a Quote']) {
      const button = nav.getByRole('button', { name, exact: true });
      await expect(button).toBeDisabled();
      const explanation = await button.getAttribute('aria-describedby');
      await expect(page.locator(`[id="${explanation}"]`)).toBeVisible();
      assert.match(await page.locator(`[id="${explanation}"]`).innerText(), /Contact details pending/);
    }
    await page.locator('header').screenshot({ path: `artifacts/live-audit/local-navigation-${width}.png` });
    await nav.getByRole('link', { name: 'Home', exact: true }).click();
    await expect(page).toHaveURL(`${baseURL}/`);
    await expect(page.getByRole('button', { name: 'Get in Touch', exact: true })).toBeDisabled();
    await page.getByRole('link', { name: 'Explore Our Projects', exact: true }).click();
    await expect(page).toHaveURL(`${baseURL}/#projects`);
    assert.equal(await page.locator('.preview-dialog').count(), 0);
    assert.equal(await page.locator('a[href^="mailto:"], a[href^="tel:"], a[href*="wa.me"]').count(), 0);
    assert.ok(!/coming soon/i.test(await page.locator('body').innerText()));

    const projects = page.locator('#projects');
    await expect(projects.locator('img')).toHaveCount(1);
    await projects.locator('img').evaluate(e => e.decode());
    assert.match(await projects.locator('img').getAttribute('src'), /m9-jamshoro-location/);
    await expect(projects.getByText(/Location reference.*not evidence of SAS execution/)).toBeVisible();
    assert.equal(await projects.locator('[data-project-panel]').count(), 2);
    const allText = [await projects.innerText()];
    const rows = projects.locator('button[aria-expanded]');
    assert.equal(await rows.count(), 6);
    for (let i = 0; i < 6; i++) {
      await rows.nth(i).click();
      const panel = projects.locator('[id^="project-row-panel-"]');
      allText.push(await panel.innerText());
      await expect(panel.locator('img')).toHaveCount(0);
      await expect(panel.locator('[data-project-panel]')).toHaveCount(1);
      await panel.getByRole('button', { name: 'Full Scope Details' }).click();
      const modal = page.locator('dialog[open]');
      await expect(modal).toBeVisible();
      await expect(modal.locator('img')).toHaveCount(0);
      await page.keyboard.press('Escape');
      await expect(modal).toHaveCount(0);
      await rows.nth(i).click();
    }
    for (const [i, imageCount] of [[0, 0], [1, 1], [2, 0]]) {
      await projects.locator('article button').nth(i).click();
      const modal = page.locator('dialog[open]');
      await expect(modal.locator('img')).toHaveCount(imageCount);
      allText.push(await modal.innerText());
      if (imageCount) await expect(modal.getByRole('link', { name: 'CC BY-SA 4.0' })).toBeVisible();
      await page.keyboard.press('Escape');
    }
    assert.ok(!/deep trench|reinforced concrete|vibratory|interlocking|engineered fill|subgrade|sub-base|heavy-duty|curb stone|completed|ongoing/i.test(allText.join('\n')));
    const filters = projects.getByRole('tab');
    for (let i = 0; i < 5; i++) {
      await filters.nth(i).click();
      await expect(filters.nth(i)).toHaveAttribute('aria-selected', 'true');
    }
    await filters.first().click();
    await expect.poll(() => filters.first().evaluate(e => getComputedStyle(e).backgroundColor)).toBe('rgb(37, 78, 67)');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    assert.deepEqual(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), []);
    const palette = await page.evaluate(() => Object.fromEntries(['--background', '--primary', '--accent'].map(k => [k, getComputedStyle(document.documentElement).getPropertyValue(k).trim()])));
    assert.deepEqual(palette, { '--background': '#faf9f6', '--primary': '#254e43', '--accent': '#d6b27a' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(projects).toBeVisible();
    await page.evaluate(() => document.activeElement?.blur());
    await projects.screenshot({ path: `artifacts/live-audit/local-projects-${width}.png` });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `artifacts/live-audit/local-home-${width}.png` });
    results.push({ width, anchors: 'passed', mobileMenu: width < 960 ? 'passed' : 'not applicable', contactDisabled: true, previewDialogs: 0, projectRecords: 9, photographs: 1, textPanels: 8, projectDialogs: 'passed', filters: 'passed', axeViolations: 0, overflow: false, palette: 'preserved', reducedMotion: 'passed' });
    console.log(`Passed ${width}px`);
    await context.close();
  }
  assert.deepEqual(problems, []);
  await writeFile('artifacts/live-audit/local-results.json', JSON.stringify({ baseURL, results, problems }, null, 2));
} finally { await browser.close(); }
