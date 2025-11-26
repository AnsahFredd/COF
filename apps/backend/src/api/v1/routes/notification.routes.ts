import { Router } from 'express';
import { notificationController } from '../controllers/notification.controller';
import { authenticate } from 'src/middlewares/auth.middleware';
import { validate } from 'src/middlewares/validation.middleware';
import { createNotificationSchema, updateNotificationSchema } from '../dtos/notification.dto';

const notificationRouter = Router();

// All notification routes require authentication
notificationRouter.use(authenticate);

notificationRouter.post('/', validate(createNotificationSchema), notificationController.create);
notificationRouter.get('/', notificationController.getAll);
notificationRouter.get('/:id', notificationController.getById);
notificationRouter.patch('/:id', validate(updateNotificationSchema), notificationController.update);
notificationRouter.delete('/:id', notificationController.delete);

export default notificationRouter;
