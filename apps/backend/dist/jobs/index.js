"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const notification_job_1 = require("./notification.job");
/**
 * Initialize and start all scheduled jobs
 */
const startJobs = () => {
    console.log('[Job Scheduler] Starting scheduled jobs...');
    // Process pending notifications every hour
    node_cron_1.default.schedule('0 * * * *', async () => {
        console.log('[Job Scheduler] Running notification processing job');
        try {
            await (0, notification_job_1.processNotifications)();
        }
        catch (error) {
            console.error('[Job Scheduler] Notification processing job failed:', error);
        }
    });
    // Clean up old notifications daily at 2 AM
    node_cron_1.default.schedule('0 2 * * *', async () => {
        console.log('[Job Scheduler] Running notification cleanup job');
        try {
            await (0, notification_job_1.cleanupOldNotifications)();
        }
        catch (error) {
            console.error('[Job Scheduler] Notification cleanup job failed:', error);
        }
    });
    console.log('[Job Scheduler] All jobs scheduled successfully');
    console.log('[Job Scheduler] - Notification processing: Every hour');
    console.log('[Job Scheduler] - Notification cleanup: Daily at 2 AM');
};
exports.startJobs = startJobs;
