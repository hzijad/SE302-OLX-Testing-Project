import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';

test('Smoke Test: OLX header navigation is visible (POM)', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.acceptCookiesIfPresent();

  const navVisible = await home.areNavigationLinksVisible();
  expect(navVisible).toBeTruthy();
});