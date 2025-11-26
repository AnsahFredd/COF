"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = void 0;
const database_1 = require("src/config/database");
const core_1 = require("../../../libs/cache/core");
exports.dashboardService = {
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
        if ((0, core_1.isConnected)()) {
            try {
                const client = (0, core_1.getClient)();
                const cached = await client.get(cacheKey);
                if (cached) {
                    return JSON.parse(cached);
                }
            }
            catch (err) {
                console.error('Cache get error', err);
            }
        }
        const [totalUsers, totalBookings, totalEvents] = await Promise.all([
            database_1.prisma.user.count(),
            database_1.prisma.booking.count(),
            database_1.prisma.customerEvent.count(),
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
        if ((0, core_1.isConnected)()) {
            try {
                const client = (0, core_1.getClient)();
                await client.set(cacheKey, JSON.stringify(stats), 'EX', 300); // 5 minutes
            }
            catch (err) {
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
        if ((0, core_1.isConnected)()) {
            try {
                const client = (0, core_1.getClient)();
                const cached = await client.get(cacheKey);
                if (cached) {
                    return JSON.parse(cached);
                }
            }
            catch (err) {
                console.error('Cache get error', err);
            }
        }
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        // Get all bookings from last 7 days
        const bookings = await database_1.prisma.booking.findMany({
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
        if ((0, core_1.isConnected)()) {
            try {
                const client = (0, core_1.getClient)();
                await client.set(cacheKey, JSON.stringify(chartData), 'EX', 3600); // 1 hour
            }
            catch (err) {
                console.error('Cache set error', err);
            }
        }
        return chartData;
    },
};
