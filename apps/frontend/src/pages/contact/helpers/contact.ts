import { ContactFormData } from 'src/validators/schemas/contactSchema';

/**
 * Simulated contact form submission (replace with actual API call).
 * @example await sendContactMessage(formValues)
 */

export const sendContactMessage = async (data: ContactFormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // TODO: Replace with real API call
  // e.g. await api.post("/api/contact", data);

  // eslint-disable-next-line no-console
  console.log('Contact message sent:', data);
  return data;
};
