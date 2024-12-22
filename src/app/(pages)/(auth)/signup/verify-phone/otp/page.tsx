"use client";

import FormHeader from "@/components/custom/FormHeader";
import OTPInput from "@/components/custom/OTPInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function EnterPhoneOTPPage() {
  const router = useRouter();
  const phone = "searchParams.get('phone')"; // Placeholder for phone retrieval logic
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const otpLength = 6;

  const handleVerify = () => {
    if (otp.length !== otpLength) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setError("");
    alert(`OTP verified for ${phone}`);
    router.push("/dashboard"); // Navigate to the dashboard or next screen
  };

  return (
    <div className="space-y-8">
      <FormHeader
        title="Verify Phone Number"
        description="Verify your number to get started"
      />

      <div className="mt-8 space-y-8">
        {/* OTP Input */}
        <OTPInput
          length={otpLength}
          onChange={(value) => {
            setOtp(value);
            setError(""); // Clear error on change
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm text-center" role="alert">
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
        Verify Phone Number
      </Button>

      {/* Retry Link */}
      <Link
        href="/signup/verify-phone"
        className="block underline text-center text-sm text-blue-600 hover:text-blue-800"
      >
        Change phone number?
      </Link>
    </div>
  );
}
