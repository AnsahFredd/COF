import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';
import { authenticate, requireRole } from 'src/middlewares/auth.middleware';
import { Role } from '@prisma/client';

const dashboardRouter = Router();

// All dashboard routes require admin authentication
dashboardRouter.use(authenticate);
dashboardRouter.use(requireRole(Role.ADMIN));

dashboardRouter.get('/stats', dashboardController.getStats);
dashboardRouter.get('/chart-data', dashboardController.getChartData);

export default dashboardRouter;
