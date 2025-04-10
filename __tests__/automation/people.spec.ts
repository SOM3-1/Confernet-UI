// tests/automation/people.spec.ts
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';
const EMAIL = 'john@mail.com';
const PASSWORD = '123456';

async function login(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByLabel('Email').fill(EMAIL);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: /login/i }).click();
  await page.waitForURL('**/home');
}

test.describe(' People Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto(`${BASE_URL}/home/people`);
  });

  test(' Sees "Alice Johnson" and filters her out by typing another name', async ({ page }) => {
    const alice = page.getByText('Alice Johnson', { exact: false });
    await expect(alice).toBeVisible();

    const search = page.locator('input[placeholder*="search" i]');
    await search.fill('bob');
    await page.waitForTimeout(500);

    await expect(alice).toHaveCount(0);
  });

  test(' Sends a message to Alice Johnson and shows success snackbar', async ({ page }) => {
    const messageInput = page.locator('textarea[placeholder*="message Alice Johnson" i]');
    await expect(messageInput).toBeVisible();

    await messageInput.fill('Hello!');
    await page.getByRole('button', { name: /send/i }).click();

    const snackbar = page.locator('.MuiSnackbar-root');
    await expect(snackbar).toContainText('Message sent successfully');
  });
});
