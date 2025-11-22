'use client';
import ServicesHero from './components/ServiceHero';
import ServicesGrid from './components/ServicesGrid';
import styles from './services.module.css';

export default function Services() {
  return (
    <div className={styles.pageWrapper}>
      <ServicesHero />
      <ServicesGrid />
    </div>
  );
}
