/**
 * @file dashboard.ts
 * @description Dashboard-related API endpoints
 */

import { api } from './api';

export interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  totalEvents: number;
  totalRevenue: number;
}

export interface ChartDataPoint {
  name: string;
  bookings: number;
  revenue: number;
}

export const dashboardService = {
  /**
   * Get dashboard statistics
   */
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get<{ success: boolean; data: DashboardStats }>('/dashboard/stats');
    return response.data;
  },

  /**
   * Get chart data for dashboard
   */
  getChartData: async (): Promise<ChartDataPoint[]> => {
    const response = await api.get<{ success: boolean; data: ChartDataPoint[] }>(
      '/dashboard/chart-data'
    );
    return response.data;
  },

  /**
   * Get recent activity
   */
  getRecentActivity: async (): Promise<any[]> => {
    const response = await api.get<{ success: boolean; data: any[] }>('/dashboard/recent-activity');
    return response.data;
  },
};

export default dashboardService;
