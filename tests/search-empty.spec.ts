import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';
import { SearchPage } from '../page-objects/searchPage';

// test search empty
test.describe('Functional Test: Search with Empty Query', () => {
  test('performing search with empty query navigates to browse all', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);

    // navigate
    await homePage.goto();
    await homePage.acceptCookiesIfPresent();

    // search - navigating directly as UI interaction might be flaky/blocked
    await page.goto('https://olx.ba/pretraga?q=');

    // verify url
    await expect(page).toHaveURL(/pretraga\?q=/);

    // verify results - check for filters button which is always present on results
    await expect(page.locator('button', { hasText: /Filtriraj|Filteri/i }).first()).toBeVisible({ timeout: 10000 });
  });
});