import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  contactAdminText,
  contactAdminHtml,
  contactAutoReplyText,
  contactAutoReplyHtml,
} from '@/lib/emailTemplates/contact';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

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
    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
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