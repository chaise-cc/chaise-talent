// File: app/verify-email/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { verifyEmailAction } from "@/app/_actions/verifyEmail.action";
// import { toast } from "react-toastify";
// import { verifyEmailAction } from "@/actions/verifyEmailAction"; // Verify Email action

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const userId = searchParams.get("id");

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("An error occurred during verification. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Your email is being verified...</div>;
};

export default VerifyEmailPage;
