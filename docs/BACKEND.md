# Backend Documentation

The backend is a REST API built with Express.js, TypeScript, and Prisma.

## Directory Structure

```
apps/backend/
├── prisma/             # Database schema and migrations
├── src/
│   ├── config/         # Environment configuration
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Express middlewares (Auth, Error handling)
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Helper functions (Logger, Email)
│   ├── app.ts          # Express app setup
│   └── main.ts         # Entry point
```

## Database (Prisma)

We use Prisma ORM with PostgreSQL.

- **Schema**: Defined in `prisma/schema.prisma`.
- **Migrations**: Run `npx prisma migrate dev` after changing the schema to update the database.
- **Client**: The Prisma Client is generated automatically. Use it to interact with the DB.

## Authentication

Authentication is handled via JWT.

- **Middleware**: `src/middlewares/auth.ts` verifies the token.
- **Decorators/Helpers**: Use `req.user` to access the authenticated user's data in controllers.

## Error Handling

We use a global error handler middleware.

- Throw standard errors (or custom `AppError` if available) in services/controllers.
- The middleware catches them and formats the JSON response.

## Logging

We use **Winston** for logging.

- Use the logger utility instead of `console.log` for production-ready logs.

## Adding a New Endpoint

1.  Define the route in `src/routes/`.
2.  Create a controller method in `src/controllers/`.
3.  Implement the business logic in `src/services/`.
4.  (Optional) Add Zod validation middleware for the request body.
