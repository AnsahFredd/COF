import cron from 'node-cron';
import { processNotifications, cleanupOldNotifications } from './notification.job';

/**
 * Initialize and start all scheduled jobs
 */
export const startJobs = (): void => {
  console.log('[Job Scheduler] Starting scheduled jobs...');

  // Process pending notifications every hour
  cron.schedule('0 * * * *', async () => {
    console.log('[Job Scheduler] Running notification processing job');
    try {
      await processNotifications();
    } catch (error) {
      console.error('[Job Scheduler] Notification processing job failed:', error);
    }
  });

  // Clean up old notifications daily at 2 AM
  cron.schedule('0 2 * * *', async () => {
    console.log('[Job Scheduler] Running notification cleanup job');
    try {
      await cleanupOldNotifications();
    } catch (error) {
      console.error('[Job Scheduler] Notification cleanup job failed:', error);
    }
  });

  console.log('[Job Scheduler] All jobs scheduled successfully');
  console.log('[Job Scheduler] - Notification processing: Every hour');
  console.log('[Job Scheduler] - Notification cleanup: Daily at 2 AM');
};
