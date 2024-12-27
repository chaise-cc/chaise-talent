import nodemailer from "nodemailer";

export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Email Verification OTP",
    text: `Your OTP for email verification is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}
