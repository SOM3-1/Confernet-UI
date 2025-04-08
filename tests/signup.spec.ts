import { test, expect } from '@playwright/test';

test.describe(' Signup Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/signup');
  });

  test(' Shows error or success snackbar on signup attempt', async ({ page }) => {
    const uniqueEmail = `test-${Date.now()}@example.com`;

    await page.getByLabel('Full Name').fill('Test User');
    await page.getByLabel('Email').fill(uniqueEmail);
    await page.getByLabel('Password').fill('123456');
    await page.getByLabel('Date of Birth').fill('1990-01-01');
    await page.getByLabel('Phone Number').fill('1234567890');
    await page.getByLabel('Organization').fill('Test Org');
    await page.getByLabel('Job Title').fill('Tester');
    await page.getByLabel('Country').fill('India');
    await page.getByLabel('City').fill('Bangalore');
    await page.getByLabel('Bio').fill('Test user bio');

    await page.getByRole('button', { name: 'Signup' }).click();

    const snackbar = page.locator('.MuiSnackbar-root');

    // Wait for any snackbar to show up with error or success
    await expect(snackbar).toHaveText(/Signup successful|Signup failed|already/i, {
      timeout: 8000,
    });
  });

  test(' Prevents submission with empty fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Signup' }).click();

    await expect(page.locator('.MuiSnackbar-root')).not.toBeVisible();
  });
});
