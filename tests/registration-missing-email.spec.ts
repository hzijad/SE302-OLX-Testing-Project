import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../page-objects/registrationPage';

// test registration missing email
test.describe('Functional Test: Registration with Missing Email Field', () => {
  test('registration fails when email/phone is omitted', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    // navigate
    await registrationPage.goto();
    await registrationPage.acceptCookiesIfPresent();

    // submit directly - this should trigger validation errors including missing email
    await registrationPage.submit();
    
    // check url
    await expect(page).toHaveURL(/\/register/);
    // check error
    expect(await registrationPage.isMissingEmailErrorVisible()).toBeTruthy();
  });
});