import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const baseURL = process.env.QA_BASE_URL || 'http://localhost:3208';
const directory = 'artifacts/project-photos-audit';
await mkdir(directory, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];

try {
  for (const width of [1440, 1024, 768, 390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', e => consoleErrors.push(e.message));

    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const projects = page.locator('#projects');
    await projects.scrollIntoViewIfNeeded();

    // Check that images in featured projects are rendered and loaded
    const featuredImages = projects.locator('article img');
    const featuredCount = await featuredImages.count();
    assert.ok(featuredCount >= 3, `Expected at least 3 featured images, got ${featuredCount}`);

    // Verify all visible images have loaded successfully (naturalWidth > 0)
    for (let i = 0; i < featuredCount; i++) {
      const img = featuredImages.nth(i);
      await expect(img).toBeVisible();
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      assert.ok(naturalWidth > 0, `Image ${i} failed to load (naturalWidth = 0)`);
    }

    // Capture projects section screenshot
    if ([1440, 390].includes(width)) {
      await projects.screenshot({ path: `${directory}/projects-section-${width}.png` });
    }

    // Verify multi-image project gallery navigation (Project 02: FWO M9)
    const fwoArticle = projects.locator('article').nth(1);
    const nextBtn = fwoArticle.getByRole('button', { name: /Next image/i });
    if (await nextBtn.count()) {
      await nextBtn.click();
      await page.waitForTimeout(200);
      // Verify CC BY-SA 4.0 link is visible when on location reference slide
      await expect(fwoArticle.getByRole('link', { name: 'CC BY-SA 4.0' })).toBeVisible();
      if ([1440, 390].includes(width)) {
        await fwoArticle.screenshot({ path: `${directory}/fwo-m9-slide2-${width}.png` });
      }
      // Click previous to return to slide 1
      const prevBtn = fwoArticle.getByRole('button', { name: /Previous image/i });
      await prevBtn.click();
      await page.waitForTimeout(200);
    }

    // Verify detail dialog for a project with multiple images (Gulshan-e-Maymar or Japan City)
    // Expand row 5 (Gulshan-e-Maymar)
    const rowBtns = projects.locator('button[aria-expanded]');
    // Gulshan-e-Maymar is row 5 (0-indexed: index 4)
    await rowBtns.nth(4).click();
    await page.waitForTimeout(200);

    const expandedRow = projects.locator('#project-row-panel-gulshan-e-maymar');
    await expect(expandedRow).toBeVisible();
    const rowImg = expandedRow.locator('img').first();
    await expect(rowImg).toBeVisible();
    const rowImgWidth = await rowImg.evaluate(el => el.naturalWidth);
    assert.ok(rowImgWidth > 0, 'Gulshan-e-Maymar row image failed to load');

    // Click "Full Scope Details" to open dialog
    await expandedRow.getByRole('button', { name: 'Full Scope Details' }).click();
    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();

    // Verify dialog image is visible and object-contain
    const dialogImg = dialog.locator('img').first();
    await expect(dialogImg).toBeVisible();
    const dialogImgFit = await dialogImg.evaluate(el => getComputedStyle(el).objectFit);
    assert.equal(dialogImgFit, 'contain', 'Dialog image must use object-contain');

    // Verify gallery navigation inside dialog
    const dialogNextBtn = dialog.getByRole('button', { name: /Next image/i });
    if (await dialogNextBtn.count()) {
      await dialogNextBtn.click();
      await page.waitForTimeout(200);
      const counterText = await dialog.locator('.font-mono:has-text("2 / 2")').textContent();
      assert.ok(counterText?.includes('2 / 2'), 'Expected counter to show 2 / 2');
    }

    if ([1440, 390].includes(width)) {
      await dialog.screenshot({ path: `${directory}/dialog-gallery-${width}.png` });
    }

    // Accessibility scan on open dialog
    const dialogAxe = await new AxeBuilder({ page }).include('dialog[open]').withTags(['wcag2a', 'wcag2aa']).analyze();
    assert.deepEqual(dialogAxe.violations, [], `Dialog accessibility violations at ${width}px`);

    // Close dialog via Escape
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();

    // Collapse row back
    await rowBtns.nth(4).click();

    // Axe scan on entire projects section
    const sectionAxe = await new AxeBuilder({ page }).include('#projects').withTags(['wcag2a', 'wcag2aa']).analyze();
    assert.deepEqual(sectionAxe.violations, [], `Projects section accessibility violations at ${width}px`);

    // Verify zero horizontal overflow
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    assert.equal(hasOverflow, false, `Horizontal overflow detected at ${width}px`);

    results.push({
      width,
      featuredCount,
      dialogImageFit: dialogImgFit,
      violations: sectionAxe.violations.length,
      dialogViolations: dialogAxe.violations.length,
      consoleErrors
    });

    console.log(`Verified ${width}px: photos loaded, gallery working, zero a11y violations.`);
    await context.close();
  }

  await writeFile(`${directory}/audit-results.json`, JSON.stringify(results, null, 2));
  console.log('Project photos audit completed successfully!');
} finally {
  await browser.close();
}
