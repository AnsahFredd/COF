"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = require("src/middlewares/auth.middleware");
const client_1 = require("@prisma/client");
const dashboardRouter = (0, express_1.Router)();
// All dashboard routes require admin authentication
dashboardRouter.use(auth_middleware_1.authenticate);
dashboardRouter.use((0, auth_middleware_1.requireRole)(client_1.Role.ADMIN));
dashboardRouter.get('/stats', dashboard_controller_1.dashboardController.getStats);
dashboardRouter.get('/chart-data', dashboard_controller_1.dashboardController.getChartData);
exports.default = dashboardRouter;
