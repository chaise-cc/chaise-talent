// File: src/components/VerifyEmailClient.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmailAction } from "@/app/_actions/verifyEmail.action";
import { toast } from "sonner"; // Or your preferred toast notification library

const VerifyEmailClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !userId) {
        setError("Invalid or missing verification parameters.");
        setLoading(false);
        return;
      }

      try {
        const result = await verifyEmailAction(token, userId);

        if (result.success) {
          toast.success("Email successfully verified!");
          setVerificationSuccess(true);

          setTimeout(() => {
            router.push("/login"); // Redirect to login page after 2 seconds
          }, 2000);
        } else {
          setError(result.message || "Verification failed. Please try again.");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("An error occurred during verification. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, userId, router]);

  if (loading) {
    return <div>Verifying your email...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (verificationSuccess) {
    return (
      <div className="text-green-500">
        Email successfully verified! Redirecting...
      </div>
    );
  }

  return null;
};

export default VerifyEmailClient;
