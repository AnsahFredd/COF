import { Modal, Title } from '@mantine/core';
import { ContactForm } from 'src/pages/contact/components/ContactForm';

interface QuoteModalProps {
  opened: boolean;
  onClose: () => void;
}

export const QuoteModal = ({ opened, onClose }: QuoteModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>Request a Quote</Title>}
      size="lg"
      padding="xl"
    >
      <ContactForm onSuccess={onClose} />
    </Modal>
  );
};
