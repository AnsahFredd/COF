import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Group, Textarea, Button, Stack } from '@mantine/core';
import { contactSchema, ContactFormData } from 'src/validators/schemas/contactSchema';
import { useContactForm } from '../hooks/useContactForm';
import { zodResolver } from 'mantine-form-zod-resolver';

export const ContactForm: React.FC = () => {
  const { handleSubmit, isSubmitting } = useContactForm();

  const form = useForm<ContactFormData>({
    validate: zodResolver(contactSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  // Helper to check if the form is valid and filled
  const isFormFilled =
    !!form.values.firstName &&
    !!form.values.lastName &&
    !!form.values.email &&
    !!form.values.subject &&
    !!form.values.message &&
    Object.keys(form.errors).length === 0;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Group grow>
          <TextInput label="First Name" placeholder="Ansah" {...form.getInputProps('firstName')} />
          <TextInput
            label="Last Name"
            placeholder="Frederick"
            {...form.getInputProps('lastName')}
          />
        </Group>

        <TextInput label="Email" placeholder="example@gmail.com" {...form.getInputProps('email')} />

        <TextInput
          label="Phone (optional)"
          placeholder="e.g. 0599 288 539"
          {...form.getInputProps('phone')}
        />

        <TextInput
          label="Subject"
          placeholder="Inquiry about services"
          {...form.getInputProps('subject')}
        />

        <Textarea
          label="Message"
          placeholder="Write your message here..."
          autosize
          minRows={4}
          {...form.getInputProps('message')}
        />

        <Group justify="center" mt="md">
          <Button type="submit" loading={isSubmitting} color="gold.6" disabled={!isFormFilled}>
            Send Message
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
