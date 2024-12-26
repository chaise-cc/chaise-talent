"use server";

import signupSchema from "@/schemas/signup";
import { sendVerificationEmail } from "@/utils/emails/sendVerificationEmail";
import { generateVerificationToken } from "@/utils/OTPs/generateVerificationToken";
import { addAccountType } from "@/utils/pb/accountTypes";
import { createUser } from "@/utils/pb/createUser";
import { getExistingUserByEmail } from "@/utils/pb/getExistingUserByEmail";
import { updateUserVerificationTimestamp } from "@/utils/pb/updateUserVerificationTimeStamp";

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

  const { firstname, lastname, email, password, accountType } = result.data;

  try {
    // Check if user already exists
    const existingUser = await getExistingUserByEmail(email);

    if (existingUser) {
      return {
        errors: { email: ["Email is already registered"] },
      };
    }

    const { rawToken, hashedToken, expiryAt } = await generateVerificationToken(
      24
    );

    // Create user with a pending status
    const user = await createUser({
      firstname,
      lastname,
      email,
      password,
      accountType,
      emailIsVerified: false,
      verificationToken: { code: hashedToken, type: "email", expiryAt },
    });

    await addAccountType(user.id, accountType);

    // Construct the verification URL using the environment variable for the base URL
    const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000"; // Default to localhost if not set

    const verificationLink = `${baseUrl}/verify-email?token=${rawToken}&id=${user.id}`;
    await sendVerificationEmail(firstname, email, verificationLink);

    await updateUserVerificationTimestamp(user.id);
    // Return success response with redirect to the "check your email" page
    return { redirectUrl: `/check-your-email?userId=${user.id}` };
  } catch (error) {
    console.error("Error during signup process:", error);
    return {
      errors: {
        email: ["An unexpected error occurred. Please try again later."],
      },
    };
  }
}
