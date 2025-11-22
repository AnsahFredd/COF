import React from 'react';
import styles from './ResponsiveSection.module.css';

interface ResponsiveSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'compact' | 'spacious';
}

/**
 * ResponsiveSection - A reusable component for consistent section spacing
 * Automatically adjusts padding based on screen size
 *
 * @param variant - Controls the amount of spacing
 *   - 'default': Standard spacing (64px → 48px → 32px)
 *   - 'compact': Less spacing (48px → 32px → 24px)
 *   - 'spacious': More spacing (96px → 64px → 48px)
 *
 * @example
 * <ResponsiveSection variant="default">
 *   <YourContent />
 * </ResponsiveSection>
 */
export const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({
  children,
  className,
  variant = 'default',
}) => {
  return (
    <section className={`${styles.section} ${styles[variant]} ${className || ''}`}>
      {children}
    </section>
  );
};
