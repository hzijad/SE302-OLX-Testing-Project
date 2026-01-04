import { Page, Locator, expect } from '@playwright/test';

// home page object
export class HomePage {
  private page: Page;
  private cookieAgreeButton: Locator;
  private searchInput: Locator;
  private navLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    // cookie button - targeting the specific CMP button
    this.cookieAgreeButton = this.page.locator('#qc-cmp2-container button:has-text("SLAŽEM SE"), button:has-text("SLAŽEM SE"), button:has-text("Slažem se")');
    // search input
    this.searchInput = this.page.locator('input[placeholder="Pretraga"]');
    // nav links
    this.navLinks = this.page.locator('a', { hasText: /Kategorije|Vozila|Nekretnine/ });
  }

  // navigate home
  async goto() {
    await this.page.goto('https://olx.ba/');
  }

  // accept cookies
  async acceptCookiesIfPresent() {
    try {
      // Wait a bit for the banner to appear
      await this.page.waitForTimeout(2000);
      if (await this.cookieAgreeButton.first().isVisible({ timeout: 5000 })) {
        await this.cookieAgreeButton.first().click();
        // wait for banner to disappear
        await this.page.waitForSelector('#qc-cmp2-container', { state: 'hidden', timeout: 5000 });
      }
    } catch (e) {
      // ignore
    }
  }

  // check search bar
  async isSearchBarVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }

  // check nav links
  async areNavigationLinksVisible(): Promise<boolean> {
    const count = await this.navLinks.count();
    return count >= 3;
  }
}