import { Page } from '@playwright/test';

export async function acceptCookies(page: Page) {
  const acceptButton = page.locator('button:has-text("Prihvatam")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }
}