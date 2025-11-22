"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNotificationSummary = exports.toPublicNotifications = exports.toPublicNotification = void 0;
const user_mapper_1 = require("./user.mapper");
/**
 * Maps a Notification entity to a public response object
 */
const toPublicNotification = (notification) => ({
    id: notification.id,
    userId: notification.userId,
    title: notification.title,
    message: notification.message,
    isRead: notification.isRead,
    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt,
    // Include user data if it was loaded in the query
    ...(notification.user && { user: (0, user_mapper_1.toPublicUser)(notification.user) }),
});
exports.toPublicNotification = toPublicNotification;
/**
 * Maps multiple notifications to public response objects
 */
const toPublicNotifications = (notifications) => notifications.map(exports.toPublicNotification);
exports.toPublicNotifications = toPublicNotifications;
/**
 * Maps a notification to a minimal summary (for notification badges)
 */
const toNotificationSummary = (notification) => ({
    id: notification.id,
    title: notification.title,
    isRead: notification.isRead,
    createdAt: notification.createdAt,
});
exports.toNotificationSummary = toNotificationSummary;
