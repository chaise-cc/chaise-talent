"use server";

export async function generateOtpObject(expiryMinutes: number = 5) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  const expiryAt = new Date(Date.now() + expiryMinutes * 60 * 1000); // Set expiry time
  return { otp, expiryAt };
}
