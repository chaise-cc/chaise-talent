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
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const user = users.find((u) => u.email === email && password === "12345678");

  if (!user) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(user);
  return redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}
