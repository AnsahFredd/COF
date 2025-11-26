# Design System Documentation

## Overview

This document outlines the design system for the COF frontend application, including breakpoints, typography, spacing, and component usage.

---

## 🎨 Design Tokens

### Breakpoints

Consistent breakpoints used across all pages and components:

```css
--breakpoint-mobile: 480px --breakpoint-tablet: 768px --breakpoint-desktop: 1024px
  --breakpoint-wide: 1440px;
```

**Usage in CSS Modules:**

```css
/* Desktop first (default) */
.element {
  font-size: 30px;
}

/* Tablet */
@media (max-width: 768px) {
  .element {
    font-size: 24px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .element {
    font-size: 20px;
  }
}
```

---

### Typography Scale

Consistent font sizes using CSS variables:

| Variable           | Size     | Pixels | Usage                  |
| ------------------ | -------- | ------ | ---------------------- |
| `--font-size-xs`   | 0.75rem  | 12px   | Small labels, captions |
| `--font-size-sm`   | 0.875rem | 14px   | Body text (small)      |
| `--font-size-base` | 1rem     | 16px   | Body text (default)    |
| `--font-size-lg`   | 1.125rem | 18px   | Large body text        |
| `--font-size-xl`   | 1.25rem  | 20px   | Small headings         |
| `--font-size-2xl`  | 1.5rem   | 24px   | Medium headings        |
| `--font-size-3xl`  | 1.875rem | 30px   | Large headings         |
| `--font-size-4xl`  | 2.25rem  | 36px   | Extra large headings   |
| `--font-size-5xl`  | 3rem     | 48px   | Hero headings          |

**Responsive Typography Pattern:**

```css
.heading {
  font-size: var(--font-size-3xl); /* 30px desktop */
}

@media (max-width: 768px) {
  .heading {
    font-size: var(--font-size-2xl); /* 24px tablet */
  }
}

@media (max-width: 480px) {
  .heading {
    font-size: var(--font-size-xl); /* 20px mobile */
  }
}
```

---

### Spacing Scale

Consistent spacing using CSS variables:

| Variable        | Size   | Pixels | Usage               |
| --------------- | ------ | ------ | ------------------- |
| `--spacing-xs`  | 0.5rem | 8px    | Tight spacing       |
| `--spacing-sm`  | 1rem   | 16px   | Small spacing       |
| `--spacing-md`  | 1.5rem | 24px   | Medium spacing      |
| `--spacing-lg`  | 2rem   | 32px   | Large spacing       |
| `--spacing-xl`  | 3rem   | 48px   | Extra large spacing |
| `--spacing-2xl` | 4rem   | 64px   | Section spacing     |
| `--spacing-3xl` | 6rem   | 96px   | Hero spacing        |

**Responsive Spacing Pattern:**

```css
.section {
  padding: var(--spacing-3xl) var(--spacing-lg); /* 96px 32px desktop */
}

@media (max-width: 768px) {
  .section {
    padding: var(--spacing-2xl) var(--spacing-md); /* 64px 24px tablet */
  }
}

@media (max-width: 480px) {
  .section {
    padding: var(--spacing-xl) var(--spacing-sm); /* 48px 16px mobile */
  }
}
```

---

## 🧩 Reusable Components

### CenteredContainer

Centers content vertically and horizontally with responsive padding.

**Import:**

```tsx
import { CenteredContainer } from 'src/components';
```

**Usage:**

```tsx
<CenteredContainer>
  <YourContent />
</CenteredContainer>
```

**Props:**

- `children`: React.ReactNode (required)
- `className`: string (optional)

**Replaces:**

```tsx
// ❌ Old pattern
<Center style={{ minHeight: '100vh' }}>
  <YourContent />
</Center>

// ✅ New pattern
<CenteredContainer>
  <YourContent />
</CenteredContainer>
```

---

### ResponsiveSection

Provides consistent section spacing with responsive variants.

**Import:**

```tsx
import { ResponsiveSection } from 'src/components';
```

**Usage:**

```tsx
<ResponsiveSection variant="default">
  <YourContent />
</ResponsiveSection>
```

**Props:**

- `children`: React.ReactNode (required)
- `variant`: 'default' | 'compact' | 'spacious' (optional, default: 'default')
- `className`: string (optional)

**Variants:**

- `default`: Standard spacing (64px → 48px → 32px)
- `compact`: Less spacing (48px → 32px → 24px)
- `spacious`: More spacing (96px → 64px → 48px)

**Example:**

```tsx
<ResponsiveSection variant="spacious">
  <HeroContent />
</ResponsiveSection>

<ResponsiveSection variant="default">
  <MainContent />
</ResponsiveSection>

<ResponsiveSection variant="compact">
  <FooterContent />
</ResponsiveSection>
```

---

### IconContainer

Displays icons in circular containers with color variants.

**Import:**

```tsx
import { IconContainer } from 'src/components';
```

**Usage:**

```tsx
<IconContainer variant="success" size="md">
  <IconCheck size={40} />
</IconContainer>
```

**Props:**

- `children`: React.ReactNode (required)
- `variant`: 'success' | 'error' | 'warning' | 'info' (required)
- `size`: 'sm' | 'md' | 'lg' (optional, default: 'md')
- `className`: string (optional)

**Sizes:**

- `sm`: 60px (50px on mobile)
- `md`: 80px (64px on mobile)
- `lg`: 100px (80px on mobile)

**Variants:**

- `success`: Green background
- `error`: Red background
- `warning`: Yellow background
- `info`: Blue background

**Example:**

```tsx
// Success state
<IconContainer variant="success" size="lg">
  <IconCheck size={48} />
</IconContainer>

// Error state
<IconContainer variant="error" size="md">
  <IconAlertCircle size={40} />
</IconContainer>
```

---

## 📋 CSS Module Best Practices

### 1. File Naming Convention

```
ComponentName.tsx
ComponentName.module.css
index.ts
```

### 2. CSS Module Structure

```css
/* Component base styles */
.container {
  /* styles */
}

/* Variants */
.primary {
  /* styles */
}

.secondary {
  /* styles */
}

/* States */
.disabled {
  /* styles */
}

.active {
  /* styles */
}

/* Tablet */
@media (max-width: 768px) {
  .container {
    /* responsive styles */
  }
}

/* Mobile */
@media (max-width: 480px) {
  .container {
    /* responsive styles */
  }
}
```

### 3. Importing and Using CSS Modules

```tsx
import styles from './Component.module.css';

export const Component = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
      <p className={styles.description}>Description</p>
    </div>
  );
};
```

### 4. Combining Classes

```tsx
// Multiple classes
<div className={`${styles.container} ${styles.active}`}>

// Conditional classes
<div className={`${styles.container} ${isActive ? styles.active : ''}`}>

// With external className prop
<div className={`${styles.container} ${className || ''}`}>
```

---

## 🚫 Anti-Patterns to Avoid

### ❌ Inline Styles

```tsx
// ❌ Don't do this
<div style={{ padding: '20px', fontSize: '16px' }}>
  Content
</div>

// ✅ Do this instead
<div className={styles.container}>
  Content
</div>
```

### ❌ String ClassNames (without CSS Modules)

```tsx
// ❌ Avoid this
<div className="container">
  Content
</div>

// ✅ Use CSS Modules
<div className={styles.container}>
  Content
</div>
```

### ❌ Hardcoded Breakpoints

```tsx
// ❌ Don't do this
<div style={{ fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>

// ✅ Use CSS Modules with media queries
<div className={styles.responsiveText}>
```

---

## 📱 Responsive Design Patterns

### Pattern 1: Typography Scaling

```css
.heading {
  font-size: var(--font-size-3xl);
}

@media (max-width: 768px) {
  .heading {
    font-size: var(--font-size-2xl);
  }
}

@media (max-width: 480px) {
  .heading {
    font-size: var(--font-size-xl);
  }
}
```

### Pattern 2: Layout Changes

```css
.container {
  display: flex;
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}
```

### Pattern 3: Spacing Adjustments

```css
.section {
  padding: var(--spacing-3xl) var(--spacing-lg);
}

@media (max-width: 768px) {
  .section {
    padding: var(--spacing-2xl) var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .section {
    padding: var(--spacing-xl) var(--spacing-sm);
  }
}
```

---

## 🎯 Component Examples

### Auth Page Pattern

```tsx
import { CenteredContainer } from 'src/components';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  return (
    <CenteredContainer>
      <Container className={styles.authPaper}>
        <Title className={styles.authTitle}>Welcome back!</Title>
        <Text className={styles.authSubtext}>Sign in to continue</Text>
        <form className={styles.formStack}>{/* Form fields */}</form>
      </Container>
    </CenteredContainer>
  );
};
```

### Section Pattern

```tsx
import { ResponsiveSection } from 'src/components';
import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <ResponsiveSection variant="spacious">
        <HeroSection />
      </ResponsiveSection>

      <ResponsiveSection variant="default">
        <FeaturesSection />
      </ResponsiveSection>

      <ResponsiveSection variant="compact">
        <CTASection />
      </ResponsiveSection>
    </div>
  );
};
```

### Icon Container Pattern

```tsx
import { IconContainer } from 'src/components';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';

export const StatusDisplay = ({ success, error }) => {
  if (success) {
    return (
      <IconContainer variant="success" size="md">
        <IconCheck size={40} />
      </IconContainer>
    );
  }

  if (error) {
    return (
      <IconContainer variant="error" size="md">
        <IconAlertCircle size={40} />
      </IconContainer>
    );
  }

  return null;
};
```

---

## 🔍 Testing Checklist

### Responsive Testing

Test each page at these breakpoints:

- **Mobile**: 375px (iPhone SE), 414px (iPhone Pro Max)
- **Tablet**: 768px (iPad), 1024px (iPad Pro)
- **Desktop**: 1440px, 1920px

### Visual Checks

- [ ] No horizontal scroll on any breakpoint
- [ ] Text is readable at all sizes
- [ ] Buttons/CTAs are accessible
- [ ] Images scale properly
- [ ] No layout breaks
- [ ] Spacing is consistent

### Code Quality

- [ ] No inline styles
- [ ] All styles in CSS Modules
- [ ] Consistent breakpoints used
- [ ] Typography scales predictably
- [ ] Spacing scales predictably

---

## 📚 Additional Resources

### Files to Reference

- [breakpoints.css](file:///c:/Users/user/OneDrive/Desktop/COF/apps/frontend/src/styles/breakpoints.css) - Global design tokens
- [CenteredContainer](file:///c:/Users/user/OneDrive/Desktop/COF/apps/frontend/src/components/layout/CenteredContainer) - Centered layout component
- [ResponsiveSection](file:///c:/Users/user/OneDrive/Desktop/COF/apps/frontend/src/components/layout/ResponsiveSection) - Section spacing component
- [IconContainer](file:///c:/Users/user/OneDrive/Desktop/COF/apps/frontend/src/components/ui/IconContainer) - Icon display component

### Example Pages

- [LoginPage.tsx](file:///c:/Users/user/OneDrive/Desktop/COF/apps/frontend/src/pages/auth/LoginPage.tsx) - Auth page pattern
- [HomePage.tsx](file:///c:/Users/user/OneDrive/Desktop/COF/apps/frontend/src/pages/Home/HomePage.tsx) - Home page pattern
- [portfolio.module.css](file:///c:/Users/user/OneDrive/Desktop/COF/apps/frontend/src/pages/portfolio/portfolio.module.css) - Comprehensive responsive design

---

**Last Updated**: 2025-11-26
**Version**: 1.0.0
