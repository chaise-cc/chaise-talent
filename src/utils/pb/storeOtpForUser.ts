"use server";

import pb from "@/lib/pocketbase";

export async function storeOtpForUser(
  userId: string,
  otpData: { otp: string; expiryAt: Date }
) {
  try {
    return await pb.collection("users").update(userId, {
      verificationToken: otpData,
    });
  } catch (error) {
    console.error("Error storing OTP for user:", error);
    throw error;
  }
}
