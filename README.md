# ConferNet UI

This is the frontend for the ConferNet web application, built with React, Firebase, and Material UI. The app supports three roles: **Organizer**, **Speaker**, and **Attendee**, each with their own set of permissions and screens.

### Live Site
Hosted at: [https://SOM3-1.github.io/Confernet-UI](https://SOM3-1.github.io/Confernet-UI)

---

## Getting Started

### Installation

If the project is already downloaded locally:

- Open a terminal inside the `Confernet-UI` folder.
- Run the following commands:

```bash
npm install
```

If you don't have the project locally: 
```bash
git clone https://github.com/SOM3-1/Confernet-UI.git
cd Confernet-UI
npm install
```

### Development Server
```bash
npm run dev
```
---

## Login & Sign-Up Instructions

### Logging In

### Organizer  
- **Email:** `dandelion@mail.com`  
- **Password:** `123456`

### Keynote Speaker  
- **Email:** `mj@mail.com`  
- **Password:** `123456`

### Attendee  
- **Email:** `ciri@mail.com`  
- **Password:** `123456`

After logging in, you'll be taken to the **Home** screen showing upcoming events.

- **Organizers** can create and manage events.
- **Speakers** can upload files for events they're assigned to.
- **Attendees** can join/bookmark events, comment, and rate.
---

### Signing Up

During sign-up, users must select a role. Each role grants access to different parts of the application:

### Organizer
- Can create events and assign keynote speakers and moderators.
- Can **edit** events (future events only).
- Has access to the **Attendees** tab in event details.
- Gets a **floating button** on home to create new events.
- Cannot join their own event.
- On creation, emails are sent to assigned speakers and moderators.

### Speaker
- Can view events where they are assigned as keynote speakers.
- Can upload files (PDF, PPT, etc.) only for events they are speaking at.
- Cannot join the event they are speaking at.
- Cannot edit any events.

### Attendee
- Can join/leave events.
- Can bookmark/save events.
- Can rate events only if they have joined.
- Can comment on events.
- Can be added as **moderator** by organizers.

**Note:** Roles are assigned at account creation and cannot be changed later.

---

## App Navigation

After signup or login, users are redirected to the **Home** screen where they see upcoming events.

### Hamburger Menu (Top-Left)
- **Home**: Displays upcoming events.
- **Account**: Shows user details, bookmarked events, and role-specific sections:
  - Attendees: Bookmarked + Joined events
  - Speakers: Events where they are speaking + Bookmarked + Joined events
  - Organizers: Events created + Bookmarked + Joined events
- **People**: Search users and start conversations.
- **Messages**: View and continue existing message threads.

---

## Home Page (Events Overview)
- Shows **upcoming events only** (from today onward).
- Refresh button to update the list.
- Each card includes:
  - **Bookmark/Unbookmark** toggle
  - **Join/Leave** event (except for speakers and organizers)
  - **View More** to navigate to full Event Details

### Organizer-Specific
- Sees a floating **"Create Event"** button.
- Can assign **keynote speakers** and **moderators**.

---

## Event Details Page

### Tabs
1. **Details**
   - Full description, dates, venue map, contact info, tags, QR code, links, etc.
   - Join/Leave or Bookmark/Remove Bookmark.
   - Organizers see **Edit Event** button instead of Join.
2. **Speakers**
   - Displays speaker info.
   - If current user is the speaker: show file upload area.
   - Others can only **view/download** uploaded files.
3. **Feedback**
   - All users can post **comments**.
   - Only attendees (not organizers/speakers) can submit **ratings**.
4. **Attendees**
   - Only visible to the **organizer**.
   - Lists all users who joined the event.

---

## Additional Notes
- Moderator and keynote speakers **cannot join events** they are assigned to.
- Only **users registered as speakers** can be added as keynote speakers.
- Only **attendees** can be added as moderators during event creation.

---

## Tests & Coverage

This project uses **[Vitest](https://vitest.dev/)** for unit testing and coverage reporting.

### Run All Tests
```bash
npm run test
```

Runs all tests once using Vitest.

---

### Watch Mode
```bash
npm run test:watch
```

Continuously watches for file changes and re-runs affected tests for a fast feedback loop during development.

---

### Generate Coverage Report
```bash
npm run test:coverage
```

Generates a full test coverage report in the `coverage/` directory.

- Open `coverage/index.html` in your browser to explore file-by-file breakdowns.
- Terminal output shows summary of:
  - Statements
  - Branches
  - Functions
  - Lines
---

## Automated End-to-End Testing with Playwright

Before running any tests, make sure the development server is running:

```bash
npm run dev
```

### Installation (One-time setup)

Install Playwright and its required browser binaries:

```bash
npx playwright install
```

### Available Test Commands

#### Run all tests in headed mode (with browser UI)

```bash
npm run e2e:file
```

#### Run all tests in headless mode (without browser UI)

```bash
npm run e2e
```

#### Run tests in headed mode (with browser UI)

```bash
npm run e2e:headed
```

#### Debug tests using Playwright Inspector

```bash
npm run e2e:debug
```

#### Run a specific test file

```bash
npm run e2e:file
```

> Update the path in `e2e:file` script if you want to point to a different test file.

#### Generate HTML Report

```bash
npm run e2e:run-report
```

### Help

If you encounter any issues, please raise an issue on the GitHub repository.