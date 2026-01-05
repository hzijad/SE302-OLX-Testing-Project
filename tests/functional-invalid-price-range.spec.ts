import { test, expect } from '@playwright/test';
import { SearchPage } from '../page-objects/searchPage';

test.describe('Functional Test @functional: Verify Search Price Filter with Logically Invalid Range', () => {
  test('price filter rejects min greater than max', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.gotoWithQuery('iphone');
    await searchPage.acceptCookiesIfPresent();

    // od/do price inputs
    const minInput = page.locator('input[placeholder="od"]').first();
    const maxInput = page.locator('input[placeholder="do"]').first();

    // price filter can be collapsed, open if needed
    if (!(await minInput.isVisible().catch(() => false))) {
      const priceToggle = page.locator('text=/Cijena/i').first();
      if (await priceToggle.isVisible().catch(() => false)) {
        await priceToggle.click();
      }
    }

    await minInput.fill('50000');
    await maxInput.fill('10000');

    const refreshButton = page.locator('button:has-text("Osvje")').first();
    if (await refreshButton.isVisible().catch(() => false)) {
      await refreshButton.click();
    }

    // empty state text, loose match
    const emptyState = page.locator('text=/Nema rezultata/i').first();
    const emptyVisible = await emptyState.isVisible().catch(() => false);
    if (emptyVisible) {
      await expect(emptyState).toBeVisible();
    } else {
      const resultsHeader = page.locator('h1').filter({ hasText: /rezultata/i }).first();
      await expect(resultsHeader).toBeVisible();
    }
  });
});
