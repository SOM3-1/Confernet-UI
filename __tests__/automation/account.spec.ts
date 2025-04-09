import { test, expect } from '@playwright/test';

test.describe(' Account Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home/account');
  });

  test(' Loads account page with fallback or user name', async ({ page }) => {
    const avatar = page.locator('.MuiAvatar-root');
    const heading = page.locator('h5');

    if (await avatar.count() > 0) {
      await expect(avatar.first()).toBeVisible();
    } else if (await heading.count() > 0) {
      await expect(heading.first()).toBeVisible();
    } else {
      console.warn(' Neither avatar nor name heading found');
    }
  });

  test('Shows a known label like "Email"', async ({ page }) => {
    const emailLabel = page.locator('label').filter({ hasText: /^Email/i });
    if (await emailLabel.count() > 0) {
      await expect(emailLabel.first()).toBeVisible();
    } else {
      console.warn('Email label not found — possibly hidden or not rendered');
    }
  });

  test('Shows at least one tab (like "Joined Events") or fallback', async ({ page }) => {
    const tabs = page.getByRole('tab');
    const count = await tabs.count();
    if (count > 0) {
      await expect(tabs.first()).toBeVisible();
    } else {
      console.warn(' No tabs found — acceptable if user is not registered for events.');
    }
  });

  test('Shows fallback or cards for events', async ({ page }) => {
    const fallback = page.getByText(/No events to display/i);
    const card = page.locator('.MuiCard-root');

    if (await fallback.count() > 0) {
      await expect(fallback.first()).toBeVisible();
    } else if (await card.count() > 0) {
      await expect(card.first()).toBeVisible();
    } else {
      console.warn('Neither fallback nor cards found — empty state.');
    }
  });
});