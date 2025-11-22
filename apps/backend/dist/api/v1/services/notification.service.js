"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const notification_repository_1 = require("../repositories/notification.repository");
exports.notificationService = {
    createNotification: async (data) => {
        return await notification_repository_1.notificationRepository.create(data);
    },
    getAllNotifications: async (userId) => {
        return await notification_repository_1.notificationRepository.findAll(userId);
    },
    getNotificationById: async (id) => {
        const result = await notification_repository_1.notificationRepository.findById(id);
        if (!result)
            throw new Error('Notification Not Found!');
        return result;
    },
    updateNotification: async (id, data) => {
        const exists = await notification_repository_1.notificationRepository.findById(id);
        if (!exists)
            throw new Error('Notification Not Found!');
        return await notification_repository_1.notificationRepository.update(id, data);
    },
    deleteNotification: async (id) => {
        const exists = await notification_repository_1.notificationRepository.findById(id);
        if (!exists)
            throw new Error('Notification Not Found!');
        return await notification_repository_1.notificationRepository.delete(id);
    },
};
