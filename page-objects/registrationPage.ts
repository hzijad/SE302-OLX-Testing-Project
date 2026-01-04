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
    // email field - assuming first input is email/phone
    this.emailField = this.page.locator('input').first();
    // password field
    this.passwordField = this.page.locator('input[type="password"]');
    // username field - assuming it's the input after password or 3rd input
    // trying to be more specific: input that is not password and not the first one
    this.usernameField = this.page.locator('input[type="text"]').nth(1); 
    
    // gender select
    this.genderSelect = this.page.locator('select').first(); 
    // region select
    this.regionSelect = this.page.locator('select').nth(1); 
    // terms checkbox
    this.termsCheckbox = this.page.locator('input[type="checkbox"]').first();
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
    // accept terms - force click via JS to avoid visibility issues
    await this.page.evaluate(() => {
      const checkbox = document.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox instanceof HTMLElement) {
        checkbox.click();
        // also try setting checked property just in case
        (checkbox as HTMLInputElement).checked = true;
        // trigger change event
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  // submit form
  async submit() {
    await this.registerButton.click();
  }

  // check error
  async isMissingEmailErrorVisible(): Promise<boolean> {
    // check for error message text OR invalid input state
    try {
        // check for text
        const errorText = this.page.locator('text=/obavezno|polje/i').first();
        if (await errorText.isVisible()) return true;

        // check for invalid input class
        const invalidInput = this.page.locator('.error, .is-invalid, .invalid, input[aria-invalid="true"]').first();
        if (await invalidInput.isVisible()) return true;

        return false;
    } catch (e) {
        return false;
    }
  }
}