"use server";

import users from "@/data/mocks/users";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: unknown, formData: FormData) {
  // Convert FormData to an object
  const formDataObj = Object.fromEntries(formData);
  const result = loginSchema.safeParse(formDataObj);

  console.log(prevState);

  // Validate form data
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  // Locate the user
  const user = users.find((u) => u.email === email && password === "12345678");

  if (!user) {
    return {
      success: false,
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  // Determine the role to set in the session
  const roleToSet = user.accounts[0]?.type || "guest";

  // Create a session with the active role
  await createSession(user, roleToSet);

  // Return response object with redirectUrl or default based on role
  return {
    success: true,
    user,
  };
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
