"use server";

import { createSession, deleteSession } from "@/lib/session";
import { getExistingUserByEmail } from "@/utils/pb/getExistingUserByEmail";
import { redirect } from "next/navigation";
import { z } from "zod";
// import { getExistingUserByEmail } from "@/lib/pockethostApi";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: unknown, formData: FormData) {
  const formDataObj = Object.fromEntries(formData);
  const result = loginSchema.safeParse(formDataObj);

  // Validate form data
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  try {
    // Get the user from PocketBase
    const user = await getExistingUserByEmail(email);

    if (!user) {
      return {
        success: false,
        errors: { email: ["Invalid email or password"] },
      };
    }

    // Assuming the password is stored in plaintext (adjust if using hashed passwords)
    if (user.password !== password) {
      return {
        success: false,
        errors: { email: ["Invalid email or password"] },
      };
    }

    // Define the session data
    const sessionData = {
      id: user.id,
      email: user.email,
      role: user.accounts[0]?.type || "guest", // Assuming `accounts[0]` holds the user role
      firstName: user.firstname || "", // Example of additional data
      lastName: user.lastname || "", // Example of additional data
      phoneNumber: user.phone,
      avatar: "",
      gender: "",
      accounts: user.accounts,
      // Add other user attributes you might need
    };

    const roleToSet = user.accounts[0]?.type || "guest";
    // Create the session
    await createSession(sessionData, roleToSet);

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      errors: {
        email: ["An unexpected error occurred. Please try again later."],
      },
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
