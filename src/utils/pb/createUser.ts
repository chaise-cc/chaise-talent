"use server";

import pb from "@/lib/pocketbase";

export async function createUser(data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  accountType: string;
  emailIsVerified: boolean;
  verificationToken: { code: string; type: string; expiryAt: Date };
}) {
  try {
    const user = await pb.collection("users").create(data);

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
