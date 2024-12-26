"use server";

import { getUserById } from "@/utils/pb/getUserById"; // Add the necessary utility functions
import { sendVerificationEmail } from "@/utils/emails/sendVerificationEmail";
import { updateUserVerificationTimestamp } from "../pb/updateUserVerificationTimeStamp";

export async function resendVerificationLink(userId: string) {
  try {
    // Fetch the user by userId
    const user = await getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check the last verification link sent timestamp
    const lastRequested = new Date(user.lastVerificationRequestedAt);
    const now = new Date();
    const timeDifference = now.getTime() - lastRequested.getTime();
    const cooldownPeriod = 15 * 60 * 1000; // 15 minutes

    if (timeDifference < cooldownPeriod) {
      throw new Error(
        "You can only request the verification link once every 15 minutes."
      );
    }

    // Update the timestamp of when the link was last requested
    await updateUserVerificationTimestamp(userId);

    // Send verification email again
    const verificationUrl = `${process.env.APP_BASE_URL}/verify-email?token=${user.verificationToken}`;
    await sendVerificationEmail(user.firstname, user.email, verificationUrl);

    return { success: true };
  } catch (error) {
    console.error("Error resending verification email:", error);
    throw new Error("An unexpected error occurred. Please try again later.");
  }
}
