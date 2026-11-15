import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const phase=process.env.LAYOUT_PHASE||'before';
const directory=`artifacts/layout-check/${phase}`;
await mkdir(directory,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
try {
 for(const width of [320,375,390,640,768,960,1024,1280,1440,1920]) {
  const page=await browser.newPage({viewport:{width,height:width<640?844:900},reducedMotion:'reduce'});
  await page.goto('http://localhost:3208',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const inspect=()=>page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,clipped:[...document.querySelectorAll('h1,h2,h3,h4,p,.cta,figcaption')].filter(e=>!e.classList.contains('sr-only') && e.getClientRects().length && e.clientWidth>0 && e.scrollWidth>e.clientWidth+2).map(e=>({text:e.textContent.slice(0,90),width:e.clientWidth,scroll:e.scrollWidth})),outside:[...document.querySelectorAll('main section,header,footer')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.id)}));
  const initial=await inspect();
  for(const id of ['about-experience','services','projects','how-we-work','why-sas','project-inquiry','contact']) {
   await page.locator(`#${id}`).scrollIntoViewIfNeeded();
   if([390,1024].includes(width))await page.locator(`#${id}`).screenshot({path:`${directory}/${id}-${width}.png`});
  }
  await page.locator('footer').scrollIntoViewIfNeeded();
  if([390,1024].includes(width))await page.locator('footer').screenshot({path:`${directory}/footer-${width}.png`});
  let menu=null;
  if(width<960) {
   await page.getByRole('button',{name:'Menu',exact:true}).click();
   menu=await page.locator('#mobile-navigation').evaluate(e=>({overflow:e.scrollWidth>e.clientWidth,links:[...e.querySelectorAll('nav a')].map(a=>({text:a.textContent,height:a.getBoundingClientRect().height,display:getComputedStyle(a).display}))}));
   if([320,390,768].includes(width))await page.screenshot({path:`${directory}/menu-${width}.png`});
  }
  results.push({width,initial,menu});console.log(JSON.stringify(results.at(-1)));await page.close();
  if(phase==='after') {
   assert.equal(initial.overflow,false);
   assert.deepEqual(initial.clipped,[]);
   assert.deepEqual(initial.outside,[]);
   if(menu) { assert.equal(menu.overflow,false); assert.ok(menu.links.every(link=>link.display==='flex'&&link.height>=44)); }
  }
 }
 await writeFile(`${directory}/results.json`,JSON.stringify(results,null,2));
}finally{await browser.close();}
