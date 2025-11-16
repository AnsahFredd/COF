/**
 * A wrapper around Mantine's useMediaQuery hook to maintain
 * consistent responsive breakpoints across the project
 *
 * const isMobile = useMediaQuery("mobile")
 * const isTablet = useMediaQuery("tablet")
 */

import { useMediaQuery as responsiveMediaQuery } from '@mantine/hooks';

const BREAKPOINTS = {
  mobile: '(max-width: 768px)',
  tablet: '(max-width: 1024px)',
  desktop: '(min-width: 1025px)',
};

export const useMediaQuery = (key: keyof typeof BREAKPOINTS): boolean => {
  return !!responsiveMediaQuery(BREAKPOINTS[key]);
};
