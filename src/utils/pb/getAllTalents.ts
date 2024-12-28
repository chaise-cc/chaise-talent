"use server";

import pb from "@/lib/pocketbase";
import { Talent } from "@/types";

/**
 * Fetches all users who have an account type of "talent".
 * @returns An array of talent user records.
 */

export async function getAllTalents(): Promise<Talent[]> {
  try {
    // Fetch all users from the "users" collection
    const users = await pb.collection("users").getFullList({
      $autoCancel: false, // Optional: prevent auto-cancel for multiple requests
    });

    // Transform records into the expected Talent structure
    const talents: Talent[] = users.map((record) => ({
      id: record.id,
      firstname: record.firstname ?? "Unknown",
      lastname: record.lastname ?? "Unknown",
      username: record.username ?? "unknown",
      avatar: record.avatar ?? "/default-avatar.png", // Fallback avatar
      country: record.country ?? "Unknown",
    }));

    return talents; // Return the filtered list of talent users
  } catch (error) {
    if (error instanceof Error) {
      // Handle known error type
      console.error("Error fetching all talents:", error.message);
      throw new Error("Failed to fetch talent users. Please try again later.");
    } else {
      // Handle unknown error type
      console.error("Unknown error occurred:", error);
      throw new Error("An unknown error occurred. Please try again later.");
    }
  }
}
