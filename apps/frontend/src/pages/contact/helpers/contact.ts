import { ContactFormData } from 'src/validators/schemas/contactSchema';
import { api } from 'src/services/api/api';

/**
 * Send contact form submission to backend API
 * @example await sendContactMessage(formValues)
 */

export const sendContactMessage = async (data: ContactFormData) => {
  // Map frontend data to backend format
  const payload = {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    eventType: data.eventType.toUpperCase(), // Convert to enum format
    eventDate: data.eventDate?.toISOString() || new Date().toISOString(),
    eventLocation: data.eventLocation,
    message: data.message || '',
    budget: data.budget,
    guestCount: data.guestCount,
    preferredContactMethod: data.preferredContactMethod.toUpperCase(), // Convert to enum format
  };

  const response = await api.post<{ success: boolean; data: unknown }>('/customer-events', payload);
  return response.data;
};
