import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const baseURL = process.env.QA_BASE_URL || 'http://localhost:3205';
const directory = 'artifacts/phase-5';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const errors = [];
try {
  for (const width of [1440, 768, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    const submitted = [];
    page.on('request', r => { if (r.method() === 'POST') submitted.push(r.url()); });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    for (const [name, hash] of [['About', '#about-experience'], ['Services', '#services'], ['Projects', '#projects'], ['Contact', '#contact'], ['Request a Quote', '#contact']]) {
      if (width < 960) await page.getByRole('button', { name: 'Menu', exact: true }).click();
      await nav.getByRole('link', { name, exact: true }).focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(`${baseURL}/${hash}`);
      await expect(page.locator(hash)).toBeFocused();
      if (width < 960) await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
    }
    await page.getByRole('link', { name: 'Get in Touch', exact: true }).click();
    await expect(page).toHaveURL(`${baseURL}/#contact`);
    await page.locator('#project-inquiry').getByRole('link').click();
    await expect(page.locator('#contact')).toBeFocused();
    const footer = page.getByRole('navigation', { name: 'Footer navigation' });
    for (const label of ['About', 'Services', 'Projects', 'Contact']) {
      await footer.getByRole('link', { name: label, exact: true }).click();
      assert.ok(await page.evaluate(() => Boolean(document.querySelector(location.hash))));
    }
    const form = page.getByRole('form', { name: 'Project inquiry' });
    await expect(form.getByRole('button', { name: 'Send Project Inquiry' })).toBeDisabled();
    for (const id of ['full-name', 'phone', 'location', 'work', 'details']) {
      const input = page.locator(`#inquiry-${id}`);
      await input.focus(); await input.blur();
      await expect(input).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator(`#inquiry-${id}-error`)).toContainText('Please complete');
    }
    await page.getByLabel('Full Name', { exact: true }).fill('   ');
    await page.getByLabel('Full Name', { exact: true }).blur();
    await expect(page.getByLabel('Full Name', { exact: true })).toHaveAttribute('aria-invalid', 'true');
    await page.getByLabel('Full Name', { exact: true }).fill('Test Visitor');
    await page.getByLabel('Phone Number', { exact: true }).fill('abc123');
    await page.getByLabel('Phone Number', { exact: true }).blur();
    await expect(page.locator('#inquiry-phone-error')).toContainText('7–15 digits');
    await page.getByLabel('Phone Number', { exact: true }).fill('+92 300 1234567');
    await page.getByLabel('Email Address', { exact: false }).fill('not-an-email');
    await page.getByLabel('Email Address', { exact: false }).blur();
    await expect(page.locator('#inquiry-email-error')).toContainText('valid email');
    await page.getByLabel('Email Address', { exact: false }).fill('');
    await page.getByLabel('Email Address', { exact: false }).blur();
    await expect(page.getByLabel('Email Address', { exact: false })).toHaveAttribute('aria-invalid', 'false');
    await page.getByLabel('Project Location', { exact: true }).fill('Test location');
    await page.getByLabel('Type of Construction Work', { exact: true }).selectOption('Site Development');
    await page.getByLabel('Project Details', { exact: true }).fill('Test inquiry. Browser validation only.');
    await page.getByLabel('Project Details', { exact: true }).blur();
    await expect(form.locator('[aria-invalid="true"]')).toHaveCount(0);
    await page.getByLabel('Full Name', { exact: true }).press('Enter');
    await form.evaluate(element => element.requestSubmit());
    await expect(form.getByRole('button')).toBeDisabled();
    assert.deepEqual(submitted, []);
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    await expect(page.locator('#how-we-work li')).toHaveCount(4);
    await expect(page.locator('#why-sas h3')).toHaveCount(4);
    await expect(page.locator('#projects img')).toHaveCount(1);
    await expect(page.locator('#projects').getByRole('link', { name: 'CC BY-SA 4.0' })).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('footer')).toContainText(String(new Date().getFullYear()));
    assert.equal(await page.locator('a[href^="mailto:"], a[href^="tel:"], a[href*="wa.me"]').count(), 0);
    for (const id of ['how-we-work', 'why-sas', 'project-inquiry', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow: ${id} at ${width}`);
    }
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    assert.deepEqual(axe.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })), []);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(() => document.activeElement?.blur());
    await page.waitForTimeout(100);
    assert.equal(await page.locator('[data-progress-line]').evaluate(e => getComputedStyle(e).transform), 'none');
    for (const id of ['how-we-work', 'why-sas', 'project-inquiry', 'contact']) {
      await page.locator(`#${id}`).screenshot({ path: `${directory}/${id}-${width}.png` });
    }
    await page.locator('footer').screenshot({ path: `${directory}/footer-${width}.png` });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await expect(page.getByLabel('Full Name', { exact: true })).toHaveValue('');
    results.push({ width, navigation: 'passed', validation: 'passed', deliveryDisabled: true, networkSubmissions: 0, axeViolations: 0, overflow: false, reducedMotion: 'passed' });
    console.log(`Passed ${width}px`);
    await context.close();
  }
  assert.deepEqual(errors, []);
  await writeFile(`${directory}/results.json`, JSON.stringify({ baseURL, results, errors }, null, 2));
} finally { await browser.close(); }
