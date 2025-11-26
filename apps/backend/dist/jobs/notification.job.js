"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupOldNotifications = exports.processNotifications = void 0;
const database_1 = require("../config/database");
const email_1 = require("../utils/email");
/**
 * Process pending notifications and send emails
 * This job runs periodically to check for unread notifications
 * and send email alerts to users
 */
const processNotifications = async () => {
    try {
        console.log('[Notification Job] Starting notification processing...');
        // Get all unread notifications from the last 24 hours
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        const pendingNotifications = await database_1.prisma.notification.findMany({
            where: {
                isRead: false,
                createdAt: {
                    gte: oneDayAgo,
                },
            },
            include: {
                user: {
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        console.log(`[Notification Job] Found ${pendingNotifications.length} pending notifications`);
        // Send email for each notification
        for (const notification of pendingNotifications) {
            try {
                await (0, email_1.sendNotificationEmail)(notification.user.email, notification.title, notification.message);
                console.log(`[Notification Job] Email sent to ${notification.user.email}`);
            }
            catch (error) {
                console.error(`[Notification Job] Failed to send email to ${notification.user.email}:`, error);
            }
        }
        console.log('[Notification Job] Notification processing completed');
    }
    catch (error) {
        console.error('[Notification Job] Error processing notifications:', error);
        throw error;
    }
};
exports.processNotifications = processNotifications;
/**
 * Clean up old read notifications
 * Removes notifications older than 30 days that have been read
 */
const cleanupOldNotifications = async () => {
    try {
        console.log('[Notification Job] Starting cleanup of old notifications...');
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const result = await database_1.prisma.notification.deleteMany({
            where: {
                isRead: true,
                createdAt: {
                    lt: thirtyDaysAgo,
                },
            },
        });
        console.log(`[Notification Job] Deleted ${result.count} old notifications`);
    }
    catch (error) {
        console.error('[Notification Job] Error cleaning up notifications:', error);
        throw error;
    }
};
exports.cleanupOldNotifications = cleanupOldNotifications;
