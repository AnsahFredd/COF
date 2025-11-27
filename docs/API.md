# API Documentation

The backend provides a RESTful API for the CoFuel Home of Events platform.

**Base URL:** `http://localhost:3000/api` (Development)

## Authentication

Most endpoints require authentication. Include the JWT token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

## Response Format

Standard success response:

```json
{
  "success": true,
  "data": { ... }
}
```

Standard error response:

```json
{
  "success": false,
  "error": "Error message description"
}
```

## Key Endpoints

### Auth

- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Authenticate user and get token.
- `POST /auth/refresh-token` - Refresh access token.
- `POST /auth/forgot-password` - Request password reset.
- `POST /auth/reset-password` - Reset password with token.

### Users

- `GET /users/me` - Get current user profile.
- `PUT /users/me` - Update current user profile.
- `GET /users` - List all users (Admin only).

### Events

- `GET /events` - List all events.
- `GET /events/:id` - Get event details.
- `POST /events` - Create a new event (Admin only).
- `PUT /events/:id` - Update an event (Admin only).
- `DELETE /events/:id` - Delete an event (Admin only).

### Bookings

- `POST /bookings` - Create a new booking.
- `GET /bookings/my-bookings` - Get current user's bookings.
- `GET /bookings` - List all bookings (Admin only).
- `PATCH /bookings/:id/status` - Update booking status (Admin only).

### Portfolio

- `GET /portfolio` - Get portfolio items.
- `POST /portfolio` - Add portfolio item (Admin only).

_(Note: This is a high-level overview. For detailed request/response schemas, refer to the Zod schemas in the backend source code or generate Swagger docs if available.)_
