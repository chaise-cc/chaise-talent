// File: src/components/custom/ResendVerificationClient.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { resendVerificationLink } from "@/utils/emails/resendVerificationLink";
import { ResendVerificationResponse } from "@/types";

export default function ResendVerificationClient() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  if (!userId) {
    return <p className="text-red-500">User ID is missing from the URL.</p>;
  }

  const handleResendVerification = async () => {
    try {
      setErrorMessage(null);
      setSuccessMessage(null);
      setIsResending(true);

      const response: ResendVerificationResponse = await resendVerificationLink(
        userId
      );

      if (response.success) {
        setSuccessMessage(
          response.message || "Verification link resent successfully!"
        );
      } else {
        setErrorMessage(
          response.message || "Failed to resend verification link."
        );
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
    <div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <Button
        size={"sm"}
        className="mt-4 text-sm px-4 py-2 rounded"
        onClick={handleResendVerification}
        // disabled={isResending}
        disabled
      >
        {isResending ? "Resending..." : "Resend Verification Link"}
      </Button>
    </div>
  );
}
