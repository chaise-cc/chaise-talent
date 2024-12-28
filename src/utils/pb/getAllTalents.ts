"use server";

import pb from "@/lib/pocketbase";

export type Talent = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  avatar: string;
  country: string;
};

export async function getAllTalents(): Promise<Talent[]> {
  try {
    const records = await pb.collection("users").getFullList({
      filter: `accounts.type = "talent"`,
    });

    // Transform records into the expected Talent structure
    const talents: Talent[] = records.map((record) => ({
      id: record.id,
      firstname: record.firstname ?? "Unknown",
      lastname: record.lastname ?? "Unknown",
      username: record.username ?? "unknown",
      avatar: record.avatar ?? "/default-avatar.png", // Fallback avatar
      country: record.country ?? "Unknown",
    }));

    return talents;
  } catch (error) {
    console.error("Error fetching all talents:", error);
    throw new Error("Failed to fetch talent users. Please try again later.");
  }
}
