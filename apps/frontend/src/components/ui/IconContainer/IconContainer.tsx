import React from 'react';
import styles from './IconContainer.module.css';

interface IconContainerProps {
  children: React.ReactNode;
  variant: 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * IconContainer - A reusable component for displaying icons in circular containers
 * Used for success/error states in auth pages and notifications
 *
 * @param variant - The type of icon container (success, error, warning, info)
 * @param size - The size of the container (sm: 60px, md: 80px, lg: 100px)
 *
 * @example
 * <IconContainer variant="success" size="md">
 *   <IconCheck size={40} />
 * </IconContainer>
 */
export const IconContainer: React.FC<IconContainerProps> = ({
  children,
  variant,
  size = 'md',
  className,
}) => {
  return (
    <div className={`${styles.container} ${styles[variant]} ${styles[size]} ${className || ''}`}>
      {children}
    </div>
  );
};
