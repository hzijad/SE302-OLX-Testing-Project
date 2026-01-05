import { Page, Locator, expect } from '@playwright/test';

// home page object
export class HomePage {
  private page: Page;
  private cookieAgreeButton: Locator;
  private searchInput: Locator;
  private navLinks: Locator;
  private loginLink: Locator;
  private registerLink: Locator;
  private categoriesLink: Locator;
  public postAdButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // cookie button - targeting the specific CMP button
    this.cookieAgreeButton = this.page.locator('button:has-text("SLAŽEM SE"), button:has-text("Slažem se")');
    // search input
    this.searchInput = this.page.locator('input.main-search, input[placeholder*="Pretraga"]');
    // nav links
    this.navLinks = this.page.locator('a', { hasText: /Kategorije|Vozila|Nekretnine/ });

    // header links
    this.loginLink = this.page.locator('a[href="/login"], a[href$="/login"]');
    this.registerLink = this.page.locator('a[href="/register"], a[href$="/register"]');
    this.categoriesLink = this.page.locator('a[href="/kategorije"], a[href$="/kategorije"]');
    // More robust selector for Post Ad button
    this.postAdButton = this.page.locator('a[href*="objavi"], button').filter({ hasText: /Objavi oglas/i });
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
      const button = this.cookieAgreeButton.first();
      if (await button.isVisible({ timeout: 5000 })) {
        await button.click();
        // wait for banner to disappear
        await this.page.waitForTimeout(1000);
      }
    } catch (e) {
      // ignore
    }
  }

  // check search bar
  async isSearchBarVisible(): Promise<boolean> {
    try {
      await this.searchInput.first().waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  // check nav links
  async areNavigationLinksVisible(): Promise<boolean> {
    const count = await this.navLinks.count();
    return count >= 3;
  }

  async goToLogin() {
    await this.loginLink.first().click();
  }

  async goToRegistration() {
    await this.registerLink.first().click();
  }

  async isRegistrationLinkVisible(): Promise<boolean> {
    try {
      return await this.registerLink.first().isVisible({ timeout: 10000 });
    } catch (e) {
      return false;
    }
  }

  async getRegistrationHref(): Promise<string | null> {
    try {
      return await this.registerLink.first().getAttribute('href');
    } catch (e) {
      return null;
    }
  }

  async goToCategories() {
    await this.categoriesLink.first().click();
  }

  async clickPostAd() {
    await this.postAdButton.first().click();
  }
}
