# Deployment & Workflow Setup

This document outlines how to configure your GitHub repository to enforce the separation between Development and Production environments.

## 1. Branch Strategy

- **`main`**: Production code. Only deployable to the Production environment. Direct pushes should be blocked.
- **`develop`**: Development code. Deploys to the Development environment.

## 2. GitHub Configuration

To enforce this strategy, you need to configure settings in your GitHub repository.

### A. Branch Protection Rules

Prevent direct pushes to `main` and ensure code is reviewed before merging.

1. Go to **Settings** > **Branches**.
2. Click **Add branch protection rule**.
3. **Rule for `main`**:
   - **Branch name pattern**: `main`
   - Check **Require a pull request before merging**.
   - Check **Require approvals** (recommended: 1).
   - Check **Do not allow bypassing the above settings**.
   - Click **Create**.
4. **Rule for `develop`** (Optional but recommended):
   - **Branch name pattern**: `develop`
   - Check **Require a pull request before merging**.
   - Click **Create**.

### B. Environments

Set up environments to manage secrets and deployment protection rules.

1. Go to **Settings** > **Environments**.
2. **Create Production Environment**:
   - Click **New environment**.
   - Name: `production`
   - **Deployment branches**: Select **Selected branches** -> Add rule -> `main`. (This ensures ONLY `main` can deploy to production).
   - **Environment secrets**: Add your production secrets here (e.g., `DB_URL`, `API_KEY`).
3. **Create Development Environment**:
   - Click **New environment**.
   - Name: `development`
   - **Deployment branches**: Select **Selected branches** -> Add rule -> `develop`.
   - **Environment secrets**: Add your development secrets here.

## 3. How the Workflow Works

The `.github/workflows/deploy.yml` file is configured to respect these environments:

- When code is pushed to `develop`, the **Deploy to Development** job runs using the `development` environment configuration.
- When code is pushed to `main`, the **Deploy to Production** job runs using the `production` environment configuration.

## 4. Next Steps

- Add your actual deployment commands to `.github/workflows/deploy.yml`.
- Populate the secrets in the GitHub Environments settings.
