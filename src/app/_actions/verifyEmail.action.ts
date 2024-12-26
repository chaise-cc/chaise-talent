// File: app/actions/verifyEmailAction.ts
"use server";

import { getUserById } from "@/utils/pb/getUserById";
import { verifyVerificationToken } from "@/utils/OTPs/verifyVerificationToken"; // Utility for verifying tokens
import { updateUserVerificationStatus } from "@/utils/pb/updateUserVerificationStatus";
// import { updateUserVerificationStatus } from "@/utils/pb/updateUserVerificationTimeStamp";

export async function verifyEmailAction(token: string, userId: string) {
  try {
    // Step 1: Retrieve user by ID
    const user = await getUserById(userId);

    if (!user) {
      return { success: false, message: "User not found." };
    }

    // Step 2: Check if the token matches and if it has expired
    const tokenValid = await verifyVerificationToken(
      token,
      user.verificationToken
    );

    if (!tokenValid) {
      return { success: false, message: "Invalid or expired token." };
    }

    // Step 3: Update user's email verification status
    await updateUserVerificationStatus(userId);

    // Step 4: Return success
    return { success: true };
  } catch (error) {
    console.error("Error during email verification:", error);
    return {
      success: false,
      message: "An error occurred during verification.",
    };
  }
}
