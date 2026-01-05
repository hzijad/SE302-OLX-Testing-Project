import { test, expect } from '@playwright/test';
import { SearchPage } from '../page-objects/searchPage';

// normal test: search with keyword
test.describe('Functional Test: Search with Keyword', () => {
  test('search results page loads for a keyword query', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.gotoWithQuery('iphone');
    await searchPage.acceptCookiesIfPresent();

    await expect(page).toHaveURL(/pretraga\?q=iphone/);
    expect(await searchPage.hasResultsText()).toBeTruthy();
  });
});
