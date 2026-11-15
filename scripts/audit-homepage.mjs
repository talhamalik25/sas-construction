import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const phase = process.env.AUDIT_PHASE || 'before';
const baseURL = process.env.QA_BASE_URL || 'http://localhost:3206';
const directory = `artifacts/final-audit/${phase}`;
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const [width, height] of [[1920,1080],[1440,900],[1366,768],[1024,768],[768,1024],[390,844],[375,812],[320,740]]) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.addInitScript(() => {
      window.auditCLS = 0;
      new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.auditCLS += e.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${directory}/hero-${width}.png` });
    const initial = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      smoothScroll: getComputedStyle(document.documentElement).scrollBehavior,
      skip: (() => { const e = document.querySelector('a[href="#main-content"]'); const r=e.getBoundingClientRect(); return { top:r.top,bottom:r.bottom,translate:getComputedStyle(e).translate }; })(),
      duplicateIds: [...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i),
      missingControls: [...document.querySelectorAll('[aria-controls]')].filter(e=>!document.getElementById(e.getAttribute('aria-controls'))).map(e=>e.getAttribute('aria-controls')),
      preloads: [...document.querySelectorAll('link[rel="preload"][as="image"]')].map(e=>e.outerHTML),
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      og: document.querySelector('meta[property="og:title"]')?.content || null,
    }));
    for (const id of ['about-experience','services','projects','how-we-work','why-sas','project-inquiry','contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
    }
    const scan = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    const tab = page.locator('#projects [role="tab"]').first();
    let projectArrowChanges = null;
    if (await tab.count()) {
      await tab.focus(); await page.keyboard.press('ArrowRight');
      projectArrowChanges = await page.locator('#projects [role="tab"]').nth(1).evaluate(e=>e===document.activeElement);
    }
    await page.locator('#projects article button').first().click();
    const dialogScan = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    await page.locator('dialog[open]').screenshot({ path: `${directory}/dialog-${width}.png` });
    await page.keyboard.press('Escape');
    if (phase === 'after') {
      assert.equal(initial.overflow, false);
      assert.deepEqual(initial.duplicateIds, []);
      assert.deepEqual(initial.missingControls, []);
      assert.deepEqual(scan.violations, []);
      assert.deepEqual(dialogScan.violations, []);
      assert.ok(initial.canonical && initial.og);
      const services = page.locator('#services');
      if (width >= 1024) {
        const tabs = services.getByRole('tab');
        await tabs.first().focus();
        for (let i = 1; i < 6; i++) {
          await page.keyboard.press('ArrowDown');
          await expect(tabs.nth(i)).toBeFocused();
          await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true');
          await expect(services.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', await tabs.nth(i).getAttribute('id'));
        }
        await page.keyboard.press('Home');
        await expect(tabs.first()).toBeFocused();
      } else {
        const buttons = services.locator('button[aria-expanded]');
        for (let i = 0; i < 6; i++) {
          if (await buttons.nth(i).getAttribute('aria-expanded') === 'true') await buttons.nth(i).click();
          await buttons.nth(i).click();
          await expect(buttons.nth(i)).toHaveAttribute('aria-expanded', 'true');
          await expect(page.locator(`#${await buttons.nth(i).getAttribute('aria-controls')}`)).toBeVisible();
        }
      }
      const projects = page.locator('#projects');
      const filters = projects.getByRole('group', { name: 'Filter projects by category' }).getByRole('button');
      for (let i = 0; i < 5; i++) {
        await filters.nth(i).focus(); await page.keyboard.press('Enter');
        await expect(filters.nth(i)).toHaveAttribute('aria-pressed', 'true');
        await expect(projects.getByRole('status')).toHaveText(`Showing ${[9,4,1,2,2][i]} project records.`);
      }
      await filters.first().click();
      const checkDialog = async trigger => {
        await trigger.click();
        const dialog = page.locator('dialog[open]');
        await expect(dialog).toBeVisible();
        for (let i=0;i<8;i++) {
          await page.keyboard.press('Tab');
          assert.ok(await dialog.evaluate(e=>e.contains(document.activeElement)));
        }
        await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
      };
      const featured = projects.locator('article').getByRole('button', { name: 'Details' });
      for (let i=0;i<3;i++) await checkDialog(featured.nth(i));
      const rows = projects.locator('button[aria-expanded]');
      for (let i=0;i<6;i++) {
        await rows.nth(i).click();
        await checkDialog(projects.getByRole('button',{name:'Full Scope Details',exact:true}));
        await rows.nth(i).click();
      }
      assert.ok(await projects.locator('img').count() >= 3);
      await expect(projects.getByRole('link',{name:'CC BY-SA 4.0'})).toBeVisible();
      await page.emulateMedia({reducedMotion:'reduce'});
      assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
      for (const path of ['/robots.txt','/sitemap.xml']) assert.equal((await page.request.get(`${baseURL}${path}`)).status(),200);
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(() => document.activeElement?.blur());
    await page.screenshot({ path: `${directory}/homepage-${width}.png`, fullPage: true });
    const performance = await page.evaluate(() => ({ cls: window.auditCLS, resources: performance.getEntriesByType('resource').map(r=>({ name:r.name, bytes:r.transferSize, duration:r.duration })).filter(r=>/\.(js|woff2)/.test(r.name)) }));
    results.push({ width,height,initial,projectArrowChanges,violations:scan.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),dialogViolations:dialogScan.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),errors,performance });
    console.log(`${phase}: ${width}x${height}, page violations=${scan.violations.length}, dialog violations=${dialogScan.violations.length}`);
    await context.close();
  }
  await writeFile(`${directory}/results.json`,JSON.stringify(results,null,2));
} finally { await browser.close(); }
