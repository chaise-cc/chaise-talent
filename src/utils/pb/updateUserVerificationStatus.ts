import pb from "@/lib/pocketbase";

export async function updateUserVerificationStatus(userId: string) {
  try {
    await pb.collection("users").getOne(userId);

    // Update the user with email verification status
    await pb.collection("users").update(userId, {
      emailIsVerified: true,
      verificationToken: null, // Clear the verification token after successful verification
    });

    console.log(`User ${userId} email verified successfully.`);
  } catch (error) {
    console.error("Failed to update user verification status:", error);
    throw new Error("Failed to update user verification status.");
  }
}
