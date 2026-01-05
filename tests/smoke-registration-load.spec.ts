import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../page-objects/registrationPage';

// smoke test registration page load
test.describe('Smoke Test: Registration Page Loads Successfully', () => {
  test('registration page renders and shows register button', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.goto();
    await registrationPage.acceptCookiesIfPresent();

    const blocked = await registrationPage.isBotProtectionVisible();
    test.skip(blocked, 'Blocked by Cloudflare bot protection on /register');

    await expect(page).toHaveURL(/\/register/);
    expect(await registrationPage.isLoaded()).toBeTruthy();
    expect(await registrationPage.isRegisterButtonVisible()).toBeTruthy();
  });
});
