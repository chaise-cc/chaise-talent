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
  const formDataObj = Object.fromEntries(formData);
  const result = loginSchema.safeParse(formDataObj);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  // Locate the user
  const user = users.find((u) => u.email === email && password === "12345678");

  if (!user) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  // Check for accounts
  if (!user.accounts || user.accounts.length === 0) {
    return {
      errors: {
        email: ["No active accounts associated with this user"],
      },
    };
  }

  // Default to the first account if activeRole is not specified
  const roleToSet = user.accounts[0];

  await createSession(user, roleToSet);

  return roleToSet === "talent"
    ? redirect(`/dashboard`)
    : roleToSet === "client" && redirect(`/panel`); // Direct to specific role dashboard
}

export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}
