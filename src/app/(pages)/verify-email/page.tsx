/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { verifyEmailAction } from "@/app/_actions/verifyEmail.action";

// Suspense Fallback Component
const SuspenseFallback = () => (
  <div className="text-center text-gray-500">Verifying your email...</div>
);

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to verify email
  const verifyEmail = async (token: string | null, userId: string | null) => {
    if (!token || !userId) {
      setError("Invalid or missing verification parameters.");
      setLoading(false);
      return;
    }

    try {
      const result = await verifyEmailAction(token, userId);

      if (result.success) {
        toast.success("Email successfully verified!");
        setTimeout(() => {
          router.push("/login");
        }, 2000); // Redirect to login page after 2 seconds
      } else {
        setError(result.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the token and userId from the URL
  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  if (!token || !userId) {
    router.push("/signup");
    return null; // Prevent rendering until redirection happens
  }

  // Handle verification immediately upon component mounting
  verifyEmail(token, userId);

  // Show loading state while verification is happening
  if (loading) {
    return (
      <Suspense fallback={<SuspenseFallback />}>
        <div>Verifying your email...</div>
      </Suspense>
    );
  }

  // Show error if there's an issue
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return null; // Prevent showing content until the verification is complete
};

export default VerifyEmailPage;
