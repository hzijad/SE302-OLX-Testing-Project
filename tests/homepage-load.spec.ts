import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';

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
    // check ui
    expect(await homePage.isSearchBarVisible()).toBeTruthy();
    expect(await homePage.areNavigationLinksVisible()).toBeTruthy();
  });
});