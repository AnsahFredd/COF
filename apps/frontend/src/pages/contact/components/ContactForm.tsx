import React, { useMemo, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Group,
  Textarea,
  Button,
  Stack,
  Select,
  NumberInput,
  Checkbox,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { contactSchema, ContactFormData } from 'src/validators/schemas/contactSchema';
import { useContactForm } from '../hooks/useContactForm';
import { zodResolver } from 'mantine-form-zod-resolver';

import { CONTACT_METHODS, EVENT_TYPES } from '../constants/contactFormData';
import classes from '../Contact.module.css';

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const { handleSubmit, isSubmitting } = useContactForm();
  const [consentChecked, setConsentChecked] = useState(false);

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
      guestCount: 0,
      preferredContactMethod: '',
    },
  });

  // ... (validation logic remains same)

  const isFormValid = useMemo(() => {
    const requiredFieldsFilled =
      !!form.values.fullName &&
      !!form.values.email &&
      !!form.values.phone &&
      !!form.values.eventType &&
      !!form.values.eventDate &&
      !!form.values.eventLocation &&
      !!form.values.budget &&
      form.values.guestCount > 0 &&
      !!form.values.preferredContactMethod &&
      consentChecked;

    if (!requiredFieldsFilled) {
      return false;
    }

    const validationResult = contactSchema.safeParse(form.values);
    return validationResult.success;
  }, [form.values, consentChecked]);

  const onSubmit = form.onSubmit(async (values) => {
    const wasSent = await handleSubmit(values);
    if (wasSent) {
      form.reset();
      setConsentChecked(false);
      onSuccess?.();
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

        <Group grow className={`${classes.formGroup} ${classes.eventInfoGroup}`}>
          <NumberInput
            className={classes.fullWidthInput}
            label="Guest Count"
            placeholder="Expected number of guests"
            withAsterisk
            min={1}
            max={10000}
            {...form.getInputProps('guestCount')}
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

        {/* Consent Checkbox */}
        <Checkbox
          checked={consentChecked}
          onChange={(event) => setConsentChecked(event.currentTarget.checked)}
          label="I consent to be contacted via email, text message, or phone call regarding my inquiry"
          color="gold.6"
          styles={{
            label: {
              fontSize: '0.95rem',
              color: '#555',
              cursor: 'pointer',
            },
          }}
          mt="md"
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
