import { Page, Locator } from '@playwright/test';

// login page object
export class LoginPage {
  private page: Page;
  private cookieAgreeButton: Locator;
  private passwordField: Locator;
  private usernameOrEmailField: Locator;
  private loginButton: Locator;
  private pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookieAgreeButton = this.page.locator(
      '#qc-cmp2-container button:has-text("SLAŽEM SE"), button:has-text("SLAŽEM SE"), button:has-text("Slažem se")'
    );

    this.usernameOrEmailField = this.page.locator('input[type="text"], input[type="email"]').first();
    this.passwordField = this.page.locator('input[type="password"]').first();
    this.loginButton = this.page.getByRole('button', { name: /Prijavi se|Prijava|Login/i });
    this.pageTitle = this.page.locator('h1').filter({ hasText: /Prijav/i }).first();
  }

  async acceptCookiesIfPresent() {
    try {
      await this.page.waitForTimeout(2000);
      if (await this.cookieAgreeButton.first().isVisible({ timeout: 5000 })) {
        await this.cookieAgreeButton.first().click();
        await this.page.waitForSelector('#qc-cmp2-container', { state: 'hidden', timeout: 5000 });
      }
    } catch (e) {
      // ignore
    }
  }

  async goto() {
    await this.page.goto('https://olx.ba/login');
  }

  async isLoaded(): Promise<boolean> {
    try {
      if (await this.pageTitle.isVisible({ timeout: 10000 })) return true;
    } catch (e) {
      // ignore
    }

    try {
      if (await this.passwordField.isVisible({ timeout: 10000 })) return true;
    } catch (e) {
      // ignore
    }

    try {
      if (await this.usernameOrEmailField.isVisible({ timeout: 10000 })) return true;
    } catch (e) {
      // ignore
    }

    return false;
  }

  async isLoginButtonVisible(): Promise<boolean> {
    try {
      return await this.loginButton.isVisible({ timeout: 10000 });
    } catch (e) {
      return false;
    }
  }
}
