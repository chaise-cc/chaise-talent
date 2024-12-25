"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import OTPInput from "@/components/custom/OTPInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type VerifyEmailFormProps = {
  email?: string;
};

const VerifyEmailForm = ({ email }: VerifyEmailFormProps) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const otpLength = 6;

  if (!email) {
    toast.error(" Error: Email not found. Please check the verification link.");
  }

  const handleVerify = () => {
    if (otp.length !== otpLength) {
      setError(`Please enter a valid ${otpLength}-digit OTP.`);
      toast.error(error);
      return;
    }

    setError("");
    toast.success(`OTP verified for ${email}`);
    router.push("/signup/verify-phone");
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
