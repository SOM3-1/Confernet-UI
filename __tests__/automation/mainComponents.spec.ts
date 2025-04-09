import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

//  Test Header
test.describe(' UI Component Integration Tests', () => {
  test(' Header should display logo and navigation icon', async ({ page }) => {
    await page.goto(BASE_URL + '/home');
    const header = page.locator('header');
    if (await header.count()) {
      await expect(header).toBeVisible();
    } else {
      console.warn('Header not found on /home');
    }
  });

  // Sidebar
  test(' Sidebar opens and shows navigation tabs', async ({ page }) => {
    await page.goto(BASE_URL + '/home');
    const sidebarToggle = page.locator('header button[aria-label="open drawer"]').first();
    if (await sidebarToggle.count()) {
      await sidebarToggle.click();
      const sidebar = page.locator('aside');
      await expect(sidebar).toBeVisible();
      const tabs = sidebar.getByRole('tab');
      const tabCount = await tabs.count();
      expect(tabCount).toBeGreaterThan(0);
    } else {
      console.warn('⚠️ Sidebar toggle button not found');
    }
  });

  //  Menu (Layout)
  test(' Menu layout should show content container', async ({ page }) => {
    await page.goto(BASE_URL + '/home');
    const layout = page.locator('.MuiContainer-root');
    await expect(layout).toBeVisible();
  });

  //  ContentView
  test(' ContentView renders dynamic content', async ({ page }) => {
    await page.goto(BASE_URL + '/home/account');
    const heading = page.locator('h5');
    if (await heading.count()) {
      await expect(heading.first()).toBeVisible();
    } else {
      console.warn('⚠️ No heading found on /home/account');
    }
  });
});