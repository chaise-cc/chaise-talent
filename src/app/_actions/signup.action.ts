"use server";

import users from "@/data/mocks/users";
import { createSession } from "@/lib/session";
import signupSchema from "@/schemas/signup";
import { User } from "@/types";
import { generateOtp } from "@/utils/OTPs/generateOtp";
import { sendOtpEmail } from "@/utils/OTPs/sendEmailOtp";
import { storeOtpInSession } from "@/utils/OTPs/storeOtpInSession";

interface SignupErrorResponse {
  errors: {
    email?: string[];
    password?: string[];
    firstname?: string[];
    lastname?: string[];
  };
  redirectUrl?: undefined;
}

interface SignupSuccessResponse {
  redirectUrl: string;
  errors?: undefined;
}

type SignupResponse = SignupErrorResponse | SignupSuccessResponse;

export async function signup(
  prevState: unknown,
  formData: FormData
): Promise<SignupResponse> {
  console.log("Starting signup process");
  try {
    const formDataObj = Object.fromEntries(formData);
    console.log("Parsed FormData:", formDataObj);

    const result = signupSchema.safeParse(formDataObj);
    if (!result.success) {
      console.error("Validation failed:", result.error.flatten().fieldErrors);
      return { errors: result.error.flatten().fieldErrors };
    }

    const { firstname, lastname, email, password } = result.data;
    console.log("Signup data:", { firstname, lastname, email, password });

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      console.error("Email already registered:", email);
      return { errors: { email: ["Email is already registered"] } };
    }

    if (password.length < 6) {
      console.error("Password too short:", password);
      return {
        errors: { password: ["Password must be at least 6 characters long"] },
      };
    }

    // Create a new user
    const newUser: User = {
      id: (users.length + 1).toString(),
      firstName: firstname,
      lastName: lastname,
      email,
      gender: "", // Optional
      avatar: "", // Optional
      identityIsVerified: false,
      emailIsVerified: false,
      phoneIsVerified: false,
      accounts: [{ type: "talent", isOnboarded: false }],
      phoneNumber: "",
      verificationToken: "",
      otpExpiry: undefined,
    };

    users.push(newUser);
    console.log("User created:", newUser);

    const otp = generateOtp();
    console.log("Generated OTP:", otp);

    await storeOtpInSession(
      { user: newUser, activeRole: "default", expiresAt: new Date() },
      otp
    );
    console.log("OTP stored in session");

    await sendOtpEmail(email, otp);
    console.log("OTP email sent to:", email);

    await createSession(newUser, "default");
    console.log("Session created");

    return { redirectUrl: "/signup/verify-email" };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      errors: {
        email: ["An unexpected error occurred. Please try again later."],
      },
    };
  }
}
