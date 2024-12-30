"use server";

import pb from "@/lib/pocketbase";

type UpdateProfileData = {
  id: string;
  bio: string;
  username: string;
  phoneNumber: string;
  social_accounts: { platform: string; handle: string }[];
};

export async function updateProfile({
  id,
  bio,
  username,
  phoneNumber,
  social_accounts,
}: UpdateProfileData) {
  try {
    const data = { bio, username, phoneNumber, social_accounts };
    await pb.collection("users").update(id, data);
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: error };
  }
}
