"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = void 0;
const database_1 = require("src/config/database");
exports.dashboardService = {
    /**
     * Get dashboard statistics
     */
    getStats: async () => {
        const [totalUsers, totalBookings, totalEvents] = await Promise.all([
            database_1.prisma.user.count(),
            database_1.prisma.booking.count(),
            database_1.prisma.customerEvent.count(),
        ]);
        // Since budget is a string field, we'll just return 0 for now
        // You can implement proper revenue tracking later
        const totalRevenue = 0;
        return {
            totalUsers,
            totalBookings,
            totalEvents,
            totalRevenue,
        };
    },
    /**
     * Get chart data for dashboard (last 7 days)
     */
    getChartData: async () => {
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
        return chartData;
    },
};
