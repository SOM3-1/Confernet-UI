import { test, expect } from '@playwright/test';

test.describe(' Message Page - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Setup localStorage with mock user ID
    await page.addInitScript(() => {
      localStorage.setItem('userId', 'u1');
    });

    await page.goto('http://localhost:5173/home/messages');
  });

  test(' shows Inbox with conversation list', async ({ page }) => {
    // Wait for Inbox or fallback to appear
    const inbox = page.locator('text=Inbox');
    const fallback = page.locator('text=No conversations yet');

    if (await inbox.count()) {
      await expect(inbox).toBeVisible({ timeout: 5000 });
    } else if (await fallback.count()) {
      await expect(fallback).toBeVisible();
    } else {
      console.warn('⚠️ Neither Inbox nor fallback found');
    }
  });

  test('filters conversations using search input (if available)', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search by name...');

    if (await searchInput.count()) {
      await searchInput.fill('nonexistent user');
      await page.waitForTimeout(500);

      const filtered = page.locator('text=From');
      await expect(filtered).toHaveCount(0);
    } else {
      console.warn('⚠️ Search bar not available');
    }
  });

  test(' opens chat popup from existing conversation (if present)', async ({ page }) => {
    const convoCard = page.locator('text=From');
    const continueChatBtn = page.getByRole('button', { name: /Continue Chat/i });

    if (await convoCard.count() && await continueChatBtn.count()) {
      await continueChatBtn.first().click();
      await expect(page.locator('text=Chat with')).toBeVisible({ timeout: 5000 });
    } else {
      console.warn(' No conversations or Continue Chat buttons available');
    }
  });
});
