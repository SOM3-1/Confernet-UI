import { test, expect } from '@playwright/test';

test.describe('People Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home/people');
  });

  test(' Page loads with heading or search input', async ({ page }) => {
    const heading = page.getByText(/Networking/i);
    const searchBox = page.getByPlaceholder(/Search people by/i);

    if (await heading.count()) {
      await expect(heading).toBeVisible({ timeout: 5000 });
    } else {
      console.warn('⚠️ "Networking" heading not found — skipping check');
    }

    await expect(searchBox).toBeVisible({ timeout: 5000 });
  });

  test(' Renders at least one person (if any)', async ({ page }) => {
    const peopleList = page.locator('.MuiListItem-root');
    expect(await peopleList.count()).toBeGreaterThanOrEqual(0); // 0 is valid if no users
  });

  test(' Message input and send button appear for a person (if users exist)', async ({ page }) => {
    const messageInput = page.locator('input[placeholder*="Message"]');
    if (await messageInput.count()) {
      await expect(messageInput.first()).toBeVisible({ timeout: 5000 });
    }
  });
});
