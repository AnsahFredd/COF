import TestimonialSection from 'src/features/testimonials/Testimonilas';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import VideoShowcase from './components/VideoShowcase';
import { EventCTASection } from './components/EventCTASection';
import styles from './home.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <HeroSection />
      <ServicesSection />
      <VideoShowcase />
      <TestimonialSection displayCount={3} autoPlay={true} autoPlayInterval={5000} />
      <EventCTASection />
    </div>
  );
};

export default HomePage;
