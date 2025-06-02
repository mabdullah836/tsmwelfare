import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send an auto-reply to the user
    await transporter.sendMail({
      from: `"Sirat-e-Mustaqeem Welfare Trust" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for contacting us",
      text: `
Dear ${name},

Thank you for contacting Sirat-e-Mustaqeem Welfare Trust. We have received your message and will get back to you as soon as possible.

Your message details:
Subject: ${subject}
Message: ${message}

Best regards,
Sirat-e-Mustaqeem Welfare Trust Team
      `,
      html: `
        <h2>Thank you for contacting us</h2>
        <p>Dear ${name},</p>
        <p>Thank you for contacting Sirat-e-Mustaqeem Welfare Trust. We have received your message and will get back to you as soon as possible.</p>
        <h3>Your message details:</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p>Best regards,<br>Sirat-e-Mustaqeem Welfare Trust Team</p>
      `,
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