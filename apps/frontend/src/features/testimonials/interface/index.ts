export interface Testimonial {
  name: string;
  message: string;
  role?: string;
  image: string;
}

export interface NavigationArrowProps {
  onNext: () => void;
  onPrev: () => void;
}

export interface IndicatorDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export interface StartRatingProps {
  rating: number;
  size: number;
  color?: string;
}

export interface TestimonialAvatarProps {
  image: string;
  name: string;
}

export interface TestimonialContentProps {
  testimonial: Testimonial;
  displayCount: number;
}

export interface SectionHeaderProps {
  title: string;
  subtitle: string;
  badge: string;
}
