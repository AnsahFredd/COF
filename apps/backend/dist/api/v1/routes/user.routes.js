"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("src/middlewares/auth.middleware");
const userRouter = (0, express_1.Router)();
// All user routes require authentication
userRouter.use(auth_middleware_1.authenticate);
userRouter.post('/', user_controller_1.userController.create);
userRouter.get('/', user_controller_1.userController.getAll);
userRouter.get('/:id', user_controller_1.userController.getById);
userRouter.patch('/:id', user_controller_1.userController.update);
userRouter.delete('/:id', user_controller_1.userController.delete);
userRouter.post('/change-password', user_controller_1.userController.changePassword);
exports.default = userRouter;
