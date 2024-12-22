"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";

const countryCodes = [
  { code: "+1", label: "United States", flag: "🇺🇸" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
];

export default function PhoneNumberInput() {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("whatsapp");
  const router = useRouter();

  const handleSubmit = () => {
    if (!phoneNumber) {
      setError("Phone number is required.");
      return;
    }

    setError(""); // Clear errors
    const fullPhoneNumber = `${selectedCode}${phoneNumber}`;
    router.push(
      `/signup/verify-phone/otp?phone=${encodeURIComponent(fullPhoneNumber)}`
    );
  };

  return (
    <div className=" space-y-8  pb-10 bg-white">
      {/* Phone Number Input Section */}
      <div className="space-y-2 ">
        <Label className="font-bold text-gray-700">Phone Number</Label>
        <div className="flex border items-center rounded-lg overflow-hidden bg-gray-100">
          {/* Country Code Dropdown */}
          <select
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="bg-main-color-50 px-4 py-2 text-base font-medium border-none focus:ring-0 focus:outline-none appearance-none"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>

          {/* Phone Number Input */}
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-1 px-3 py-2 text-base bg-white outline-none"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      {/* Verification Method Dropdown */}
      <div className="space-y-2 flex flex-col w-full justify-between ">
        <Label className=" shrink-0  font-bold text-gray-700">
          Verification Method:
        </Label>
        <select
          value={verificationMethod}
          onChange={(e) => setVerificationMethod(e.target.value)}
          className="py-4  w-full text-sm px-4 border bg-main-color-50 rounded-lg  focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="sms" disabled>
            SMS (Unavailable)
          </option>
          <option value="call" disabled>
            Call (Unavailable)
          </option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>
      <p className="text-xs text-gray-500">
        * Only WhatsApp is currently available for verification.
      </p>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <Button
        disabled={!phoneNumber}
        onClick={handleSubmit}
        className={`flex w-max mx-auto gap-3 px-6 !mt-12 text-sm font-bold py-5 rounded-lg transition-colors ${
          phoneNumber
            ? "bg-main-color-500 text-black hover:bg-blue-600"
            : "bg-gray-300 cursor-not-allowed text-gray-700"
        }`}
      >
        Verify Phone Number <PhoneCall className="animate-pulse" size={20} />
      </Button>
    </div>
  );
}
