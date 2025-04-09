import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '__tests__/automation',
  use: {
    baseURL: 'http://localhost:5173', 
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
