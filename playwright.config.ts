import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://olx.ba',
    navigationTimeout: 45 * 1000,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});