"use server";

import pb from "@/lib/pocketbase";
import { createSession } from "@/lib/session";
import signupSchema from "@/schemas/signup";
import { generateOtp } from "@/utils/OTPs/generateOtp";
import { sendOtpEmail } from "@/utils/OTPs/sendEmailOtp";
import { storeOtpInSession } from "@/utils/OTPs/storeOtpInSession";
import he from "he"; // Used to decode HTML entities

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
  const formDataObj = Object.fromEntries(formData);
  const result = signupSchema.safeParse(formDataObj);

  if (!result.success) {
    console.error("Validation error:", result.error.flatten());
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { firstname, lastname, email, password } = await result.data;

  try {
    // Check if user already exists in PocketBase using the decoded email
    let existingUser;

    try {
      existingUser = await pb
        .collection("users")
        .getFirstListItem(`email="${email}"`);

      console.log(existingUser);
    } catch (error) {
      if (error as any) {
        existingUser = null; // If user is not found, continue to create a new one
      } else {
        throw error; // Re-throw if there's an error other than 'not found'
      }
    }

    if (existingUser) {
      console.warn("User with email already exists:", email);
      return {
        errors: { email: ["Email is already registered"] },
      };
    }

    // Generate OTP
    const otp = generateOtp();

    // Create the user record in PocketBase
    const user = await pb.collection("users").create({
      firstname,
      lastname,
      email: email, // Store the decoded email
      password,
      passwordConfirm: password,
      verificationToken: otp,
      emailVerified: false,
    });

    const userAccount = await pb.collection("accounts").create({
      userId: user.id,
      type: "talent",
      isOnboarded: false,
    });

    // Update the user's `accountIds` field with the new account ID
    const updatedAccountIds = user.accounts
      ? [...user.accounts, userAccount.type]
      : [userAccount.type];

    await pb.collection("users").update(user.id, {
      accountIds: updatedAccountIds,
    });

    console.log("Updated user's account IDs:", updatedAccountIds);

    // Store OTP in session and establish user session
    await storeOtpInSession(
      { user, activeRole: "default", expiresAt: new Date() },
      otp
    );
    await createSession(user, "default");

    // Send OTP email
    // await sendOtpEmail(email, otp);
    console.log("OTP email sent to:", email);

    return { redirectUrl: "/signup/verify-email" };
  } catch (error) {
    console.error("Error during signup process:", error);

    // Handle specific PocketBase error for email uniqueness
    if ((error as any)?.data?.data?.email?.message) {
      return {
        errors: { email: [(error as any).data.data.email.message] },
      };
    }

    return {
      errors: {
        email: ["An unexpected error occurred. Please try again later."],
      },
    };
  }
}
