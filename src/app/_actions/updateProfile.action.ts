"use server";

import pb from "@/lib/pocketbase";
import { createSession } from "@/lib/session";
import getUserAndRole from "@/utils/getUserAndRole";

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
    const updatedUser = await pb.collection("users").update(id, data);
    const { activeRole } = await getUserAndRole();
    // Update the session with the new role
    const user = {
      username: updatedUser.username || undefined,
      id: updatedUser.id || "",
      firstname: updatedUser.firstname || "",
      lastname: updatedUser.lastname || "",
      gender: updatedUser.gender || "",
      email: updatedUser.email || "",
      emailIsVerified: updatedUser.emailIsVerified || "false",
      dateOfBirth: updatedUser.dateOfBirth || "",
      phoneNumber: updatedUser.phoneNumber || "",
      language: updatedUser.language || "",
      country: updatedUser.country || "",
      accounts: updatedUser.accounts || [],
      avatar: updatedUser.avatar || "",
      social_accounts: updatedUser.social_accounts || [],
      bio: updatedUser.bio || "",
    };
    await createSession(user, activeRole || user.accounts[0].type);
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: error };
  }
}
