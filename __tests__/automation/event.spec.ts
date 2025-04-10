import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';
const EMAIL = 'john@mail.com';
const PASSWORD = '123456';

async function loginAsOrganizer(page) {
  await page.goto(BASE_URL + '/login');
  await page.getByLabel('Email').fill(EMAIL);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: /login/i }).click();
  await page.waitForURL('**/home');
}

test.describe('CreateEventButton - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsOrganizer(page);
    await page.goto(BASE_URL + '/home');
  });

  test('Renders the Create Event button if user is an organizer', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /create event/i });
    await expect(createBtn).toBeVisible();
  });

  test(' Opens modal on Create Event button click', async ({ page }) => {
    await page.getByRole('button', { name: /create event/i }).click();
    
    // Check for modal
    await expect(page.getByRole('heading', { name: /Create New Event/i })).toBeVisible();
    await expect(page.getByText('Basic Info')).toBeVisible(); // Stepper step
  });
});
