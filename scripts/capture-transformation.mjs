import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const stage = process.argv[2] || 'before';
const base = process.env.BASE_URL || 'http://localhost:3210';
const dir = `artifacts/premium-transformation/${stage}`;
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
for (const [width, height] of [[1920,1080],[1440,900],[1366,768],[1024,768],[768,1024],[390,844],[375,812],[320,740]]) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  for (const section of await page.locator('main section').all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => window.scrollTo(0,0));
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${dir}/hero-${width}.png` });
  await page.screenshot({ path: `${dir}/fullpage-${width}.png`, fullPage: true });
  if ([1440,390].includes(width)) {
    for (const id of ['about-experience','services','projects','how-we-work','why-sas','project-inquiry','contact']) {
      await page.locator(`#${id}`).screenshot({ path: `${dir}/${id}-${width}.png`, style: 'header, .floating-whatsapp { visibility: hidden !important; }' });
    }
  }
  if (width < 1024) {
    await page.locator('.menu-toggle').click();
    await page.screenshot({ path: `${dir}/menu-${width}.png` });
    await page.keyboard.press('Escape');
  }
  results.push({ width, height, ...await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth })) });
  console.log(`${stage}: ${width}x${height}`);
  await page.close();
}
await writeFile(`${dir}