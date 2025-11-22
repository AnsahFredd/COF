import { Router } from 'express';
import { customerEventController } from '../controllers/customerEvent.controller';
import { authenticate, requireRole } from 'src/middlewares/auth.middleware';
import { validate } from 'src/middlewares/validation.middleware';
import { createCustomerEventSchema, updateCustomerEventSchema } from '../dtos/customerEvent.dto';

const customerEventRouter = Router();

// Public route for contact form submissions
customerEventRouter.post('/', validate(createCustomerEventSchema), customerEventController.create);

// All other customer event routes require ADMIN role
customerEventRouter.use(authenticate, requireRole('ADMIN'));

customerEventRouter.get('/', customerEventController.getAll);
customerEventRouter.get('/:id', customerEventController.getById);
customerEventRouter.put(
  '/:id',
  validate(updateCustomerEventSchema),
  customerEventController.update
);
customerEventRouter.delete('/:id', customerEventController.delete);

export default customerEventRouter;
