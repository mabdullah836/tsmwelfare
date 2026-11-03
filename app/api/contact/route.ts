import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  contactAdminText,
  contactAdminHtml,
  contactAutoReplyText,
  contactAutoReplyHtml,
} from '@/lib/emailTemplates/contact';
import { rateLimit } from '@/lib/rate-limit';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const asText = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
// Strip characters that could break out of a quoted display name or header line.
const headerSafe = (value: string) => value.replace(/[\r\n"<>]/g, ' ').trim();

export async function POST(request: Request) {
  try {
    const limited = rateLimit(request, 'contact', { limit: 5, windowMs: 10 * 60 * 1000 });
    if (limited) return limited;

    const body = await request.json().catch(() => null);
    const name = asText(body?.name, 200);
    const email = asText(body?.email, 320);
    const subject = asText(body?.subject, 300);
    const message = asText(body?.message, 10000);
    if (!name || !subject || !message || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid name, email, subject and message." },
        { status: 400 }
      );
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"${headerSafe(name)}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${headerSafe(subject)}`,
      text: contactAdminText({ name, email, subject, message }),
      html: contactAdminHtml({ name, email, subject, message }),
    });

    // Send an auto-reply to the user
    await transporter.sendMail({
      from: `"Sirat-e-Mustaqeem Welfare Trust" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for contacting us",
      text: contactAutoReplyText({ name, subject, message }),
      html: contactAutoReplyHtml({ name, subject, message }),
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
} 