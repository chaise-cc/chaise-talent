"use server";

import users from "@/data/mocks/users";
import { createSession, deleteSession } from "@/lib/session";
import { User } from "@/types";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
  accountType: z.string(),
});

export async function login(prevState: unknown, formData: FormData) {
  // Ensure accountType is set before parsing
  formData.set("accountType", "talent");

  // Parse and validate form data against the schema
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password, accountType } = result.data;

  // Find the user that matches the provided credentials
  const user: User | undefined = users.find(
    (u) =>
      u.email === email &&
      password === "12345678" && // Replace with proper password hashing logic in production
      u.accounts?.includes(accountType)
  );

  if (!user) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  // Create a session for the authenticated user
  await createSession(user);

  // Redirect to the dashboard
  return redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}
