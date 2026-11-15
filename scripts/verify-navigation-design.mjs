import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const directory = process.env.QA_OUTPUT_DIR || 'artifacts/navigation-design';
const baseURL = process.env.QA_BASE_URL || 'http://localhost:3207';
await mkdir(directory,{recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true});
const results=[], errors=[];
try {
  for (const [width,height] of [[1920,1080],[1440,900],[1024,768],[768,1024],[390,844],[375,812],[320,740]]) {
    const context=await browser.newContext({viewport:{width,height},hasTouch:width<960});
    const page=await context.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    await page.goto(baseURL,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:`${directory}/closed-${width}.png`});
    const toggle=page.getByRole('button',{name:'Menu',exact:true});
    const dialog=page.locator('#mobile-navigation');
    if(width<960) {
      await toggle.tap();
      await expect(dialog).toBeVisible();
      await expect(page.getByRole('button',{name:'Close menu'})).toBeFocused();
      assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
      await page.waitForTimeout(220);
      await page.screenshot({path:`${directory}/open-${width}.png`});
      const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      assert.deepEqual(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
      for(let i=0;i<10;i++) {await page.keyboard.press('Tab');assert.ok(await dialog.evaluate(e=>e.contains(document.activeElement)));}
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible(); await expect(toggle).toBeFocused();
      assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
      await toggle.click(); await page.waitForTimeout(220); await page.mouse.click(4,100);
      await expect(dialog).not.toBeVisible(); await expect(toggle).toBeFocused();
      await toggle.click(); await page.getByRole('button',{name:'Close menu'}).click();
      await expect(dialog).not.toBeVisible();
    }
    for(const [label,hash] of [['About','#about-experience'],['Services','#services'],['Projects','#projects'],['Contact','#contact'],['Request a Quote','#contact']]) {
      if(width<960) await toggle.click();
      const scope=width<960?dialog:page.getByRole('navigation',{name:'Main navigation'});
      const link=scope.getByRole('link',{name:label,exact:true});
      await link.focus(); await page.keyboard.press('Enter');
      await expect(page).toHaveURL(`${baseURL}/${hash}`);
      await expect(page.locator(hash)).toBeFocused();
      if(width<960) await expect(dialog).not.toBeVisible();
    }
    await page.getByRole('link',{name:'Explore Our Projects',exact:true}).click();
    await expect(page).toHaveURL(`${baseURL}/#projects`);
    await page.getByRole('link',{name:'Get in Touch',exact:true}).click();
    await expect(page).toHaveURL(`${baseURL}/#contact`);
    await page.locator('#project-inquiry .cta').click();
    await expect(page.locator('#contact')).toBeFocused();
    await expect(page.getByRole('button',{name:'Send Project Inquiry'})).toBeDisabled();
    const targets=await page.locator('.cta:visible').evaluateAll(es=>es.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));
    assert.ok(targets.every(r=>r.w>=44&&r.h>=44));
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    assert.deepEqual(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.locator('#project-inquiry .cta').hover();
    assert.equal(await page.locator('#project-inquiry .cta svg').evaluate(e=>getComputedStyle(e).transform),'none');
    await page.locator('#project-inquiry').screenshot({path:`${directory}/cta-${width}.png`});
    if(width<960) {
      await toggle.click();
      await page.setViewportSize({width:1024,height:768});
      await expect(dialog).not.toBeVisible();
      assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
      await expect(page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Home',exact:true})).toBeFocused();
    }
    results.push({width,height,menu:'passed',anchors:'passed',touchTargets:'passed',axeViolations:0,overflow:false,reducedMotion:'passed'});
    console.log(`Passed ${width}px`); await context.close();
  }
  assert.deepEqual(errors,[]);
  await writeFile(`${directory}/results.json`,JSON.stringify({results,errors},null,2));
} finally {await browser.close();}
