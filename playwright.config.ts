import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1, // Run tests sequentially to avoid rate-limiting/Cloudflare blocks
  timeout: 60 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  use: {
    headless: true, // Go back to headless mode
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://olx.ba',
    navigationTimeout: 45 * 1000,
    launchOptions: {
      slowMo: 1500, // Increased slowMo to 1.5s
    },
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});