// import { sendEmail } from "@/utils/email/sendEmail";

import { sendEmail } from "../sendEmail";

export async function sendVerificationEmail(
  name: string,
  email: string,
  link: string
) {
  const subject = "Verify Your Email Address";
  const body = `
    <p>Hi ${name},</p>
    <p>Thanks for signing up! Please verify your email by clicking the link below:</p>
    <p><a href="${link}" target="_blank">${link}</a></p>
    <p>This link is valid for 24 hours. If you didn’t sign up, please ignore this email.</p>
  `;
  const plainTextBody = `Hi ${name},\n\nThanks for signing up! Verify your email here: ${link}\n\nThis link is valid for 24 hours. If you didn’t sign up, please ignore this email.`;

  await sendEmail(email, subject, body, plainTextBody);
}
