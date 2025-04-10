import { test, expect } from '@playwright/test';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = 'screenshots';

const USERS = {
    organizer: {
        email: 'dandelion@mail.com',
        password: '123456',
    },
    speaker: {
        email: 'triss@mail.com',
        password: '123456',
    },
    attendee: {
        email: 'ciri@mail.com',
        password: '123456',
    },
};

test('TC001 - Login, Signup UI, and Auth Flow for an Organiser', async ({ page }) => {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
        fs.mkdirSync(SCREENSHOT_DIR);
    }

    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
    const content = await page.content();

    if (content.includes('ConferNet Dashboard')) {
        await page.getByText('Logout', { exact: true }).click();
        await page.waitForURL(/\/login/);
        await page.screenshot({ path: `${SCREENSHOT_DIR}/00_logged_out_first.png` });
    }

    await expect(page.locator('h4')).toHaveText('ConferNet Login', { timeout: 7000 });

    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/01_login_page.png` });

    await page.getByText('Sign up here').click();
    await page.waitForURL(/\/signup/);
    await expect(page.locator('h4')).toHaveText('ConferNet Signup');
    await page.screenshot({ path: `${SCREENSHOT_DIR}/02_signup_page.png` });

    await page.getByText('Login here').click();
    await page.waitForURL(/\/login/);

    await page.getByLabel(/Email/i).fill(USERS.organizer.email);
    await page.getByLabel(/Password/i).fill(USERS.organizer.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(/\/home/);

    await page.waitForSelector('input[placeholder="Search events..."]', { timeout: 10000 });

    const fab = page.locator('button:has-text("Create Event")');
    await fab.waitFor({ state: 'visible', timeout: 7000 });
    await expect(fab).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/05_create_event_button.png` });

    await fab.click();
    const modal = page.locator('div[role="dialog"]:has(h2:has-text("Create New Event"))');
    await expect(modal).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: `${SCREENSHOT_DIR}/06_create_event_modal.png` });

    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden({ timeout: 5000 });
    await page.screenshot({ path: `${SCREENSHOT_DIR}/07_modal_closed.png` });

    const searchBar = page.locator('input[placeholder="Search events..."]');
    await expect(searchBar).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/08_search_bar.png` });

    const refreshButton = page.getByRole('button', { name: 'Refresh Events' });
    await expect(refreshButton).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/09_refresh_button.png` });

    const viewButton = page.locator('button:has-text("View More Details")').first();
    if (await viewButton.isVisible()) {
        await viewButton.click();
        await page.waitForURL(/\/home\/.*/);

        const detailsTab = page.getByRole('tab', { name: 'Details' });
        const speakersTab = page.getByRole('tab', { name: 'Speakers' });
        const feedbackTab = page.getByRole('tab', { name: 'Feedback' });

        await expect(detailsTab).toBeVisible();
        await page.screenshot({ path: `${SCREENSHOT_DIR}/10_event_tab_details.png` });

        await speakersTab.click();
        await expect(speakersTab).toHaveAttribute('aria-selected', 'true');
        await page.screenshot({ path: `${SCREENSHOT_DIR}/11_event_tab_speakers.png` });

        await feedbackTab.click();
        await expect(feedbackTab).toHaveAttribute('aria-selected', 'true');
        await page.screenshot({ path: `${SCREENSHOT_DIR}/12_event_tab_feedback.png` });

        await page.getByRole('button', { name: '← Back' }).click();
        await page.waitForURL(/\/home/);
        await page.screenshot({ path: `${SCREENSHOT_DIR}/13_dashboard_after_back.png` });
    }

    const hamburger = page.locator('button[aria-label="open drawer"]');
    await hamburger.click();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/14_drawer_opened.png` });

    const accountOption = page.getByText('Account');
    await accountOption.click();
    await page.waitForURL(/\/account/);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/15_account_page.png` });

    await expect(page.getByText('Dandelion Pankratz')).toBeVisible();
    await expect(page.getByText('Organizer')).toBeVisible();
    await expect(page.getByText(/Email:/)).toBeVisible();
    await expect(page.getByText(/Phone:/)).toBeVisible();
    await expect(page.getByText(/Date of Birth:/)).toBeVisible();
    await expect(page.getByText(/Organization:/)).toBeVisible();
    await expect(page.getByText(/Country:/)).toBeVisible();
    await expect(page.getByText(/City:/)).toBeVisible();
    await expect(page.getByText(/Bio:/)).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/16_account_info_verified.png` });

    await expect(page.getByRole('tab', { name: 'Joined Events' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Bookmarked Events' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Events You Organized' })).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/17_account_tabs_present.png` });

    await page.getByText('Logout').click();
    await page.waitForURL(/\/login/);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/18_final_logout.png` });
});

test('TC002 - Speaker Login and Navigation Flow', async ({ page }) => {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
        fs.mkdirSync(SCREENSHOT_DIR);
    }

    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    const content = await page.content();
    if (content.includes('ConferNet Dashboard')) {
        await page.getByText('Logout', { exact: true }).click();
        await page.waitForURL(/\/login/);
    }

    await page.getByLabel(/Email/i).fill(USERS.speaker.email);
    await page.getByLabel(/Password/i).fill(USERS.speaker.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(/\/home/);

    const createButton = page.locator('button:has-text("Create Event")');
    await expect(createButton).toHaveCount(0);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/19_speaker_no_create_event_button.png` });

    const hamburger = page.locator('button[aria-label="open drawer"]');
    await hamburger.click();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/20_speaker_drawer_opened.png` });

    await page.getByText('People').click();
    await expect(page.getByRole('heading', { name: 'Networking' })).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/21_speaker_people_page.png` });

    await hamburger.click();
    await page.getByText('Account').click();
    await page.waitForURL(/\/account/);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/22_speaker_account_page.png` });

    await expect(page.getByText('Triss Merigold')).toBeVisible();
    await expect(page.getByText('Speaker')).toBeVisible();
    await expect(page.getByText(/Email:/)).toBeVisible();
    await expect(page.getByText(/Phone:/)).toBeVisible();
    await expect(page.getByText(/Date of Birth:/)).toBeVisible();
    await expect(page.getByText(/Organization:/)).toBeVisible();
    await expect(page.getByText(/Country:/)).toBeVisible();
    await expect(page.getByText(/City:/)).toBeVisible();
    await expect(page.getByText(/Bio:/)).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/23_speaker_account_info_verified.png` });

    await expect(page.getByRole('tab', { name: 'Joined Events' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Bookmarked Events' })).toBeVisible();
    await expect(page.getByRole('tab', { name: "Events You're Speaking At" })).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/24_speaker_account_tabs_present.png` });

    await page.getByText('Logout').click();
    await page.waitForURL(/\/login/);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/25_speaker_logout.png` });
});

test('TC003 - Attendee Login, Event Check, Messages, and Account Tabs', async ({ page }) => {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
        fs.mkdirSync(SCREENSHOT_DIR);
    }

    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    const content = await page.content();
    if (content.includes('ConferNet Dashboard')) {
        await page.getByText('Logout', { exact: true }).click();
        await page.waitForURL(/\/login/);
    }

    await page.getByLabel(/Email/i).fill(USERS.attendee.email);
    await page.getByLabel(/Password/i).fill(USERS.attendee.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(/\/home/);

    const viewMore = page.locator('button:has-text("View More Details")').first();
    await expect(viewMore).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/26_attendee_view_button.png` });

    const bookmarkIcon = page.locator('svg[data-testid="BookmarkBorderIcon"]').first();
    await expect(bookmarkIcon).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/27_attendee_bookmark_icon.png` });

    const createEventButton = page.locator('button:has-text("Create Event")');
    await expect(createEventButton).toHaveCount(0);

    await page.locator('button[aria-label="open drawer"]').click();
    await page.getByText('Messages').click();
    await page.waitForURL(/\/messages/);
    await expect(page.getByText('Inbox')).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Message' })).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/28_attendee_inbox.png` });

    await page.locator('button[aria-label="open drawer"]').click();
    await page.getByText('Account').click();
    await page.waitForURL(/\/account/);

    await expect(page.getByText('Ciri Riannon')).toBeVisible();
    await expect(page.getByText('Attendee')).toBeVisible();

    await expect(page.getByRole('tab', { name: 'Joined Events' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Bookmarked Events' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Events You Organized' })).toHaveCount(0);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/29_attendee_account_tabs.png` });

    await page.getByText('Logout').click();
    await page.waitForURL(/\/login/);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/30_attendee_logout.png` });
});
