"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerEventController = void 0;
const customerEvent_service_1 = require("../services/customerEvent.service");
exports.customerEventController = {
    create: async (req, res, next) => {
        try {
            const result = await customerEvent_service_1.customerEventService.createCustomerEvent(req.body);
            return res.status(201).json({
                success: true,
                message: 'Customer event created successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const userId = typeof req.query.userId === 'string' ? req.query.userId : undefined;
            const result = await customerEvent_service_1.customerEventService.getAllCustomerEvents(userId);
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
            const result = await customerEvent_service_1.customerEventService.getCustomerEventById(id);
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
            const result = await customerEvent_service_1.customerEventService.updateCustomerEvent(id, req.body);
            return res.status(200).json({
                success: true,
                message: 'Customer event updated successfully',
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
            const result = await customerEvent_service_1.customerEventService.deleteCustomerEvent(id);
            return res.status(200).json({
                success: true,
                message: 'Customer event deleted successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
};
