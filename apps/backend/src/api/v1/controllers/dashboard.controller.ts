import { Request, Response, NextFunction } from 'express';
import { dashboardService } from '../services/dashboard.service';

export const dashboardController = {
  getStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await dashboardService.getStats();
      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  },

  getChartData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chartData = await dashboardService.getChartData();
      return res.status(200).json({
        success: true,
        data: chartData,
      });
    } catch (error) {
      next(error);
    }
  },
};
