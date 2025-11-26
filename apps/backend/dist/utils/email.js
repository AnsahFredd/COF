"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationEmail = exports.sendBookingConfirmationEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
/**
 * Email transporter configuration using nodemailer
 */
const createTransporter = () => {
    return nodemailer_1.default.createTransport({
        host: config_1.config.emailHost,
        port: config_1.config.emailPort,
        secure: config_1.config.emailPort === 465, // true for 465, false for other ports
        auth: {
            user: config_1.config.emailUser,
            pass: config_1.config.emailPassword,
        },
    });
};
/**
 * Send a generic email
 */
const sendEmail = async (options) => {
    const transporter = createTransporter();
    await transporter.sendMail({
        from: config_1.config.emailFrom,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
    });
};
exports.sendEmail = sendEmail;
/**
 * Send welcome email to new users
 */
const sendWelcomeEmail = async (to, name) => {
    const subject = 'Welcome to COF Events!';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Welcome to COF Events, ${name}!</h1>
      <p style="color: #666; font-size: 16px;">
        Thank you for joining us. We're excited to have you on board!
      </p>
      <p style="color: #666; font-size: 16px;">
        You can now start exploring our event planning services and book your next event with ease.
      </p>
      <p style="color: #666; font-size: 14px; margin-top: 30px;">
        Best regards,<br/>
        The COF Events Team
      </p>
    </div>
  `;
    const text = `Welcome to COF Events, ${name}! Thank you for joining us.`;
    await (0, exports.sendEmail)({ to, subject, html, text });
};
exports.sendWelcomeEmail = sendWelcomeEmail;
/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (to, resetToken) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const subject = 'Password Reset Request';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Password Reset Request</h1>
      <p style="color: #666; font-size: 16px;">
        You requested a password reset. Click the button below to reset your password:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 30px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">
        If you didn't request this, please ignore this email.
      </p>
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        This link will expire in 1 hour.
      </p>
    </div>
  `;
    const text = `Password reset requested. Visit: ${resetUrl}`;
    await (0, exports.sendEmail)({ to, subject, html, text });
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
/**
 * Send booking confirmation email
 */
const sendBookingConfirmationEmail = async (to, bookingDetails) => {
    const subject = 'Booking Confirmation - COF Events';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Booking Confirmed!</h1>
      <p style="color: #666; font-size: 16px;">
        Hi ${bookingDetails.name},
      </p>
      <p style="color: #666; font-size: 16px;">
        Your booking has been confirmed. Here are the details:
      </p>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${bookingDetails.bookingId}</p>
        <p style="margin: 5px 0;"><strong>Event Type:</strong> ${bookingDetails.eventType}</p>
        <p style="margin: 5px 0;"><strong>Event Date:</strong> ${bookingDetails.eventDate}</p>
      </div>
      <p style="color: #666; font-size: 16px;">
        We look forward to making your event memorable!
      </p>
      <p style="color: #666; font-size: 14px; margin-top: 30px;">
        Best regards,<br/>
        The COF Events Team
      </p>
    </div>
  `;
    const text = `Booking confirmed! Booking ID: ${bookingDetails.bookingId}, Event: ${bookingDetails.eventType}, Date: ${bookingDetails.eventDate}`;
    await (0, exports.sendEmail)({ to, subject, html, text });
};
exports.sendBookingConfirmationEmail = sendBookingConfirmationEmail;
/**
 * Send notification email
 */
const sendNotificationEmail = async (to, title, message) => {
    const subject = `Notification: ${title}`;
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">${title}</h1>
      <p style="color: #666; font-size: 16px;">
        ${message}
      </p>
      <p style="color: #666; font-size: 14px; margin-top: 30px;">
        Best regards,<br/>
        The COF Events Team
      </p>
    </div>
  `;
    const text = `${title}: ${message}`;
    await (0, exports.sendEmail)({ to, subject, html, text });
};
exports.sendNotificationEmail = sendNotificationEmail;
