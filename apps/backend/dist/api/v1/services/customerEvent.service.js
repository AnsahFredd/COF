"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerEventService = void 0;
const customerEvent_repository_1 = require("../repositories/customerEvent.repository");
exports.customerEventService = {
    createCustomerEvent: async (data) => {
        const result = await customerEvent_repository_1.customerEventRepository.create(data);
        return result;
    },
    getAllCustomerEvents: async (userId) => {
        const result = await customerEvent_repository_1.customerEventRepository.findAll(userId);
        return result;
    },
    getCustomerEventById: async (id) => {
        const result = await customerEvent_repository_1.customerEventRepository.findById(id);
        if (!result)
            throw new Error('Customer event Not Found!');
        return result;
    },
    updateCustomerEvent: async (id, data) => {
        const event = await customerEvent_repository_1.customerEventRepository.findById(id);
        if (!event)
            throw new Error('Customer event Not Found!');
        const updateEvent = await customerEvent_repository_1.customerEventRepository.update(id, data);
        return updateEvent;
    },
    deleteCustomerEvent: async (id) => {
        const event = await customerEvent_repository_1.customerEventRepository.findById(id);
        if (!event)
            throw new Error('Customer event not found');
        const deleteEvent = await customerEvent_repository_1.customerEventRepository.delete(id);
        return deleteEvent;
    },
};
