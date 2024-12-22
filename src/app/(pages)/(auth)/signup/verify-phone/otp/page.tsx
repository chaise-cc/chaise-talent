"use client";

import FormHeader from "@/components/custom/FormHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function EnterPhoneOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");

  const handleInputChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits and single character

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next slot if input is valid
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-slot-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setError("");
    alert(`OTP verified for ${phone}`);
    router.push("/dashboard"); // Navigate to the dashboard or next screen
  };

  return (
    <>
      <FormHeader
        title="Verify Phone Number"
        description="Verify your number to get started"
      />

      <div className="mt-8 space-y-8">
        {/* OTP Input */}
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-slot-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              className="!text-4xl md:text-5xl h-14 md:h-16 w-14 md:w-16 border text-center focus:ring-2 focus:ring-blue-500 rounded-md"
            />
          ))}
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
          disabled={otp.join("").length !== 6}
          className={`w-full md:w-auto mx-auto py-4 text-sm font-bold ${
            otp.join("").length === 6
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
    </>
  );
}
