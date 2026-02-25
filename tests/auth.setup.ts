import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';


const credentials = {
    email: 'admin',
    password: 'password123'
  };

setup('authenticate', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(credentials.email, credentials.password);

  await expect(
    page.getByRole('banner').getByRole('heading', { name: /web application/i })
  ).toBeVisible();

  await page.context().storageState({ path: 'playwright/.auth.json' });
});