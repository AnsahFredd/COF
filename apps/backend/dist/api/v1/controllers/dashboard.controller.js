"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
exports.dashboardController = {
    getStats: async (req, res, next) => {
        try {
            const stats = await dashboard_service_1.dashboardService.getStats();
            return res.status(200).json({
                success: true,
                data: stats,
            });
        }
        catch (error) {
            next(error);
        }
    },
    getChartData: async (req, res, next) => {
        try {
            const chartData = await dashboard_service_1.dashboardService.getChartData();
            return res.status(200).json({
                success: true,
                data: chartData,
            });
        }
        catch (error) {
            next(error);
        }
    },
};
