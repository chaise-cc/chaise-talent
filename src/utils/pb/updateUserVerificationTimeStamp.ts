import pb from "@/lib/pocketbase";

export async function updateUserVerificationTimestamp(userId: string) {
  const now = new Date().toISOString(); // Store in ISO format
  await pb
    .collection("users")
    .update(userId, { lastVerificationRequestedAt: now });
}
