import { test, expect } from '@playwright/test';

test.describe(' Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test(' Shows error snackbar on invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();

    const snackbar = page.locator('.MuiSnackbar-root');
    await expect(snackbar).toBeVisible({ timeout: 5000 });
    await expect(snackbar).toContainText('Invalid email or password');
  });

  test(' Prevents form submission when fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    // ensure the snackbar doesn't show indicating no form submit
    await expect(page.locator('.MuiSnackbar-root')).not.toBeVisible();
  });
});
