import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller';
import { authenticate } from 'src/middlewares/auth.middleware';
import { validate } from 'src/middlewares/validation.middleware';
import { createBookingSchema, updateBookingSchema } from '../dtos/booking.dto';

const bookingRouter = Router();

// All booking routes require authentication
bookingRouter.use(authenticate);

bookingRouter.post('/', validate(createBookingSchema), bookingController.create);
bookingRouter.get('/', bookingController.getAll);
bookingRouter.get('/:id', bookingController.getById);
bookingRouter.put('/:id', validate(updateBookingSchema), bookingController.update);
bookingRouter.delete('/:id', bookingController.delete);

export default bookingRouter;
