// import dataConstant from "@/app/constants/data.constant";
import { z } from "zod";
import { talentSchema } from "./talent.zod";
import { clientSchema } from "./client.zod";

export const userSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    activeRole: z.enum(["talent", "client", "admin"]),
    accounts: z.array(z.string()),
    avatarUrl: z.string().optional(),
    location: z.object({
      city: z.string(),
      country: z.string(),
    }),
  })
  .refine(
    (data) =>
      data.activeRole === "talent"
        ? talentSchema.safeParse(data).success
        : clientSchema.safeParse(data).success,
    {
      message: "Invalid data based on the user's active role",
    }
  );

export const userRegistrationSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .min(8, "Email is too short")
    .max(50, "Email is too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  accountType: z.string(),
  getUpdates: z.boolean(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(8, "Email is too short")
    .max(50, "Email is too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

export const userisOnboardedSchema = z.object({
  userId: z.string().uuid(),
  accountType: z.enum(["talent", "client"]),
  onboardStatus: z.boolean(),
  onboardStep: z.number().min(1),
});

// INFFERRED types for USERS
export type User = z.infer<typeof userSchema>;
export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type userisOnboarded = z.infer<typeof userisOnboardedSchema>;
