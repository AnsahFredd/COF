import { customerEventRepository } from '../repositories/customerEvent.repository';
import { Prisma } from '@prisma/client';

export const customerEventService = {
  createCustomerEvent: async (data: Prisma.CustomerEventCreateInput) => {
    const result = await customerEventRepository.create(data);
    return result;
  },

  getAllCustomerEvents: async (userId?: string) => {
    const result = await customerEventRepository.findAll(userId);
    return result;
  },

  getCustomerEventById: async (id: string) => {
    const result = await customerEventRepository.findById(id);
    if (!result) throw new Error('Customer event Not Found!');
    return result;
  },

  updateCustomerEvent: async (id: string, data: Prisma.CustomerEventUpdateInput) => {
    const event = await customerEventRepository.findById(id);
    if (!event) throw new Error('Customer event Not Found!');
    const updateEvent = await customerEventRepository.update(id, data);
    return updateEvent;
  },

  deleteCustomerEvent: async (id: string) => {
    const event = await customerEventRepository.findById(id);
    if (!event) throw new Error('Customer event not found');
    const deleteEvent = await customerEventRepository.delete(id);
    return deleteEvent;
  },
};
