"use server";

import pb from "@/lib/pocketbase";

export async function addAccountType(userId: string, accountType: string) {
  try {
    // Fetch current user data
    const user = await pb.collection("users").getOne(userId);

    // Add the new account type to the accounts JSON
    const updatedAccounts = [
      ...(user.accounts || []),
      { type: accountType, isOnboarded: false },
    ];

    await pb.collection("users").update(userId, { accounts: updatedAccounts });
    console.log("Account type added successfully:", accountType);
  } catch (error) {
    console.error("Error adding account type:", error);
    throw error;
  }
}

export async function updateAccountType(userId: string, accountType: string) {
  try {
    // Fetch current user data
    const user = await pb.collection("users").getOne(userId);

    // Add the new account type to the accounts JSON
    const updatedAccounts = [
      ...(user.accounts || []),
      { type: accountType, isOnboarded: false },
    ];

    await pb.collection("users").update(userId, { accounts: updatedAccounts });
    console.log("Account type added successfully:", accountType);
  } catch (error) {
    console.error("Error adding account type:", error);
    throw error;
  }
}
