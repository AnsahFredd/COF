'use client';
import ServicesHero from './components/ServiceHero';
import ServicesGrid from './components/ServicesGrid';

export default function Services() {
  return (
    <div className="w-full bg-background">
      <ServicesHero />
      <ServicesGrid />
    </div>
  );
}
