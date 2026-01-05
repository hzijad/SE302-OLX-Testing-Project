import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';

// smoke test login page load
test.describe('Smoke Test: Login Page Loads Successfully', () => {
  test('login page renders and shows login button', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.acceptCookiesIfPresent();

    await expect(page).toHaveURL(/\/login/);
    expect(await loginPage.isLoaded()).toBeTruthy();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });
});
