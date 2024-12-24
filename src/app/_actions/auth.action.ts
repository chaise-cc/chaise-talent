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
});

export async function login(prevState: unknown, formData: FormData) {
  const formDataObj = Object.fromEntries(formData);
  const result = loginSchema.safeParse(formDataObj);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const user = users.find((u) => u.email === email && password === "12345678");

  if (!user) {
    return {
      success: false,
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  const roleToSet = user.accounts?.[0]?.type || "guest";

  await createSession(user, roleToSet);

  return {
    success: true,
    user,
    redirectUrl: roleToSet === "talent" ? `/dashboard` : `/panel`,
  };
}

// Define validation schema
const signupSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters" })
    .trim(),
  lastname: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters" })
    .trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

// Mock database for users
const userss: Array<{ email: string }> = [];

export async function signup(prevState: unknown, formData: FormData) {
  const formDataObj = Object.fromEntries(formData);
  const result = signupSchema.safeParse(formDataObj);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { firstname, lastname, email } = result.data;

  // Check if the user already exists
  const existingUser = userss.find((u) => u.email === email);
  if (existingUser) {
    return {
      errors: {
        email: ["Email is already registered"],
      },
    };
  }

  // Simulate creating a new user
  const newUser: User = {
    id: (users.length + 1).toString(),
    firstName: firstname,
    lastName: lastname,
    email,
    gender: "",
    avatar: "",
    identityIsVerified: false,
    emailIsVerified: false,
    phoneIsVerified: false,
    accounts: [{ type: "talent", isOnboarded: false }],
  };
  userss.push(newUser);

  // Automatically log the user in after signup
  await createSession(newUser, "default");

  // Redirect to dashboard
  return redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}
