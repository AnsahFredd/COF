import { Box, Container, Title, Text, Image } from '@mantine/core';
import classes from './About.module.css';
import ceo_image from 'src/assets/images/cofuel.jpg';

const OurStory = () => {
  return (
    <Box className={classes.storySection}>
      <Container size="xl">
        <Box className={classes.storyGrid}>
          {/* Content Section */}
          <Box className={classes.storyContent}>
            <Title order={2} className={classes.sectionTitle} style={{ textAlign: 'left' }}>
              Our Story
            </Title>
            <Text
              className={classes.sectionSubtitle}
              style={{
                textAlign: 'left',
                margin: '0 0 2rem 0',
              }}
            >
              From humble beginnings to creating extraordinary experiences.
            </Text>
            <Text c="dimmed" mb="lg" lh={1.8}>
              Cofuel Home of Events began as a simple passion, a young dreamer with a love for
              beauty and creativity. What started with decorating my primary school classroom for
              "Our day" with paper craft then to decorating the basic school assembly hall for
              'carols day celebration' with fabrics quickly grew into something greater: a company
              committed to excellence, culture, and lasting memories. With limited resources but an
              unlimited vision, we stepped out in faith turning ideas into real experiences and
              transforming empty spaces into vibrant, joyful atmospheres. Every service we offer
              from planning to décor, makeup to catering is inspired by the desire to make people
              special and valued. More than just a business, Cofuel is a purpose-driven brand with
              you in mind.
            </Text>
          </Box>

          {/* Image Section with Enhanced Styling */}
          <Box className={classes.storyImageWrapper}>
            <Box className={classes.imageContainer}>
              <Image src={ceo_image} alt="Cofuel CEO - Our Story" className={classes.storyImage} />

              {/* Gradient Overlay */}
              <Box className={classes.imageOverlay} />

              {/* Caption */}
              <Box className={classes.imageCaption}>Founder & Creative Director</Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default OurStory;
