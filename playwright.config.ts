import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      // Important: the setup project must NOT read storageState.
      use: {}
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        browserName: 'chromium',
        storageState: 'playwright/.auth.json'
      }
    }
  ],
  reporter: [['html', { open: 'never' }]]
});