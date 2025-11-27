import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Container, SimpleGrid, Text, Stack, Anchor, Group, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/constants/routes';
import classes from './footer.module.css';

export default function Footer() {
  return (
    <Box component="footer" className={classes.footer}>
      <Container size="xl" className={classes.innerContainer}>
        {/* Main Grid - 3 columns on desktop, stacks on mobile */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" className={classes.topGrid}>
          {/* Tagline Section */}
          <Box>
            <Group gap={10} align="center" wrap="nowrap">
              <Box className={classes.decorativeBar} />
              <Text className={classes.tagline}>
                Serving You to Your
                <br />
                <span className={classes.highlight}>Satisfaction</span>
              </Text>
            </Group>
          </Box>

          {/* Contact Section */}
          <Box>
            <Text className={classes.sectionTitle}>Contact & Inquiry</Text>
            <Stack gap={12} my={8}>
              <Box>
                <Text size="sm" className={classes.label}>
                  Email
                </Text>
                <Anchor href="mailto:coffiesamuel887@gmail.com" className={classes.link}>
                  coffiesamuel887@gmail.com
                </Anchor>
              </Box>
              <Box>
                <Text size="sm" className={classes.label}>
                  Phone
                </Text>
                <Anchor href="tel:+233531593780" className={classes.link}>
                  +233 531 593 780
                </Anchor>
              </Box>
              <Box>
                <Text size="sm" className={classes.label}>
                  Location
                </Text>
                <Text className={classes.text}>Accra, Ghana</Text>
              </Box>
            </Stack>
          </Box>

          {/* Social Media Section */}
          <Box>
            <Text className={classes.sectionTitle}>Follow Us</Text>
            <Group gap={12} my={19}>
              <Anchor href="#" className={classes.socialLink} aria-label="Instagram">
                <FaInstagram size={18} />
              </Anchor>
              <Anchor href="#" className={classes.socialLink} aria-label="TikTok">
                <SiTiktok size={18} />
              </Anchor>
              <Anchor href="#" className={classes.socialLink} aria-label="Facebook">
                <FaFacebookF size={16} />
              </Anchor>
              <Anchor href="#" className={classes.socialLink} aria-label="Twitter">
                <FaTwitter size={18} />
              </Anchor>
            </Group>
          </Box>
        </SimpleGrid>

        {/* Bottom Section */}
        <Box className={classes.bottomSection}>
          <Text className={classes.copyright}>© 2025 CofuelEvents</Text>
          <Group gap={24} className={classes.legalLinks}>
            <Link to={ROUTES.TERMS} className={classes.link}>
              Terms & Conditions
            </Link>
            <Link to={ROUTES.PRIVACY} className={classes.link}>
              Privacy Policy
            </Link>
          </Group>
          <Text className={classes.reserved}>All rights reserved.</Text>
        </Box>
      </Container>

      <Box className={classes.gradientOverlay}></Box>
    </Box>
  );
}
