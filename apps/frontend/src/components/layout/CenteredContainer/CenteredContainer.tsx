import React from 'react';
import styles from './CenteredContainer.module.css';

interface CenteredContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CenteredContainer - A reusable component for centering content vertically and horizontally
 * Replaces the old pattern of using <Center style={{ minHeight: '100vh' }}>
 *
 * @example
 * <CenteredContainer>
 *   <YourContent />
 * </CenteredContainer>
 */
export const CenteredContainer: React.FC<CenteredContainerProps> = ({ children, className }) => {
  return <div className={`${styles.container} ${className || ''}`}>{children}</div>;
};
