export interface Testimonial {
  name: string;
  message: string;
  role?: string;
}

export interface NavigationArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export interface IndicatorDotsProps {
  total: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}
