// File: src/app/(pages)/check-your-email/page.tsx

import { Modal } from "@/components/custom/Modal";
import ResendVerificationClient from "@/components/custom/ResendVerificationButton";
import { Suspense } from "react";

// Suspense Fallback Component
const SuspenseFallback = () => (
  <div className="text-center text-gray-500">Loading actions...</div>
);

export default async function CheckYourEmailPage() {
  return (
    <Modal className="md:max-w-lg w-full py-8">
      <div className="py-4">
        <h1 className="text-2xl font-bold">Check Your Email</h1>
        <p>
          We&apos;ve sent a verification link to your email.
          <br /> Please check your inbox and click the link to verify your
          account.
        </p>
        <Suspense fallback={<SuspenseFallback />}>
          {/* Client component handles useSearchParams */}
          <ResendVerificationClient />
        </Suspense>
      </div>
    </Modal>
  );
}
