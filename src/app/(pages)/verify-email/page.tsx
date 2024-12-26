// File: app/verify-email/page.tsx

import VerifyEmailClient from "./verify-email-client";
// import VerifyEmailClient from "@/components/VerifyEmailClient"; // Import the client component

export default async function VerifyEmailPage() {
  return (
    <div className="max-w-lg mx-auto w-full py-4 text-center">
      <VerifyEmailClient /> {/* Render the client component */}
    </div>
  );
}
