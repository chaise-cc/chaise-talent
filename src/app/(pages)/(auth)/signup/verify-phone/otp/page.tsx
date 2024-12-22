"use client";

import FormHeader from "@/components/custom/FormHeader";
import OTPInput from "@/components/custom/OTPInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";

// Component to load the phone number from search params
const PhoneNumberLoader = () => {
  const searchParams = useSearchParams();
  const phone = searchParams?.get("phone");

  if (!phone) {
    return (
      <p className="text-red-500 text-sm text-center">
        Error: Phone number not found in the URL.
      </p>
    );
  }

  return <PhoneNumberVerification phone={phone} />;
};

// Main component to handle OTP verification
const PhoneNumberVerification = ({ phone }: { phone: string }) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const otpLength = 4;

  const handleVerify = () => {
    if (otp.length !== otpLength) {
      setError(`Please enter a valid ${otpLength}-digit OTP.`);
      return;
    }

    setError("");
    alert(`OTP verified for ${phone}`);
    router.push("/dashboard");
  };

  return (
    <>
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
      </div>

      {/* Retry Link */}
      <Link
        href="/signup/verify-phone"
        className="block underline text-center text-sm text-blue-600 hover:text-blue-800"
      >
        Change phone number?
      </Link>
    </>
  );
};

export default function EnterPhoneOTPPage() {
  return (
    <div className="space-y-8">
      <FormHeader
        title="Verify Phone Number"
        description="Verify your number to get started"
      />
      <Suspense
        fallback={
          <p className="text-gray-500 text-center text-sm">
            Loading phone number...
          </p>
        }
      >
        <PhoneNumberLoader />
      </Suspense>
    </div>
  );
}
