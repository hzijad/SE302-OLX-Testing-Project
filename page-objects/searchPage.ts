import { Page, Locator } from '@playwright/test';

// search page object
export class SearchPage {
  private page: Page;
  private searchInput: Locator;
  private listingCards: Locator;

  constructor(page: Page) {
    this.page = page;
    // search input
    this.searchInput = this.page.locator('input[placeholder="Pretraga"]');
    // listing cards - targeting links to articles
    this.listingCards = this.page.locator('a[href*="/artikal/"]');
  }

  // search empty
  async searchWithoutKeyword() {
    await this.searchInput.click();
    await this.searchInput.focus();
    await this.searchInput.press('Enter');
    // fallback: try clicking the search icon/button if enter doesn't work
    // assuming there is a button near the input
    const searchBtn = this.page.locator('button').filter({ has: this.page.locator('svg') }).filter({ hasText: '' }).first();
    if (await searchBtn.isVisible()) {
        await searchBtn.click();
    }
  }

  // check results text
  async hasResultsText(): Promise<boolean> {
    return await this.page.getByText(/REZULTATA/i).first().isVisible();
  }

  // check results
  async hasResults(): Promise<boolean> {
    try {
      // wait for the results header which contains "REZULTATA"
      await this.page.getByText(/REZULTATA/i).first().waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (e) {
      // fallback to checking listing cards
      const count = await this.listingCards.count();
      return count > 0;
    }
  }
}