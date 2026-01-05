import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';

test.describe('Functional Test: Homepage Navigation Links', () => {
  test('Main navigation links are visible', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await homePage.acceptCookiesIfPresent();

    // Extra wait for this specific test to ensure UI is settled
    await page.waitForTimeout(2000);

    await page.locator('a', { hasText: /Kategorije|Vozila|Nekretnine/ }).first().waitFor({ timeout: 10000 });

    const expectedLinks = ['Kategorije', 'Vozila', 'Nekretnine'];
    for (const linkText of expectedLinks) {
      const link = page.locator('a', { hasText: linkText }).first();
      await expect(link).toBeVisible();
    }

    const navLinksVisible = await homePage.areNavigationLinksVisible();
    expect(navLinksVisible).toBeTruthy();
  });
});
