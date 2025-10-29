import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

// A wrapper around react-router-dom's Link to be used with Mantine or other UI libraries

export const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
));

RouterLink.displayName = 'RouterLink';
