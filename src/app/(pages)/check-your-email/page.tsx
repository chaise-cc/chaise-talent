"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resendVerificationLink } from "@/utils/emails/resendVerificationLink";
import { Button } from "@/components/ui/button";
import { ResendVerificationResponse } from "@/types";

// Suspense Fallback Component
const SuspenseFallback = () => (
  <div className="text-center text-gray-500">
    Processing your request, please wait...
  </div>
);

export default function CheckYourEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  // Handle redirect if userId is not present
  if (!userId) {
    router.push("/signup");
    return null; // Immediately stop rendering to prevent any UI being displayed
  }

  // Handle resend verification request
  const handleResendVerification = async () => {
    try {
      setErrorMessage(null); // Clear previous error
      setSuccessMessage(null); // Clear previous success message
      setIsResending(true);

      // Attempt to resend the verification link
      const response: ResendVerificationResponse = await resendVerificationLink(
        userId
      );

      if (response.success) {
        setSuccessMessage(response?.message || ""); // Display success message
      } else {
        setErrorMessage(response.message || ""); // Display error message if failure
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full py-4">
      {/* Display Suspense fallback for any other async operations */}
      <Suspense fallback={<SuspenseFallback />}>
        <h1 className="text-2xl font-bold">Check Your Email</h1>
        <p>
          We&apos;ve sent a verification link to your email. Please check your
          inbox and click the link to verify your account.
        </p>
        <div className="mt-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <Button
            className="mt-4 px-4 py-2 rounded"
            onClick={handleResendVerification}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend Verification Link"}
          </Button>
        </div>
      </Suspense>
    </div>
  );
}
