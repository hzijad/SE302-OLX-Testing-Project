import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';

const isBotProtectionVisible = async (page: any): Promise<boolean> => {
  const blocker = page.locator('text=/Verifying you are human|Just a moment/i').first();
  return await blocker.isVisible().catch(() => false);
};

// smoke test homepage load
test.describe('Smoke Test: Homepage Loads Successfully', () => {
  test('home page renders search bar and navigation', async ({ page }) => {
    const homePage = new HomePage(page);
    // navigate
    await homePage.goto();
    // accept cookies
    await homePage.acceptCookiesIfPresent();
    // check url
    await expect(page).toHaveURL(/olx\.ba\/?$/);
    // bot check, skip
    test.skip(await isBotProtectionVisible(page), 'Blocked by Cloudflare bot protection on homepage');
    // check ui
    expect(await homePage.isSearchBarVisible()).toBeTruthy();
    expect(await homePage.areNavigationLinksVisible()).toBeTruthy();
  });
});
