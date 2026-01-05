import { test, expect } from '@playwright/test';
import { acceptCookies } from './helper/acceptCookies';

test('Smoke: OLX header navigation is visible', async ({ page }) => {
  await page.goto('https://www.olx.ba');
  await acceptCookies(page);

  const headerNav = page.locator('header'); // the header element
  await expect(headerNav).toBeVisible();
});