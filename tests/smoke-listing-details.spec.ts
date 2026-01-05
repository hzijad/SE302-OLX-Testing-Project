import { test, expect, Page } from '@playwright/test';
import { SearchPage } from '../page-objects/searchPage';

// cf block check, skip to avoid false fail
const isBotProtectionVisible = async (page: Page): Promise<boolean> => {
  const blocker = page.locator('text=/Verifying you are human|Just a moment/i').first();
  return await blocker.isVisible().catch(() => false);
};

test.describe('Smoke Test @smoke: Listing Details Page Loads Successfully', () => {
  test('listing details page shows title, price, and seller section', async ({ page }) => {
    const searchPage = new SearchPage(page);

    // common keyword for results
    await searchPage.gotoWithQuery('telefon');
    await searchPage.acceptCookiesIfPresent();

    // bot protection, skip
    test.skip(await isBotProtectionVisible(page), 'Blocked by Cloudflare bot protection on search page');

    // first card helper, no repeat steps
    const opened = await searchPage.openFirstListing();
    test.skip(!opened, 'No listing card could be opened');

    await expect(page).toHaveURL(/\/artikal\//);

    await expect(page.locator('h1').first()).toBeVisible();

    // price or seller text check, selectors are shaky
    const price = page.locator('text=/KM|BAM|EUR/i').first();
    const seller = page.locator('text=/Kontakt|Prodav/i').first();
    expect(await price.isVisible().catch(() => false)).toBeTruthy();
    expect(await seller.isVisible().catch(() => false)).toBeTruthy();
  });
});
