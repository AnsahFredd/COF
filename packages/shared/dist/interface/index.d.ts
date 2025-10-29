export declare enum EventType {
    WEDDING = "wedding",
    ENGAGEMENT = "engagement",
    BIRTHDAY = "birthday",
    CORPORATE = "corporate",
    CONFERENCE = "conference",
    PARTY = "party",
    OTHER = "other"
}
export declare enum EventStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}
export interface Event {
    id: string;
    title: string;
    description: string;
    type: EventType;
    status: EventStatus;
    date: Date;
    startTime: string;
    endTime: string;
    location: string;
    venueId?: string;
    capacity: number;
    availableSeats: number;
    price: number;
    images: string[];
    organizerId: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed",
    REFUNDED = "refunded"
}
export declare enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed",
    REFUNDED = "refunded"
}
export interface Booking {
    id: string;
    eventId: string;
    userId: string;
    numberOfGuests: number;
    totalAmount: number;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    paymentId?: string;
    specialRequests?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum UserRole {
    USER = "user",
    VENDOR = "vendor",
    ADMIN = "admin"
}
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: UserRole;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum VendorCategory {
    CATERING = "catering",
    PHOTOGRAPHY = "photography",
    DECORATION = "decoration",
    MUSIC = "music",
    VENUE = "venue",
    PLANNING = "planning",
    OTHER = "other"
}
export interface Vendor {
    id: string;
    userId: string;
    businessName: string;
    category: VendorCategory;
    description: string;
    services: string[];
    pricing: {
        min: number;
        max: number;
    };
    portfolio: string[];
    rating: number;
    totalReviews: number;
    location: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Venue {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    country: string;
    capacity: number;
    amenities: string[];
    images: string[];
    pricePerHour: number;
    rating: number;
    totalReviews: number;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
