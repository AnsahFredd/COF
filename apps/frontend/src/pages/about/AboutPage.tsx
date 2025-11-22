import { Box } from '@mantine/core';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import { EventCTASection } from '../Home/components/EventCTASection';
import TestimonialSection from 'src/features/testimonials/Testimonilas';

const AboutPage = () => {
  return (
    <Box>
      <AboutHero />
      <OurStory />
      <TestimonialSection displayCount={6} autoPlay={true} autoPlayInterval={5000} />
      <EventCTASection />
    </Box>
  );
};

export default AboutPage;
