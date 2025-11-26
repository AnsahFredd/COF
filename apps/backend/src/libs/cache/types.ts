export interface ServicePackage {
  id: string;
  name: string;
  category: 'wedding' | 'naming-ceremony' | 'birthday' | 'corporate' | 'other';
  description: string;
  basePrice: number;
  features: string[];
}

export interface BookingRequest {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  venue?: string;
  guestCount?: number;
  packageId: string;
  budget: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  lastBookingDate?: string;
}

export interface AvailabilitySlot {
  date: string;
  isAvailable: boolean;
  bookingId?: string;
}

// Cache configuration (for internal use only)
export interface _CacheConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  keyPrefix?: string;
  connectTimeout?: number;
  maxRetriesPerRequest?: number;
}

// Result wrapper for all cache operations
export interface CacheResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Simple logger
export interface Logger {
  info: (message: string, meta?: Record<string, any>) => void;
  error: (message: string, meta?: Record<string, any>) => void;
  warn: (message: string, meta?: Record<string, any>) => void;
}
