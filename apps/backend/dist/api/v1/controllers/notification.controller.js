"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = void 0;
const notification_service_1 = require("../services/notification.service");
exports.notificationController = {
    create: async (req, res, next) => {
        try {
            const result = await notification_service_1.notificationService.createNotification(req.body);
            return res.status(201).json({
                success: true,
                message: 'Notification created successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const result = await notification_service_1.notificationService.getAllNotifications();
            return res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await notification_service_1.notificationService.getNotificationById(id);
            return res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await notification_service_1.notificationService.updateNotification(id, req.body);
            return res.status(200).json({
                success: true,
                message: 'Notification updated successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await notification_service_1.notificationService.deleteNotification(id);
            return res.status(200).json({
                success: true,
                message: 'Notification deleted successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
};
