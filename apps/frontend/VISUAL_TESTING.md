# Visual Regression Testing Setup Guide

## Overview

This guide explains how to set up visual regression testing for the COF frontend application using Percy (by BrowserStack).

---

## Why Visual Regression Testing?

Visual regression testing automatically detects visual changes in your UI across different:

- **Breakpoints** (mobile, tablet, desktop)
- **Browsers** (Chrome, Firefox, Safari, Edge)
- **States** (hover, focus, error, success)

This ensures that CSS changes don't accidentally break layouts on different screen sizes.

---

## Setup Instructions

### 1. Install Percy

```bash
cd apps/frontend
npm install --save-dev @percy/cli @percy/storybook
```

### 2. Create Percy Account

1. Go to [percy.io](https://percy.io)
2. Sign up with GitHub
3. Create a new project: "COF Frontend"
4. Copy your `PERCY_TOKEN`

### 3. Add Percy Token to Environment

Create `.env.local`:

```bash
PERCY_TOKEN=your_percy_token_here
```

Add to `.gitignore`:

```
.env.local
```

### 4. Create Percy Configuration

Create `percy.config.js` in frontend root:

```javascript
module.exports = {
  version: 2,
  static: {
    baseUrl: 'http://localhost:5173',
    snapshotDirectory: 'src/pages',
    include: ['**/*.tsx'],
    exclude: ['**/*.test.tsx', '**/*.spec.tsx'],
  },
  snapshot: {
    widths: [375, 768, 1024, 1440],
    minHeight: 1024,
    percyCSS: '',
  },
};
```

### 5. Add NPM Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "percy:snapshot": "percy snapshot src/pages",
    "percy:exec": "percy exec -- npm run dev",
    "test:visual": "npm run percy:snapshot"
  }
}
```

---

## Running Visual Tests

### Local Development

```bash
# Start dev server
npm run dev

# In another terminal, run Percy
npm run percy:snapshot
```

### CI/CD Integration

Add to `.github/workflows/visual-regression.yml`:

```yaml
name: Visual Regression Tests

on:
  pull_request:
    branches: [main, develop]

jobs:
  percy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd apps/frontend
          npm ci

      - name: Build app
        run: |
          cd apps/frontend
          npm run build

      - name: Run Percy
        run: |
          cd apps/frontend
          npm run percy:snapshot
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

---

## Alternative: Chromatic (Storybook)

If you're using Storybook, Chromatic is a better option.

### 1. Install Chromatic

```bash
npm install --save-dev chromatic
```

### 2. Setup Storybook (if not already)

```bash
npx storybook@latest init
```

### 3. Create Stories for Components

Example: `CenteredContainer.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CenteredContainer } from './CenteredContainer';

const meta: Meta<typeof CenteredContainer> = {
  title: 'Layout/CenteredContainer',
  component: CenteredContainer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CenteredContainer>;

export const Default: Story = {
  args: {
    children: <div>Centered Content</div>,
  },
};

export const WithForm: Story = {
  args: {
    children: (
      <div style={{ width: '400px', padding: '20px', background: 'white' }}>
        <h1>Login Form</h1>
        <p>This is centered</p>
      </div>
    ),
  },
};
```

### 4. Run Chromatic

```bash
npx chromatic --project-token=<your-token>
```

---

## Manual Testing Checklist

Until automated visual regression is set up, use this checklist:

### Pages to Test

- [ ] Home
- [ ] Services
- [ ] Login
- [ ] Signup
- [ ] ForgotPassword
- [ ] ResetPassword
- [ ] VerifyEmail
- [ ] Settings
- [ ] NotFound
- [ ] About
- [ ] Contact
- [ ] Portfolio

### Breakpoints to Test

- [ ] 375px (iPhone SE)
- [ ] 414px (iPhone Pro Max)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)
- [ ] 1440px (Desktop)
- [ ] 1920px (Large Desktop)

### Checks for Each Page/Breakpoint

- [ ] No horizontal scroll
- [ ] Text is readable
- [ ] Buttons are accessible
- [ ] Images scale properly
- [ ] No layout breaks
- [ ] Spacing is consistent
- [ ] Typography scales correctly

---

## Browser Testing

### Recommended Tools

1. **BrowserStack** (Paid)
   - Real device testing
   - All browsers and OS combinations
   - [browserstack.com](https://www.browserstack.com)

2. **LambdaTest** (Paid/Free tier)
   - Cross-browser testing
   - Screenshot testing
   - [lambdatest.com](https://www.lambdatest.com)

3. **Browser DevTools** (Free)
   - Chrome DevTools (Device Mode)
   - Firefox Responsive Design Mode
   - Safari Web Inspector

### Manual Browser Testing

Test on:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Accessibility Testing

### Tools

1. **axe DevTools** (Browser Extension)
   - Free Chrome/Firefox extension
   - Automated accessibility checks

2. **WAVE** (Browser Extension)
   - Visual accessibility feedback
   - [wave.webaim.org](https://wave.webaim.org)

3. **Lighthouse** (Built into Chrome)
   - Performance + Accessibility + SEO
   - Run from Chrome DevTools

### Accessibility Checklist

- [ ] All images have alt text
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Sufficient color contrast
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] ARIA labels where needed

---

## Performance Testing

### Tools

1. **Lighthouse** (Chrome DevTools)
   - Performance score
   - Best practices
   - SEO

2. **WebPageTest** (Free)
   - Detailed performance metrics
   - [webpagetest.org](https://www.webpagetest.org)

3. **GTmetrix** (Free)
   - Performance analysis
   - [gtmetrix.com](https://gtmetrix.com)

### Performance Checklist

- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.8s
- [ ] Total Blocking Time < 200ms

---

## Recommended Testing Workflow

### For Each PR:

1. **Manual Testing**
   - Test on 3 breakpoints (mobile, tablet, desktop)
   - Test on 2 browsers (Chrome, Safari)

2. **Automated Testing** (once set up)
   - Percy/Chromatic runs automatically
   - Review visual diffs
   - Approve or reject changes

3. **Accessibility Check**
   - Run axe DevTools
   - Fix any critical issues

4. **Performance Check**
   - Run Lighthouse
   - Ensure score > 90

---

## Cost Comparison

| Tool         | Free Tier               | Paid       |
| ------------ | ----------------------- | ---------- |
| Percy        | 5,000 screenshots/month | $299/month |
| Chromatic    | 5,000 snapshots/month   | $149/month |
| BrowserStack | Limited                 | $29/month  |
| LambdaTest   | 100 minutes/month       | $15/month  |

**Recommendation**: Start with manual testing + free tools, then add Percy/Chromatic when budget allows.

---

## Next Steps

1. **Immediate** (Free)
   - [ ] Manual testing checklist
   - [ ] Browser DevTools testing
   - [ ] Lighthouse audits

2. **Short-term** (Free)
   - [ ] Set up Storybook
   - [ ] Create component stories
   - [ ] Use Chromatic free tier

3. **Long-term** (Paid)
   - [ ] Percy for automated visual regression
   - [ ] BrowserStack for cross-browser testing
   - [ ] Continuous monitoring

---

**Last Updated**: 2025-11-26
