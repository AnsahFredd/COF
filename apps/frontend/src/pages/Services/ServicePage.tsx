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
// Problems loading reference 'https://www.schemastore.org/package.json': Unable to load schema from 'https://www.schemastore.org/package.json': getaddrinfo ENOTFOUND www.schemastore.org.(768)
