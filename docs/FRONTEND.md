# Frontend Documentation

The frontend is a Single Page Application (SPA) built with React, Vite, and Mantine UI.

## Directory Structure

```
apps/frontend/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, global styles
│   ├── components/     # Reusable UI components
│   │   ├── layout/     # Header, Footer, etc.
│   │   ├── ui/         # Generic UI elements (Buttons, Inputs)
│   ├── constants/      # Global constants (Routes, Config)
│   ├── features/       # Feature-based logic (Auth, Bookings)
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components (routed)
│   ├── services/       # API services (Axios instances)
│   ├── store/          # Zustand stores
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Helper functions
│   ├── validators/     # Zod schemas
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
```

## Key Technologies

- **Mantine UI**: We use Mantine for our component library. Refer to [Mantine Docs](https://mantine.dev/) for usage.
- **Zustand**: Used for global client state. Stores are located in `src/store`.
- **React Query**: Used for data fetching. Custom hooks for queries/mutations are often co-located with features or pages.
- **React Hook Form**: Used for form handling. We wrap Mantine inputs with `react-hook-form` controllers or use `mantine-form` where appropriate.

## Styling

- **Mantine Theme**: Global theme configuration is in `src/theme.ts` (or `App.tsx`).
- **CSS Modules**: For component-specific styles that go beyond Mantine's props, use `*.module.css` files.
- **Global Styles**: `src/index.css` handles global resets and utility classes.

## Adding a New Page

1.  Create a new directory in `src/pages/` (e.g., `src/pages/NewFeature/`).
2.  Create the page component `NewFeaturePage.tsx`.
3.  Add the route in `src/App.tsx` (or your router configuration file).
4.  (Optional) Add a link to the navigation in `src/components/layout/header/constants/navItems.ts`.

## Linting & Formatting

Run `npm run lint` to check for code quality issues.
Run `npm run format` to auto-format code with Prettier.
