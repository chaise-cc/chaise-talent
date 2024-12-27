"use server";

import pb from "@/lib/pocketbase";

/**
 * Fetches a talent user by their username.
 * @param username - The username to search for.
 * @returns The talent user record or null if not found.
 */
export async function getTalentByUsername(username: string) {
  try {
    // Fetch users matching the username
    const records = await pb.collection("users").getFullList({
      filter: `username = "${username}"`,
      $autoCancel: false,
    });

    // Filter for account type "talent"
    const talentUser = records.find((record) =>
      record.accounts.some(
        (account: { type: string }) => account.type === "talent"
      )
    );

    return talentUser || null; // Return the first matching talent user or null
  } catch (error) {
    console.error("Error fetching talent by username:", error);
    throw new Error("Failed to fetch talent. Please try again later.");
  }
}
