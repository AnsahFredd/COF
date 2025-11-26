# Mapper Usage Guide

## Overview

Mappers transform database entities into secure, API-friendly response objects. They remove sensitive fields and provide consistent data structures.

---

## Quick Reference

### Import Mappers

```typescript
import {
  toPublicUser,
  toPublicBooking,
  toPublicCustomerEvent,
  toPublicNotification,
} from '../mappers';
```

---

## Usage Examples

### 1. User Mapper

**In auth.service.ts (Login/Register):**

```typescript
import { toAuthUser } from '../mappers';

// After creating/finding user
const user = await userRepository.findByEmail(email);
return toAuthUser(user); // Returns only safe fields for auth
```

**In user.service.ts (Get Profile):**

```typescript
import { toPublicUser, toPublicUsers } from '../mappers';

// Single user
const user = await userRepository.findById(id);
return toPublicUser(user);

// Multiple users
const users = await userRepository.findAll();
return toPublicUsers(users);
```

---

### 2. Booking Mapper

**In booking.service.ts:**

```typescript
import { toPublicBooking, toPublicBookings } from '../mappers';

// Get single booking with user relation
const booking = await bookingRepository.findById(id, { includeUser: true });
return toPublicBooking(booking); // Automatically includes user if loaded

// Get all bookings
const bookings = await bookingRepository.findAll();
return toPublicBookings(bookings);
```

---

### 3. Customer Event Mapper

**In customerEvent.service.ts:**

```typescript
import { toPublicCustomerEvent, toCustomerEventSummary } from '../mappers';

// Full event details
const event = await customerEventRepository.findById(id);
return toPublicCustomerEvent(event);

// Summary for lists (lighter payload)
const events = await customerEventRepository.findAll();
return events.map(toCustomerEventSummary);
```

---

### 4. Notification Mapper

**In notification.service.ts:**

```typescript
import { toPublicNotification, toNotificationSummary } from '../mappers';

// Full notification
const notification = await notificationRepository.findById(id);
return toPublicNotification(notification);

// For notification badge (minimal data)
const unread = await notificationRepository.findUnread(userId);
return unread.map(toNotificationSummary);
```

---

## Security Benefits

### ✅ User Mapper Removes:

- `password` - Hashed password
- `refreshToken` - JWT refresh token
- `passwordResetToken` - Password reset token
- `passwordResetExpires` - Reset expiry date
- `emailVerificationToken` - Email verification token

### ✅ All Mappers Provide:

- Consistent response structure
- Type-safe responses
- Optional nested relations
- Summary views for lists

---

## Best Practices

1. **Always use mappers before returning data from services**

   ```typescript
   // ❌ Bad
   return await userRepository.findById(id);

   // ✅ Good
   const user = await userRepository.findById(id);
   return toPublicUser(user);
   ```

2. **Use summary mappers for list endpoints**

   ```typescript
   // For /api/bookings (list)
   return bookings.map(toBookingSummary);

   // For /api/bookings/:id (details)
   return toPublicBooking(booking);
   ```

3. **Handle nested relations automatically**
   ```typescript
   // Mapper checks if relation exists
   const booking = await repo.findById(id, { include: { user: true } });
   return toPublicBooking(booking); // Includes user if loaded
   ```

---

## Type Safety

All mappers export TypeScript types:

```typescript
import type { PublicUser, AuthUser } from '../mappers';
import type { PublicBooking, BookingSummary } from '../mappers';
import type { PublicCustomerEvent, CustomerEventSummary } from '../mappers';
import type { PublicNotification, NotificationSummary } from '../mappers';
```

Use these types in your service return types for full type safety!
