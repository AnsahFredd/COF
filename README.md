# CoFuel Home of Events

A comprehensive event booking platform built with a modern tech stack.

## 🚀 Overview

CoFuel Home of Events is a full-stack application designed to streamline event management and booking. It features a robust backend for handling bookings, users, and notifications, and a responsive frontend for a seamless user experience.

## 🛠 Tech Stack

### Frontend

- **Framework:** React (Vite)
- **UI Library:** Mantine UI
- **State Management:** Zustand & TanStack Query
- **Routing:** React Router
- **Forms:** React Hook Form & Zod

### Backend

- **Framework:** Express.js (TypeScript)
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** JWT & Bcrypt
- **File Storage:** AWS S3
- **Validation:** Zod

## 📂 Project Structure

This project is a monorepo managed with NPM Workspaces:

- `apps/frontend`: The React-based frontend application.
- `apps/backend`: The Express.js backend API.
- `packages/shared`: Shared TypeScript types and utilities.

## 📖 Documentation

Detailed documentation is available in the `docs` directory:

- [Getting Started](./docs/GETTING_STARTED.md) - Setup and installation guide.
- [Architecture](./docs/ARCHITECTURE.md) - System architecture and tech stack details.
- [Frontend Documentation](./docs/FRONTEND.md) - Frontend structure and guidelines.
- [Backend Documentation](./docs/BACKEND.md) - Backend structure and API overview.
- [Deployment](./docs/DEPLOYMENT.md) - Deployment strategy and workflows.
- [Contributing](./docs/CONTRIBUTING.md) - Guidelines for contributing to the project.

## ⚡ Quick Start

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Setup Environment Variables:**
    - Copy `.env.example` to `.env` in `apps/backend` and `apps/frontend`.
    - Fill in the required values.

3.  **Start Development Servers:**
    ```bash
    npm run dev
    ```

## 📄 License

[ISC](LICENSE)
