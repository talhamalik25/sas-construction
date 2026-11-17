import { chromium, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({channel:'chrome',headless:true});
const context = await browser.newContext({viewport:{width:390,height:844}, reducedMotion:'no-preference'});
const page = await context.newPage();
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
const base=process.env.BASE_URL || 'http://localhost:3211';
try {
  await page.goto(base,{waitUntil:'networkidle'});
  await page.waitForTimeout(1000);
  const before = await page.locator('.hero-photo img').evaluate(e=>getComputedStyle(e).transform);
  expect(before).toBe('none');
  await page.locator('.menu-toggle').click();
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.waitForTimeout(250);
  const menu=await page.locator('#mobile-navigation').boundingBox();
  expect(Math.round(menu.x+menu.width)).toBe(390);
  await page.screenshot({path:'artifacts/premium-transformation/validation/menu-motion-390.png'});
  await page.mouse.click(5,400);
  await expect(page.locator('#mobile-navigation')).not.toBeVisible();
  await page.locator('.menu-toggle').click();
  await page.setViewportSize({width:1440,height:900});
  await expect(page.locator('#mobile-navigation')).not.toBeVisible();
  expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Projects',exact:true}).click();
  await page.waitForTimeout(1200);
  const position=await page.locator('#projects').boundingBox();
  expect(position.y).toBeGreaterThan(87);
  await expect(page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Projects',exact:true})).toHaveAttribute('aria-current','location');
  for(const section of await page.locator('main section').all()) { await section.scrollIntoViewIfNeeded(); await page.waitForTimeout(150); }
  await page.waitForTimeout(700);
  const images=await page.locator('img:visible').evaluateAll(es=>es.map(e=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0})));
  expect(images.every(e=>e.loaded)).toBe(true);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://sas-construction.vercel.app');
  for(const endpoint of ['/robots.txt','/sitemap.xml']) {
    const r=await page.request.get(base+endpoint); expect(r.status()).toBe(200); expect(await r.text()).toContain('https://sas-construction.vercel.app');
  }
  await page.locator('#inquiry-full-name').focus();
  await expect(page.locator('.floating-whatsapp')).toBeHidden();
  expect(errors).toEqual([]);
  await writeFile('artifacts/premium-transformation/validation/extras.json',JSON.stringify({status:'pass',checks:['Normal-motion GSAP entrance completes','Right-aligned menu, backdrop dismissal','Desktop breakpoint closes drawer and releases scroll lock','Sticky anchor clearance and active section state','All visible images loaded','Canonical, robots and sitemap','Floating CTA hides during form input'],images,errors},null,2));
} finally {await browser.close();}
