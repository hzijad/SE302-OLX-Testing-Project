import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';

test.describe('Functional: Homepage Search Bar', () => {
  test('Search bar is visible, focusable, and accepts input', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await homePage.acceptCookiesIfPresent();

    const searchBarVisible = await homePage.isSearchBarVisible();
    expect(searchBarVisible).toBeTruthy();

    await page.focus('input[placeholder="Pretraga"]');

    const testQuery = 'telefon';
    await page.fill('input[placeholder="Pretraga"]', testQuery);

    const inputValue = await page.$eval(
      'input[placeholder="Pretraga"]',
      (el: HTMLInputElement) => el.value
    );
    expect(inputValue).toBe(testQuery);
  });
});
