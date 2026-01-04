import { Page, Locator, expect } from '@playwright/test';

// registration page object
export class RegistrationPage {
  private page: Page;
  private emailField: Locator;
  private passwordField: Locator;
  private usernameField: Locator;
  private genderSelect: Locator;
  private regionSelect: Locator;
  private termsCheckbox: Locator;
  private registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // email field - first text input
    this.emailField = this.page.locator('input[type="text"]').first();
    // password field
    this.passwordField = this.page.locator('input[type="password"]');
    // username field - second text input
    this.usernameField = this.page.locator('input[type="text"]').nth(1); 
    
    // gender select
    this.genderSelect = this.page.locator('select').first(); 
    // region select
    this.regionSelect = this.page.locator('select').nth(1); 
    // terms checkbox
    this.termsCheckbox = this.page.locator('#checkbox');
    this.registerButton = this.page.getByRole('button', { name: /Registruj se/i });
  }

  // accept cookies (copied from HomePage)
  async acceptCookiesIfPresent() {
    try {
      const cookieButton = this.page.locator('#qc-cmp2-container button:has-text("SLAŽEM SE"), button:has-text("SLAŽEM SE"), button:has-text("Slažem se")');
      // Wait a bit for the banner to appear
      await this.page.waitForTimeout(2000);
      if (await cookieButton.first().isVisible({ timeout: 5000 })) {
        await cookieButton.first().click();
        // wait for banner to disappear
        await this.page.waitForSelector('#qc-cmp2-container', { state: 'hidden', timeout: 5000 });
      }
    } catch (e) {
      // ignore
    }
  }

  // navigate register
  async goto() {
    await this.page.goto('https://olx.ba/register');
  }

  // fill fields no email
  async fillRequiredFieldsWithoutEmail() {
    // password
    await this.passwordField.fill('Test1234!');
    // username
    await this.usernameField.fill('AutomatedUser' + Date.now());
    // gender - try selecting by value or index if label fails
    try {
      await this.genderSelect.selectOption({ index: 1 });
    } catch (e) {
      // ignore
    }
    // region
    try {
      await this.regionSelect.selectOption({ index: 1 });
    } catch (e) {
      // ignore
    }
    // accept terms
    try {
      await this.termsCheckbox.check({ force: true });
    } catch (e) {
      // fallback to JS click if check fails
      await this.page.evaluate(() => {
        const checkbox = document.querySelector('#checkbox');
        if (checkbox && checkbox instanceof HTMLElement) checkbox.click();
      });
    }
  }

  // submit form
  async submit() {
    await this.registerButton.click();
  }

  // check error
  async isMissingEmailErrorVisible(): Promise<boolean> {
    // Check for HTML5 validation error (browser tooltip)
    const isInvalid = await this.emailField.evaluate((el) => {
      const input = el as HTMLInputElement;
      return !input.checkValidity();
    });
    
    if (isInvalid) return true;

    // Fallback: check for text error or invalid class
    try {
        // check for text - expanded keywords
        const errorText = this.page.locator('text=/obavezno|polje|unesite|email/i').first();
        if (await errorText.isVisible()) return true;

        // check for invalid input class
        const invalidInput = this.page.locator('.error, .is-invalid, .invalid, input[aria-invalid="true"]').first();
        if (await invalidInput.isVisible()) return true;
        
        // check for toast/alert
        const toast = this.page.locator('.toast, .alert, [role="alert"]').first();
        if (await toast.isVisible()) return true;
    } catch (e) {
        // ignore
    }
    return false;
  }
}