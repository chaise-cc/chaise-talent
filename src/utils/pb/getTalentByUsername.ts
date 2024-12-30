"use server";

import pb from "@/lib/pocketbase";

type User = {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  country: string;
  bio: string;
};

export async function getTalentByUsername(
  username: string
): Promise<User | null> {
  if (!username) {
    throw new Error("Username is required");
  }

  try {
    const record = await pb
      .collection("users")
      .getFirstListItem(`username = '${username}'`);

    // Map RecordModel to User type
    return {
      id: record.id,
      avatar: record.avatar, // Ensure these fields exist in your PocketBase collection
      firstname: record.firstname,
      lastname: record.lastname,
      country: record.country,
      bio: record.bio,
    };
  } catch (error) {
    console.log(error);

    return null;
  }
}
