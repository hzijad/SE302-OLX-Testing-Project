import { Page, Locator } from '@playwright/test';

// search page object
export class SearchPage {
  private page: Page;
  private searchInput: Locator;
  private searchButton: Locator;
  private listingCards: Locator;

  constructor(page: Page) {
    this.page = page;
    // search input
    this.searchInput = this.page.locator('input.main-search, input[placeholder="Pretraga"]');
    // search button
    this.searchButton = this.page.locator('.searchbar-wrapper img[src*="search.svg"]');
    // listing cards - targeting links to articles
    this.listingCards = this.page.locator('a[href*="/artikal/"]');
  }

  // search empty
  async searchWithoutKeyword() {
    await this.searchInput.click();
    await this.searchInput.focus();
    await this.searchButton.click();
  }

  // check results text
  async hasResultsText(): Promise<boolean> {
    return await this.page.locator('h1').filter({ hasText: /rezultata/i }).first().isVisible();
  }

  // check results
  async hasResults(): Promise<boolean> {
    try {
      // Check for listing cards first - more reliable
      await this.listingCards.first().waitFor({ state: 'visible', timeout: 15000 });
      return true;
    } catch (e) {
      // Fallback to header
      try {
        await this.page.locator('h1').filter({ hasText: /rezultata/i }).first().waitFor({ state: 'visible', timeout: 5000 });
        return true;
      } catch (e2) {
        // Fallback to any article link or filter button
        try {
            await this.page.locator('button:has-text("Filtriraj"), button:has-text("Filteri")').first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (e3) {
            return false;
        }
      }
    }
  }
}