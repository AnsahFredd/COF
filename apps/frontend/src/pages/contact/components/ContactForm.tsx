import React, { useMemo } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Group, Textarea, Button, Stack, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { contactSchema, ContactFormData } from 'src/validators/schemas/contactSchema';
import { useContactForm } from '../hooks/useContactForm';
import { zodResolver } from 'mantine-form-zod-resolver';

import { CONTACT_METHODS, EVENT_TYPES } from '../constants/contactFormData';
import classes from '../Contact.module.css';

export const ContactForm: React.FC = () => {
  const { handleSubmit, isSubmitting } = useContactForm();

  const form = useForm<ContactFormData>({
    validate: zodResolver(contactSchema),
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: null,
      eventLocation: '',
      message: '',
      budget: '',
      preferredContactMethod: '',
    },
  });

  const isFormValid = useMemo(() => {
    const requiredFieldsFilled =
      !!form.values.fullName &&
      !!form.values.email &&
      !!form.values.phone &&
      !!form.values.eventType &&
      !!form.values.eventDate &&
      !!form.values.eventLocation &&
      !!form.values.budget &&
      !!form.values.preferredContactMethod;

    if (!requiredFieldsFilled) {
      return false;
    }

    const validationResult = contactSchema.safeParse(form.values);
    return validationResult.success;
  }, [form.values]);

  const onSubmit = form.onSubmit(async (values) => {
    const wasSent = await handleSubmit(values);
    if (wasSent) {
      form.reset();
    }
  });

  return (
    <form onSubmit={onSubmit} className={classes.formContainer}>
      <Stack gap="lg">
        {/* Personal Information */}
        <Group grow className={`${classes.formGroup} ${classes.personalInfoGroup}`}>
          <TextInput
            className={classes.fullWidthInput}
            label="Full Name"
            placeholder="Enter your full name"
            withAsterisk
            {...form.getInputProps('fullName')}
          />
          <TextInput
            className={classes.fullWidthInput}
            label="Email"
            type="email"
            placeholder="example@email.com"
            withAsterisk
            {...form.getInputProps('email')}
          />
        </Group>

        <Group grow className={`${classes.formGroup} ${classes.personalInfoGroup}`}>
          <TextInput
            className={classes.fullWidthInput}
            label="Phone Number"
            placeholder="Enter phone number"
            withAsterisk
            {...form.getInputProps('phone')}
          />
          <Select
            className={classes.fullWidthInput}
            label="Preferred Contact Method"
            placeholder="Select contact method"
            withAsterisk
            data={CONTACT_METHODS}
            {...form.getInputProps('preferredContactMethod')}
          />
        </Group>

        {/* Event Information */}
        <Group grow className={`${classes.formGroup} ${classes.eventInfoGroup}`}>
          <Select
            className={classes.fullWidthInput}
            label="Event Type"
            placeholder="Select an event type"
            withAsterisk
            data={EVENT_TYPES}
            {...form.getInputProps('eventType')}
          />
          <DateInput
            className={classes.fullWidthInput}
            label="Event Date"
            placeholder="dd/mm/yyyy"
            valueFormat="DD/MM/YYYY"
            withAsterisk
            minDate={new Date()}
            {...form.getInputProps('eventDate')}
          />
        </Group>

        <Group grow className={`${classes.formGroup} ${classes.eventInfoGroup}`}>
          <TextInput
            className={classes.fullWidthInput}
            label="Event Location"
            placeholder="eg: Accra, Ghana"
            withAsterisk
            {...form.getInputProps('eventLocation')}
          />
          <TextInput
            className={classes.fullWidthInput}
            label="Budget"
            placeholder="Enter your budget"
            withAsterisk
            {...form.getInputProps('budget')}
          />
        </Group>

        {/* Message */}
        <Textarea
          className={classes.fullWidthInput}
          label="Message"
          placeholder="Tell us more about your event..."
          autosize
          minRows={4}
          maxRows={8}
          {...form.getInputProps('message')}
        />

        <Group justify="center" mt="md">
          <Button
            type="submit"
            loading={isSubmitting}
            size="md"
            color="gold.6"
            disabled={!isFormValid || isSubmitting}
          >
            Send Message
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
