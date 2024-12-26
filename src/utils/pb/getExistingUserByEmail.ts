"use server";

import pb from "@/lib/pocketbase";

export async function getExistingUserByEmail(email: string) {
  try {
    const user = await pb
      .collection("users")
      .getFirstListItem(`email="${email}"`);
    return user;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any)?.status === 404) {
      return null; // User not found
    }
    throw error; // Other errors
  }
}
