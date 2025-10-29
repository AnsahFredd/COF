"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCategory = exports.UserRole = exports.PaymentStatus = exports.BookingStatus = exports.EventStatus = exports.EventType = void 0;
// Event Types
var EventType;
(function (EventType) {
    EventType["WEDDING"] = "wedding";
    EventType["ENGAGEMENT"] = "engagement";
    EventType["BIRTHDAY"] = "birthday";
    EventType["CORPORATE"] = "corporate";
    EventType["CONFERENCE"] = "conference";
    EventType["PARTY"] = "party";
    EventType["OTHER"] = "other";
})(EventType || (exports.EventType = EventType = {}));
var EventStatus;
(function (EventStatus) {
    EventStatus["DRAFT"] = "draft";
    EventStatus["PUBLISHED"] = "published";
    EventStatus["CANCELLED"] = "cancelled";
    EventStatus["COMPLETED"] = "completed";
})(EventStatus || (exports.EventStatus = EventStatus = {}));
// Booking Types
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["CANCELLED"] = "cancelled";
    BookingStatus["COMPLETED"] = "completed";
    BookingStatus["REFUNDED"] = "refunded";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PAID"] = "paid";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["REFUNDED"] = "refunded";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
// User Types
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["VENDOR"] = "vendor";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
// Vendor Types
var VendorCategory;
(function (VendorCategory) {
    VendorCategory["CATERING"] = "catering";
    VendorCategory["PHOTOGRAPHY"] = "photography";
    VendorCategory["DECORATION"] = "decoration";
    VendorCategory["MUSIC"] = "music";
    VendorCategory["VENUE"] = "venue";
    VendorCategory["PLANNING"] = "planning";
    VendorCategory["OTHER"] = "other";
})(VendorCategory || (exports.VendorCategory = VendorCategory = {}));
