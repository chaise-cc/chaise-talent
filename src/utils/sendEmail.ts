import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  htmlBody: string,
  plainTextBody: string
) {
  // Ensure environment variables are set
  const smtpUser = process.env.EMAIL_USER;
  const smtpPassword = process.env.EMAIL_PASS;

  if (!smtpUser || !smtpPassword) {
    throw new Error(
      "SMTP credentials are missing. Please check your environment variables."
    );
  }

  // Configure the email transport using SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can replace this with another service like SendGrid, Mailgun, etc.
    auth: {
      user: smtpUser, // SMTP username
      pass: smtpPassword, // SMTP password
    },
  });

  // Email options
  const mailOptions = {
    from: `"Hello from Chaise" <${smtpUser}>`, // Sender address formatted correctly
    to, // Recipient address
    subject, // Subject line
    text: plainTextBody, // Plain text body
    html: htmlBody, // HTML body
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
}
