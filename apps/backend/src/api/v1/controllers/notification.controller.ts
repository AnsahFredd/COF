import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notification.service';

export const notificationController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await notificationService.createNotification(req.body);
      return res.status(201).json({
        success: true,
        message: 'Notification created successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await notificationService.getAllNotifications();
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await notificationService.getNotificationById(id);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await notificationService.updateNotification(id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Notification updated successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await notificationService.deleteNotification(id);
      return res.status(200).json({
        success: true,
        message: 'Notification deleted successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
