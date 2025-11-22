"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerEvent_controller_1 = require("../controllers/customerEvent.controller");
const auth_middleware_1 = require("src/middlewares/auth.middleware");
const validation_middleware_1 = require("src/middlewares/validation.middleware");
const customerEvent_dto_1 = require("../dtos/customerEvent.dto");
const customerEventRouter = (0, express_1.Router)();
// All customer event routes require ADMIN role
customerEventRouter.use(auth_middleware_1.authenticate, (0, auth_middleware_1.requireRole)('ADMIN'));
customerEventRouter.post('/', (0, validation_middleware_1.validate)(customerEvent_dto_1.createCustomerEventSchema), customerEvent_controller_1.customerEventController.create);
customerEventRouter.get('/', customerEvent_controller_1.customerEventController.getAll);
customerEventRouter.get('/:id', customerEvent_controller_1.customerEventController.getById);
customerEventRouter.put('/:id', (0, validation_middleware_1.validate)(customerEvent_dto_1.updateCustomerEventSchema), customerEvent_controller_1.customerEventController.update);
customerEventRouter.delete('/:id', customerEvent_controller_1.customerEventController.delete);
exports.default = customerEventRouter;
