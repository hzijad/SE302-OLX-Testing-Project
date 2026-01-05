import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';
import { RegistrationPage } from '../page-objects/registrationPage';

// normal test: navigate to registration
test.describe('Functional Test @functional: Navigate to Registration from Homepage', () => {
  test('header registration link opens registration page', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.goto();
    await homePage.acceptCookiesIfPresent();

    expect(await homePage.isRegistrationLinkVisible()).toBeTruthy();
    const href = await homePage.getRegistrationHref();
    expect(href).toBe('/register');

    // Cloudflare bot protection validation just in case
    await registrationPage.goto();
    await registrationPage.acceptCookiesIfPresent();

    const blocked = await registrationPage.isBotProtectionVisible();
    test.skip(blocked, 'Blocked by Cloudflare bot protection on /register');

    await expect(page).toHaveURL(/\/register/);
    expect(await registrationPage.isLoaded()).toBeTruthy();
    expect(await registrationPage.isRegisterButtonVisible()).toBeTruthy();
  });
});
