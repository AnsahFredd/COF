"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking.controller");
const auth_middleware_1 = require("src/middlewares/auth.middleware");
const validation_middleware_1 = require("src/middlewares/validation.middleware");
const booking_dto_1 = require("../dtos/booking.dto");
const bookingRouter = (0, express_1.Router)();
// All booking routes require authentication
bookingRouter.use(auth_middleware_1.authenticate);
bookingRouter.post('/', (0, validation_middleware_1.validate)(booking_dto_1.createBookingSchema), booking_controller_1.bookingController.create);
bookingRouter.get('/', booking_controller_1.bookingController.getAll);
bookingRouter.get('/:id', booking_controller_1.bookingController.getById);
bookingRouter.put('/:id', (0, validation_middleware_1.validate)(booking_dto_1.updateBookingSchema), booking_controller_1.bookingController.update);
bookingRouter.delete('/:id', booking_controller_1.bookingController.delete);
exports.default = bookingRouter;
