import { prisma } from 'src/config/database';
import { getClient, isConnected } from '../../../libs/cache/core';

export const dashboardService = {
  /**
   * Get dashboard statistics
   */
  getStats: async () => {
    // Try to get from cache first
    const cacheKey = 'dashboard:stats';
    // We can use the generic cache client or add a specific method in cache/dashboard.ts if we wanted to be strict,
    // but for now let's use the core client or just add a helper here.
    // Since we didn't expose a generic 'get' in the modular refactor (only specific domain functions),
    // we should probably use the redis client directly or add a generic helper.
    // However, looking at the refactor, we have specific domain files.
    // Let's use the 'core' getClient to access redis directly for this dashboard specific case,
    // OR better, let's assume we can add a simple generic cache helper in core or just use the client.

    // Actually, let's import the client from core to keep it clean.
    // const { getClient, isConnected } = require('../../../libs/cache/core');

    if (isConnected()) {
      try {
        const client = getClient();
        const cached = await client.get(cacheKey);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch (err) {
        console.error('Cache get error', err);
      }
    }

    const [totalUsers, totalBookings, totalEvents] = await Promise.all([
      prisma.user.count(),
      prisma.booking.count(),
      prisma.customerEvent.count(),
    ]);

    // Since budget is a string field, we'll just return 0 for now
    // You can implement proper revenue tracking later
    const totalRevenue = 0;

    const stats = {
      totalUsers,
      totalBookings,
      totalEvents,
      totalRevenue,
    };

    if (isConnected()) {
      try {
        const client = getClient();
        await client.set(cacheKey, JSON.stringify(stats), 'EX', 300); // 5 minutes
      } catch (err) {
        console.error('Cache set error', err);
      }
    }

    return stats;
  },

  /**
   * Get chart data for dashboard (last 7 days)
   */
  getChartData: async () => {
    const cacheKey = 'dashboard:chart';
    // const { getClient, isConnected } = require('../../../libs/cache/core');

    if (isConnected()) {
      try {
        const client = getClient();
        const cached = await client.get(cacheKey);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch (err) {
        console.error('Cache get error', err);
      }
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get all bookings from last 7 days
    const bookings = await prisma.booking.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Format data for charts
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

      const dayBookings = bookings.filter((b) => {
        const bookingDate = new Date(b.createdAt);
        return bookingDate.toDateString() === date.toDateString();
      });

      chartData.push({
        name: dayName,
        bookings: dayBookings.length,
        revenue: 0, // Placeholder since budget is a string
      });
    }

    if (isConnected()) {
      try {
        const client = getClient();
        await client.set(cacheKey, JSON.stringify(chartData), 'EX', 3600); // 1 hour
      } catch (err) {
        console.error('Cache set error', err);
      }
    }

    return chartData;
  },
};
