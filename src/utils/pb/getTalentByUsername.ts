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
    const users = await pb.collection("users").getFullList({
      filter: `username = "${username}"`,
      $autoCancel: false,
    });

    // Find a user with an account type "talent"
    const talentUser = users.find((user) =>
      user.accounts?.some(
        (account: { type: string }) => account.type === "talent"
      )
    );

    return talentUser || null; // Return the first matching talent user or null
  } catch (error) {
    if (error instanceof Error) {
      // Handle known error type
      console.error("Error fetching talent by username:", error.message);
      throw new Error(
        "Failed to fetch talent by username. Please try again later."
      );
    } else {
      // Handle unknown error type
      console.error("Unknown error occurred:", error);
      throw new Error("An unknown error occurred. Please try again later.");
    }
  }
}
