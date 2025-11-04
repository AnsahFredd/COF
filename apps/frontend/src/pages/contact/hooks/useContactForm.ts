import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { ContactFormData } from 'src/validators/schemas/contactSchema';
import { sendContactMessage } from '../helpers/contact';

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: ContactFormData) => {
    try {
      setIsSubmitting(true);
      await sendContactMessage(values);

      showNotification({
        title: 'Message Sent',
        message: "Thanks for reaching out! We'll get back to you soon.",
        color: 'green',
      });
    } catch (error) {
      showNotification({
        title: 'Submission Failed',
        message: 'There was an issue sending your message. Try again later.',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};
