// File: app/verify-email/page.tsx

import { Suspense } from "react";
import VerifyEmailClient from "./verify-email-client";

export default async function VerifyEmailPage() {
  return (
    <div className="max-w-lg mx-auto w-full py-4 text-center">
      <Suspense fallback="loading...">
        <VerifyEmailClient /> {/* Render the client component */}
      </Suspense>
    </div>
  );
}
