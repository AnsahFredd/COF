// import TestimonialSection from "src/features/testimonials/Testimonilas";
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import VideoShowcase from './components/VideoShowcase';
import { EventCTASection } from './components/EventCTASection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <VideoShowcase />
      {/* <TestimonialSection /> */}
      <EventCTASection />
    </div>
  );
};

export default HomePage;
