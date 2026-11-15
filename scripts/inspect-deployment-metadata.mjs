import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage();
  const results = [];
  for (const url of [
    'https://api.vercel.com/v13/deployments/8UC1KWb6CG8fNMUfszbDZyqcGjto',
    'https://api.github.com/repos/talhamalik25/sas-construction/commits/main/status',
  ]) {
    const response = await page.request.get(url);
    const data = await response.json();
    results.push({ url, status: response.status(), data });
  }
  const response = await page.goto('https://vercel.com/talhamalik25s-projects/sas-construction/8UC1KWb6CG8fNMUfszbDZyqcGjto', { waitUntil: 'networkidle', timeout: 60000 });
  results.push({ url: page.url(), status: response.status(), text: await page.locator('body').innerText() });
  await writeFile('artifacts/live-audit/deployment-metadata.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
