export type ID = string | number;

export type status = 'idle' | 'loading' | 'succeeded' | 'failed';

export type Timestamp = string | Date;

// Pagination

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

//
// Location & Address

export interface Location {
  lat: number;
  lng: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Media & Files

export interface MediaFile {
  id: ID;
  url: string;
  type: 'image' | 'video' | 'document';
  name: string;
  size?: number;
  thumbnail?: string;
}

export interface Image {
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

// Contact Information

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  socialMedia?: SocialMedia;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

// Time Slots

export interface TimeSlot {
  id: ID;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price?: number;
}

// Rating & Reviews

export interface Rating {
  average: number;
  count: number;
  breakdown?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

// Price Information

export interface Price {
  amount: number;
  currency: string;
  formatted?: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

// Generic API Response

export interface BasicApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// Filter & Search

export interface FilterOption {
  label: string;
  value: string | number;
  count?: number;
}

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

// User Basic Info (used across features)

export interface UserBasicInfo {
  id: ID;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

// Availability

export interface Availability {
  date: string;
  isAvailable: boolean;
  slots?: TimeSlot[];
  reason?: string;
}

// Utility Types
export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
