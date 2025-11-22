import { Request, Response, NextFunction } from 'express';
import { customerEventService } from '../services/customerEvent.service';

export const customerEventController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await customerEventService.createCustomerEvent(req.body);
      return res.status(201).json({
        success: true,
        message: 'Customer event created successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = typeof req.query.userId === 'string' ? req.query.userId : undefined;
      const result = await customerEventService.getAllCustomerEvents(userId);
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
      const result = await customerEventService.getCustomerEventById(id);
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
      const result = await customerEventService.updateCustomerEvent(id, req.body);
      return res.status(200).json({
        success: true,
        message: 'Customer event updated successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await customerEventService.deleteCustomerEvent(id);
      return res.status(200).json({
        success: true,
        message: 'Customer event deleted successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
