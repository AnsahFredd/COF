"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../controllers/notification.controller");
const auth_middleware_1 = require("src/middlewares/auth.middleware");
const validation_middleware_1 = require("src/middlewares/validation.middleware");
const notification_dto_1 = require("../dtos/notification.dto");
const notificationRouter = (0, express_1.Router)();
// All notification routes require authentication
notificationRouter.use(auth_middleware_1.authenticate);
notificationRouter.post('/', (0, validation_middleware_1.validate)(notification_dto_1.createNotificationSchema), notification_controller_1.notificationController.create);
notificationRouter.get('/', notification_controller_1.notificationController.getAll);
notificationRouter.get('/:id', notification_controller_1.notificationController.getById);
notificationRouter.patch('/:id', (0, validation_middleware_1.validate)(notification_dto_1.updateNotificationSchema), notification_controller_1.notificationController.update);
notificationRouter.delete('/:id', notification_controller_1.notificationController.delete);
exports.default = notificationRouter;
