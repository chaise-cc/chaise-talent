// File: components/ResendVerificationClient.tsx

"use client";

import { useState } from "react";
import { resendVerificationLink } from "@/utils/emails/resendVerificationLink";
import { Button } from "@/components/ui/button";

interface ResendVerificationClientProps {
  userId: string;
}

export default function ResendVerificationClient({
  userId,
}: ResendVerificationClientProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const handleResendVerification = async () => {
    try {
      setErrorMessage(null); // Clear any previous error
      setSuccessMessage(null); // Clear previous success message
      setIsResending(true);

      // Call the resendVerificationLink function
      const response = await resendVerificationLink(userId);

      if (response.success) {
        setSuccessMessage("Verification link sent!");
      } else {
        setErrorMessage("Failed to resend verification link.");
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
    <div className="mt-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <Button
        className="mt-4 px-4 py-2 rounded"
        onClick={handleResendVerification}
        // disabled={isResending}
        disabled
      >
        {isResending ? "Resending..." : "Resend Verification Link"}
      </Button>
    </div>
  );
}
