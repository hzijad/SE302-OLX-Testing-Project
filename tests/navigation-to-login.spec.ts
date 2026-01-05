import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';
import { LoginPage } from '../page-objects/loginPage';

// normal test: navigate to login
test.describe('Functional Test: Navigate to Login from Homepage', () => {
  test('header login link opens login page', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.acceptCookiesIfPresent();

    await homePage.goToLogin();

    await expect(page).toHaveURL(/\/login/);
    expect(await loginPage.isLoaded()).toBeTruthy();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });
});
