// File: app/verify-email/page.tsx

import { redirect } from "next/navigation";
import { Suspense } from "react";
import { verifyEmailAction } from "@/app/_actions/verifyEmail.action";

// Suspense Fallback Component
const SuspenseFallback = () => (
  <div className="text-center text-gray-500">Verifying your email...</div>
);

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams?: {
    token: string;
    id: string;
  };
}) {
  const token = searchParams?.token;
  const userId = searchParams?.id;

  // Validate query parameters
  if (!token || !userId) {
    redirect("/signup");
  }

  // Perform verification
  let errorMessage: string | null = null;
  let verificationSuccess = false;

  try {
    const result = await verifyEmailAction(token, userId);

    if (result.success) {
      verificationSuccess = true;
    } else {
      errorMessage = result.message || "Verification failed. Please try again.";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    errorMessage = "An error occurred during verification. Please try again.";
  }

  // If successful, redirect to login after delay
  if (verificationSuccess) {
    setTimeout(() => {
      redirect("/login");
    }, 2000);

    return (
      <Suspense fallback={<SuspenseFallback />}>
        <div className="text-green-500">
          Email successfully verified! Redirecting...
        </div>
      </Suspense>
    );
  }

  // Handle errors
  return (
    <div className="max-w-lg mx-auto w-full py-4 text-center">
      {errorMessage ? (
        <div className="text-red-500">{errorMessage}</div>
      ) : (
        <Suspense fallback={<SuspenseFallback />}>
          <div>Verifying your email...</div>
        </Suspense>
      )}
    </div>
  );
}
