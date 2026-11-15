import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const directory = 'artifacts/live-audit';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const response = await page.goto('https://sas-construction.vercel.app/', { waitUntil: 'networkidle', timeout: 60000 });
  const result = {
    inspectedAt: new Date().toISOString(), url: page.url(), status: response.status(),
    headers: await response.allHeaders(),
    projects: await page.locator('#projects').innerText(),
    images: await page.locator('#projects img').evaluateAll(es => es.map(e => ({ alt: e.alt, src: e.getAttribute('src') }))),
    navigation: await page.locator('header a, header button').evaluateAll(es => es.map(e => ({ tag: e.tagName, text: e.textContent, href: e.getAttribute('href') }))),
    expandedRecords: [], assets: [], routes: [],
  };
  await writeFile(`${directory}/production-before.html`, await page.content());
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.locator('#projects').screenshot({ path: `${directory}/production-projects-desktop.png` });
  const rows = page.locator('#projects button[aria-expanded]');
  for (let index = 0; index < await rows.count(); index++) {
    await rows.nth(index).click();
    result.expandedRecords.push(await page.locator('[id^="project-row-panel-"]').innerText());
    await rows.nth(index).click();
  }
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'About', exact: true }).click();
  result.navigationDialog = await page.locator('dialog[open]').innerText();
  await page.keyboard.press('Escape');
  for (const path of ['/images/projects/m9-jamshoro-location.webp', '/images/projects/m9-jamshoro-location.json', '/images/projects/nlc-orangi.jpg']) {
    const asset = await page.request.get(`https://sas-construction.vercel.app${path}`);
    result.assets.push({ path, status: asset.status(), type: asset.headers()['content-type'] });
  }
  for (const path of ['/about', '/services', '/projects', '/contact']) {
    const route = await page.request.get(`https://sas-construction.vercel.app${path}`);
    result.routes.push({ path, status: route.status() });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#projects').screenshot({ path: `${directory}/production-projects-mobile.png` });
  const deployments = await page.request.get('https://api.github.com/repos/talhamalik25/sas-construction/deployments?per_page=10');
  result.githubDeploymentsStatus = deployments.status();
  if (deployments.ok()) {
    result.deployments = [];
    for (const d of await deployments.json()) {
      const status = await page.request.get(d.statuses_url);
      result.deployments.push({ id: d.id, sha: d.sha, environment: d.environment, createdAt: d.created_at, statuses: status.ok() ? await status.json() : status.status() });
    }
  }
  await writeFile(`${directory}/production-before.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
