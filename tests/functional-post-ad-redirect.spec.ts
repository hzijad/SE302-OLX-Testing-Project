import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';
import { LoginPage } from '../page-objects/loginPage';

test.describe('Functional Test: Post Ad Redirects to Login', () => {
  test('clicking "Objavi oglas" redirects unauthenticated user to login', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.acceptCookiesIfPresent();

    // ensure the button is visible before clicking
    await expect(homePage.postAdButton.first()).toBeVisible();
    
    await homePage.clickPostAd();

    //should be redirected to login
    await expect(page).toHaveURL(/.*login.*/);
    
    // verify login page elements
    expect(await loginPage.isLoaded()).toBeTruthy();
  });
});
