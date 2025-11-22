import { Container, Button, Paper, Text, Group, Stack, Title, SimpleGrid } from '@mantine/core';
import { IconCalendar, IconMail } from '@tabler/icons-react';
import styles from './EventCTA.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/constants/routes';
import { useState } from 'react';
import { QuoteModal } from './QuoteModal';

export const EventCTASection = () => {
  const navigate = useNavigate();
  const [quoteModalOpened, setQuoteModalOpened] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Container size="xl">
        {/* Header Section */}
        <div className={styles.headerSection}>
          <Title order={1} className={styles.mainTitle}>
            What Drives Us
          </Title>
          <Text className={styles.mainSubtitle}>
            We're more than event planners—we're dream makers committed to excellence, creativity,
            and creating moments that last a lifetime.
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" className={styles.contentGrid}>
          <Paper className={styles.contentCard} radius="lg">
            <div className={styles.cardHeader}>
              <div className={styles.cardNumber}>01</div>
              <Title order={2} className={styles.cardTitle}>
                Our Mission
              </Title>
            </div>
            <Text className={styles.cardText}>
              To create extraordinary events that exceed expectations and leave lasting impressions.
              We're dedicated to transforming your vision into reality through meticulous planning,
              creative innovation, and unwavering attention to detail.
            </Text>
          </Paper>

          <Paper className={styles.contentCard} radius="lg">
            <div className={styles.cardHeader}>
              <div className={styles.cardNumber}>02</div>
              <Title order={2} className={styles.cardTitle}>
                Our Vision
              </Title>
            </div>
            <Text className={styles.cardText}>
              To be recognized as the premier event planning company that sets the standard for
              creativity, excellence, and client satisfaction. We envision a world where every
              celebration is a work of art.
            </Text>
          </Paper>

          <Paper className={styles.contentCard} radius="lg">
            <div className={styles.cardHeader}>
              <div className={styles.cardNumber}>03</div>
              <Title order={2} className={styles.cardTitle}>
                Core Values
              </Title>
            </div>
            <Stack gap="md" className={styles.valuesList}>
              <div className={styles.valueItem}>
                <div className={styles.valueDot} />
                <Text className={styles.valueText}>Passion & Excellence</Text>
              </div>
              <div className={styles.valueItem}>
                <div className={styles.valueDot} />
                <Text className={styles.valueText}>Client-Focused Approach</Text>
              </div>
              <div className={styles.valueItem}>
                <div className={styles.valueDot} />
                <Text className={styles.valueText}>Creativity & Innovation</Text>
              </div>
              <div className={styles.valueItem}>
                <div className={styles.valueDot} />
                <Text className={styles.valueText}>Integrity & Trust</Text>
              </div>
            </Stack>
          </Paper>
        </SimpleGrid>

        <Paper className={styles.bottomCta} radius="lg">
          <Stack align="center" gap="lg">
            <Title order={2} className={styles.bottomTitle}>
              Ready to Start Planning?
            </Title>
            <Text className={styles.bottomSubtitle}>
              Join hundreds of satisfied clients who trusted us with their special moments. Let's
              create something amazing together!
            </Text>
            <Group gap="md" className={styles.buttonGroup}>
              <Button
                size="lg"
                radius="md"
                className={styles.primaryButton}
                onClick={() => navigate(ROUTES.CONTACT)}
                leftSection={<IconCalendar size={20} />}
              >
                Book Your Event
              </Button>
              <Button
                size="lg"
                radius="md"
                variant="outline"
                className={styles.secondaryButton}
                onClick={() => setQuoteModalOpened(true)}
                leftSection={<IconMail size={20} />}
              >
                Get a Quote
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>

      <QuoteModal opened={quoteModalOpened} onClose={() => setQuoteModalOpened(false)} />
    </div>
  );
};
