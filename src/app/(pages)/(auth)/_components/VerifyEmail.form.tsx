"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import OTPInput from "@/components/custom/OTPInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@/types";

type VerifyEmailFormProps = {
  user?: User | undefined | null;
  token?: string | undefined | null; // Token received from the URL or passed as prop
};

const VerifyEmailForm = ({ user, token }: VerifyEmailFormProps) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  if (user?.emailIsVerified) {
    toast.warning("Email already verified");
    router.push("/signup/verify-phone");
    return;
  }
  const otpLength = 6;

  console.log(user);

  const handleVerify = async () => {
    if (otp.length !== otpLength) {
      setError(`Please enter a valid ${otpLength}-digit OTP.`);
      toast.error(error);
      return;
    }

    setError("");

    // Make an API call to verify the OTP
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ token, code: otp }), // Send token and OTP
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        toast.success(`OTP verified for ${user?.email}`);
        router.push("/signup/verify-phone"); // Redirect to phone verification
        console.log(data);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
        toast.error(data.message || "Invalid OTP.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="mt-8 space-y-8">
        {/* OTP Input */}
        <OTPInput
          length={otpLength}
          onChange={(value) => {
            setOtp(value);
            setError(""); // Clear error on change
          }}
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center text-sm" role="alert">
            {error}
          </p>
        )}

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={otp.length !== otpLength}
          className={`w-max mt-12 md:w-auto flex mx-auto py-4 text-sm font-bold ${
            otp.length === otpLength
              ? "bg-main-color-500 text-black hover:bg-blue-600"
              : "bg-gray-300 text-gray-700 cursor-not-allowed"
          }`}
        >
          Verify Email
        </Button>
      </div>

      {/* Retry Link */}
      <Link
        href="/signup/verify-email"
        className="block underline text-center text-sm text-blue-600 hover:text-blue-800"
      >
        Resend OTP
      </Link>
    </div>
  );
};

export default VerifyEmailForm;
