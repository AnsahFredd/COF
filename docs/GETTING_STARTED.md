# Getting Started

This guide will help you set up the CoFuel Home of Events project on your local machine.

## Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **PostgreSQL**: Local instance or cloud connection string.

## Installation

1.  **Clone the Repository:**

    ```bash
    git clone <repository-url>
    cd cofuel-home-of-events
    ```

2.  **Install Dependencies:**
    This project uses NPM Workspaces. Run the install command from the root directory:
    ```bash
    npm install
    ```

## Environment Setup

### Backend (`apps/backend`)

1.  Navigate to the backend directory:
    ```bash
    cd apps/backend
    ```
2.  Create a `.env` file (copy from `.env.example` if available) and configure the following:

    ```env
    PORT=3000
    DATABASE_URL="postgresql://user:password@localhost:5432/cofuel_db?schema=public"
    JWT_SECRET="your-super-secret-jwt-key"
    NODE_ENV="development"

    # AWS S3 Configuration (for file uploads)
    AWS_ACCESS_KEY_ID="your-access-key"
    AWS_SECRET_ACCESS_KEY="your-secret-key"
    AWS_REGION="us-east-1"
    AWS_BUCKET_NAME="your-bucket-name"

    # Email Configuration (Nodemailer)
    SMTP_HOST="smtp.example.com"
    SMTP_PORT=587
    SMTP_USER="user@example.com"
    SMTP_PASS="password"
    ```

3.  **Database Setup:**
    Run migrations to set up your database schema:
    ```bash
    npx prisma migrate dev
    ```
    (Optional) Seed the database:
    ```bash
    npm run prisma:seed
    ```

### Frontend (`apps/frontend`)

1.  Navigate to the frontend directory:
    ```bash
    cd apps/frontend
    ```
2.  Create a `.env` file:
    ```env
    VITE_API_URL="http://localhost:3000/api"
    ```

## Running the Application

From the **root** directory, you can start both frontend and backend concurrently:

```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

## Useful Commands

| Command          | Description                                          |
| :--------------- | :--------------------------------------------------- |
| `npm run dev`    | Start both frontend and backend in development mode. |
| `npm run build`  | Build all workspaces.                                |
| `npm run lint`   | Lint all workspaces.                                 |
| `npm run format` | Format code using Prettier.                          |
| `npm run test`   | Run tests across all workspaces.                     |
