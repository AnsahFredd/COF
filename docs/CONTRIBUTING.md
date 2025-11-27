# Contributing Guidelines

Thank you for considering contributing to CoFuel Home of Events!

## Development Workflow

1.  **Fork and Clone**: Fork the repository and clone it locally.
2.  **Create a Branch**: Create a new branch for your feature or fix.
    ```bash
    git checkout -b feature/my-new-feature
    # or
    git checkout -b fix/bug-description
    ```
3.  **Install Dependencies**: Run `npm install` in the root directory.
4.  **Make Changes**: Implement your changes.
5.  **Test**: Run tests to ensure no regressions.
    ```bash
    npm run test
    ```
6.  **Lint & Format**: Ensure your code meets the style guidelines.
    ```bash
    npm run lint
    npm run format
    ```
7.  **Commit**: Commit your changes with a descriptive message.
    - We follow [Conventional Commits](https://www.conventionalcommits.org/).
    - Example: `feat(frontend): add new booking form`
8.  **Push**: Push your branch to your fork.
9.  **Pull Request**: Open a Pull Request (PR) against the `develop` branch.

## Code Style

- **TypeScript**: Use strict typing. Avoid `any` whenever possible.
- **React**: Use functional components and hooks.
- **Naming**:
  - Variables/Functions: `camelCase`
  - Components/Classes: `PascalCase`
  - Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities.

## Pull Request Process

1.  Ensure your PR description clearly explains the changes.
2.  Link any relevant issues.
3.  Wait for code review. Address any feedback.
4.  Once approved, your PR will be merged.
