import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.getByLabel(/username/i).fill(username);
    await this.page.getByLabel(/password/i).fill(password);

    await this.page.getByRole('button', { name: /sign in/i }).click();

    // Success signal 
    await expect(this.page.getByRole('button', { name: /web application/i })).toBeVisible();
  }
}