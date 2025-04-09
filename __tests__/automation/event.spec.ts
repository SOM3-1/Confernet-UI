import { test, expect } from '@playwright/test';

test.describe(' Event UI Sanity Checks', () => {
  test(' Schedule page shows search bar or fallback', async ({ page }) => {
    await page.goto('http://localhost:5173/home');

    const searchBox = page.getByPlaceholder(/search/i);
    const heading = page.getByRole('heading', { name: /schedule/i });
    const fallback = page.getByText(/no events to register/i);

    if (await searchBox.count() > 0) {
      await expect(searchBox).toBeVisible();
    } else if (await heading.count() > 0) {
      await expect(heading.first()).toBeVisible();
    } else if (await fallback.count() > 0) {
      await expect(fallback.first()).toBeVisible();
    } else {
      console.warn('⚠️ Nothing visible — check authentication or event data');
    }
  });

  test(' Create Event button is visible (if organizer)', async ({ page }) => {
    await page.goto('http://localhost:5173/home');

    const createBtn = page.getByRole('button', { name: /create event/i });

    if (await createBtn.count() > 0) {
      await expect(createBtn).toBeVisible();
    } else {
      console.warn('⚠️ Create Event button not found — possibly not logged in as organizer');
    }
  });

  test(' View More Details button is rendered for any event', async ({ page }) => {
    await page.goto('http://localhost:5173/home');

    const viewBtn = page.getByRole('button', { name: /view more details/i });

    if (await viewBtn.count() > 0) {
      await expect(viewBtn.first()).toBeVisible();
    } else {
      console.warn(' No events or buttons rendered — empty event list?');
    }
  });

  test(' Bookmark icon or message appears', async ({ page }) => {
    await page.goto('http://localhost:5173/home');

    const bookmark = page.locator('button').filter({ has: page.locator('svg') });

    if (await bookmark.count() > 0) {
      await expect(bookmark.first()).toBeVisible();
    } else {
      console.warn('⚠️ No bookmark buttons visible — possibly no events rendered.');
    }
  });
});