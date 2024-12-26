// File: app/check-your-email/page.tsx

import ResendVerificationClient from "@/components/custom/ResendVerificationButton";
import { redirect } from "next/navigation";

interface CheckYourEmailPageProps {
  searchParams: { userId?: string };
}

export default async function CheckYourEmailPage({
  searchParams,
}: CheckYourEmailPageProps) {
  const { userId } = searchParams;

  // Redirect if no userId is provided
  if (!userId) {
    redirect("/signup");
  }

  return (
    <div className="max-w-lg mx-auto w-full py-4">
      <h1 className="text-2xl font-bold">Check Your Email</h1>
      <p>
        We&apos;ve sent a verification link to your email. Please check your
        inbox and click the link to verify your account.
      </p>
      <ResendVerificationClient userId={userId} />
    </div>
  );
}
