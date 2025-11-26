import { Router } from 'express';
import authRouter from 'src/api/v1/routes/auth.routes';
import customerEventRouter from './routes/customerEvent.routes';
import bookingRouter from './routes/booking.routes';
import notificationRouter from './routes/notification.routes';
import userRouter from './routes/user.routes';
import dashboardRouter from './routes/dashboard.routes';
import portfolioRouter from './routes/portfolio.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRouter);
router.use('/customer-events', customerEventRouter);
router.use('/bookings', bookingRouter);
router.use('/notifications', notificationRouter);
router.use('/users', userRouter);
router.use('/dashboard', dashboardRouter);
router.use('/portfolio', portfolioRouter);
export default router;
