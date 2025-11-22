import nodemailer from 'nodemailer';
import { config } from '../config';

/**
 * Email transporter configuration using nodemailer
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    secure: config.emailPort === 465, // true for 465, false for other ports
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });
};

/**
 * Send a generic email
 */
export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<void> => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: config.emailFrom,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
};

/**
 * Send welcome email to new users
 */
export const sendWelcomeEmail = async (to: string, name: string): Promise<void> => {
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

  await sendEmail({ to, subject, html, text });
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (to: string, resetToken: string): Promise<void> => {
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

  await sendEmail({ to, subject, html, text });
};

/**
 * Send booking confirmation email
 */
export const sendBookingConfirmationEmail = async (
  to: string,
  bookingDetails: {
    name: string;
    eventDate: string;
    eventType: string;
    bookingId: string;
  }
): Promise<void> => {
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

  await sendEmail({ to, subject, html, text });
};

/**
 * Send notification email
 */
export const sendNotificationEmail = async (
  to: string,
  title: string,
  message: string
): Promise<void> => {
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

  await sendEmail({ to, subject, html, text });
};
