import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const dir = 'artifacts/premium-transformation/validation';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const base = process.env.BASE_URL || 'http://localhost:3211';
const sizes = [[1920,1080],[1440,900],[1366,768],[1024,768],[768,1024],[390,844],[375,812],[320,740]];
async function axe(page, scope) {
  let audit = new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']);
  if (scope) audit = audit.include(scope);
  const result = await audit.analyze();
  return result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
}
try {
  for (const [width,height] of sizes) {
    const context = await browser.newContext({ viewport: { width,height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', e => { if (e.type() === 'error') errors.push(e.text()); });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveCount(1);
    const row = { viewport: `${width}x${height}`, checks: [], violations: [], errors };
    const measure = async () => page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    expect((await measure()).scroll).toBe(width);
    expect(await page.locator('header').evaluate(e => getComputedStyle(e).position)).toBe('sticky');
    row.violations.push(...await axe(page));
    if (width < 1024) {
      const toggle = page.locator('.menu-toggle');
      await toggle.click();
      const menu = page.locator('#mobile-navigation');
      await expect(menu).toBeVisible();
      await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
      await expect(page.locator('.floating-whatsapp')).toBeHidden();
      row.violations.push(...await axe(page, '#mobile-navigation'));
      await page.keyboard.press('Shift+Tab');
      await expect(menu.locator('a').last()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(toggle).toBeFocused();
      await toggle.click();
      await menu.getByRole('link', { name: /Services/ }).click();
      await expect(menu).not.toBeVisible();
      await expect(page.locator('#services')).toBeFocused();
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
      row.checks.push('Menu focus wrap, Escape/return, navigation close, scroll lock, floating CTA hidden');
    }
    if (width >= 1024) {
      const tabs = page.getByRole('tab');
      await tabs.first().focus();
      await page.keyboard.press('End');
      await expect(tabs.last()).toHaveAttribute('aria-selected','true');
      await page.keyboard.press('Home');
      for (let i=0;i<6;i++) {
        await tabs.nth(i).click();
        await expect(tabs.nth(i)).toHaveAttribute('aria-selected','true');
        await expect(page.locator('#service-panel h3')).toHaveText((await tabs.nth(i).innerText()).replace(/^\d+\s*/,''));
      }
    } else {
      const accordions = page.locator('#services button[aria-expanded]');
      for (let i=0;i<6;i++) {
        if (await accordions.nth(i).getAttribute('aria-expanded') === 'false') await accordions.nth(i).click();
        await expect(accordions.nth(i)).toHaveAttribute('aria-expanded','true');
        await expect(page.locator('#services [role="region"]')).toBeVisible();
      }
    }
    row.checks.push('All six services and keyboard/accordion operation');
    const filters = page.locator('#projects [aria-pressed]');
    for (const [i,count] of [9,4,1,2,2].entries()) {
      await filters.nth(i).click();
      await expect(page.locator('#projects [role="status"]')).toHaveText(`Showing ${count} project records.`);
    }
    await filters.first().click();
    const dialog = page.locator('#projects dialog');
    async function checkDialog(trigger) {
      await trigger.click();
      await expect(dialog).toBeVisible();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
      await expect(page.locator('.floating-whatsapp')).toBeHidden();
      row.violations.push(...await axe(page, '#projects dialog'));
      const first = dialog.getByRole('button',{name:'Close project details'});
      await first.focus();
      await page.keyboard.press('Shift+Tab');
      await expect(dialog.getByRole('button',{name:'Close Details',exact:true})).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(first).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(trigger).toBeFocused();
    }
    for (let i=0;i<3;i++) await checkDialog(page.locator('#projects article').nth(i).getByRole('button',{name:'View Project Details'}));
    const registers = page.locator('#projects button[aria-expanded]');
    for (let i=0;i<6;i++) {
      await registers.nth(i).click();
      await checkDialog(page.locator('[id^="project-row-panel-"]').getByRole('button',{name:'View Project Details'}));
      await registers.nth(i).click();
    }
    const m9 = page.locator('[data-project-photo="fwo-m9"]');
    await m9.getByRole('button',{name:/Next image/}).click();
    await expect(m9).toContainText('Location reference');
    await expect(m9.getByRole('link',{name:'CC BY-SA 4.0'})).toBeVisible();
    expect(await m9.locator('img').evaluate(e => getComputedStyle(e).objectFit)).toBe('contain');
    await m9.getByRole('button',{name:/Previous image/}).click();
    row.checks.push('Five filter counts, nine project dialogs, focus/return, M9 selection/uncropped license');
    const form = page.getByRole('form',{name:'Project inquiry'});
    await form.getByRole('button',{name:'Continue to WhatsApp'}).click();
    await expect(page.locator('#inquiry-full-name')).toBeFocused();
    await expect(form.getByRole('alert')).toContainText('correct');
    await page.locator('#inquiry-full-name').fill('Browser QA');
    await page.locator('#inquiry-phone').fill('123');
    await page.locator('#inquiry-location').fill('Test site');
    await page.locator('#inquiry-work').selectOption({ index: 1 });
    await page.locator('#inquiry-details').fill('Local browser verification only.');
    await form.getByRole('button',{name:'Continue to WhatsApp'}).click();
    await expect(page.locator('#inquiry-phone')).toBeFocused();
    await page.locator('#inquiry-phone').fill('+923001234567');
    await page.evaluate(() => { window.open = () => null; });
    await form.getByRole('button',{name:'Continue to WhatsApp'}).click();
    await expect(form.getByRole('alert')).toContainText('blocked');
    await expect(page.locator('#inquiry-full-name')).toHaveValue('Browser QA');
    await page.evaluate(() => { window.open = (url) => { window.__draftUrl = url; return { opener: null }; }; });
    await form.getByRole('button',{name:'Continue to WhatsApp'}).click();
    await expect(form.getByRole('status')).toContainText('press Send in WhatsApp');
    const draft = new URL(await page.evaluate(() => window.__draftUrl));
    expect(draft.origin+draft.pathname).toBe('https://wa.me/923312718673');
    expect(draft.searchParams.get('text')).toContain('Name: Browser QA');
    for (const anchor of await page.locator('a[href*="wa.me"]').all()) expect(new URL(await anchor.getAttribute('href')).pathname).toBe('/923312718673');
    row.checks.push('Form required/phone validation, blocked popup recovery, correct WhatsApp draft (window.open intercepted; no message sent)');
    const aria = await page.evaluate(() => [...document.querySelectorAll('[aria-controls],[aria-describedby],[aria-labelledby]')].flatMap(e => ['aria-controls','aria-describedby','aria-labelledby'].flatMap(attr => (e.getAttribute(attr)||'').split(/\s+/).filter(id => id && !document.getElementById(id)))));
    expect(aria).toEqual([]);
    expect((await measure()).scroll).toBe(width);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
    row.checks.push('No document overflow, valid ARIA references, reduced-motion scroll');
    await page.screenshot({path:`${dir}/form-${width}.png`});
    results.push(row);
    await writeFile(`${dir}/results.json`,JSON.stringify(results,null,2));
    console.log(`${row.viewport}: ${row.violations.length} axe violations; ${errors.length} browser errors`);
    await context.close();
  }
  expect(results.flatMap(r=>r.violations)).toEqual([]);
  expect(results.flatMap(r=>r.errors)).toEqual([]);
} finally { await browser.close(); }
