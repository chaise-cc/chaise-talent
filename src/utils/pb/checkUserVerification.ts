/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUserById } from "./getUserById";

// utils/pb/checkVerificationStatus.ts (Server-side)
export async function checkUserVerificationStatus(userId: string) {
  try {
    const user = await getUserById(userId);
    if (!user) throw new Error("User not found");

    return {
      verified: user.emailIsVerified,
      lastSent: user.lastVerificationSentAt
        ? new Date(user.lastVerificationSentAt).getTime()
        : null,
    };
  } catch (error) {
    throw new Error(
      "An error occurred while checking the verification status."
    );
  }
}
