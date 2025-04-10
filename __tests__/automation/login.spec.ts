import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test('renders login form inputs and button', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /Login/i })).toBeVisible();
    await expect(page.getByText(/Don't have an account/i)).toBeVisible();
  });

  test(' shows error on login failure with invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('wrongpass');

    await page.getByRole('button', { name: /Login/i }).click();

    await expect(page.getByText(/Invalid email or password/i)).toBeVisible({ timeout: 5000 });
  });

  test('shows loading spinner during login attempt', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('12345678');

    await page.getByRole('button', { name: /Login/i }).click();

    const spinner = page.locator('[role="progressbar"]');
    await expect(spinner).toBeVisible();

    // Wait for the login to resolve and spinner to disappear
    await expect(spinner).not.toBeVisible({ timeout: 5000 });
  });
});
