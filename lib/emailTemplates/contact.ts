// User-supplied values are escaped before being placed into HTML email bodies.
function escapeHtml(value: string) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function contactAdminText({ name, email, subject, message }: { name: string, email: string, subject: string, message: string }) {
  return `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
  `;
}

export function contactAdminHtml({ name, email, subject, message }: { name: string, email: string, subject: string, message: string }) {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;
}

export function contactAutoReplyText({ name, subject, message }: { name: string, subject: string, message: string }) {
  return `
Dear ${name},

Thank you for contacting Sirat-e-Mustaqeem Welfare Trust. We have received your message and will get back to you as soon as possible.

Your message details:
Subject: ${subject}
Message: ${message}

Best regards,
Sirat-e-Mustaqeem Welfare Trust Team
  `;
}

export function contactAutoReplyHtml({ name, subject, message }: { name: string, subject: string, message: string }) {
  return `
    <h2>Thank you for contacting us</h2>
    <p>Dear ${escapeHtml(name)},</p>
    <p>Thank you for contacting Sirat-e-Mustaqeem Welfare Trust. We have received your message and will get back to you as soon as possible.</p>
    <h3>Your message details:</h3>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    <p>Best regards,<br>Sirat-e-Mustaqeem Welfare Trust Team</p>
  `;
} 