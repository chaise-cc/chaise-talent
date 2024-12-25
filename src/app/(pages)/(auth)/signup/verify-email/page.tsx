import FormHeader from "@/components/custom/FormHeader";
import React from "react";
import VerifyEmailForm from "../../_components/VerifyEmail.form";
import getUserAndRole from "@/utils/getUserAndRole";
import { redirect } from "next/navigation";
// import { getServerUrl } from "@/utils/gerServerUrl";

export default async function VerifyEmail() {
  const { user } = await getUserAndRole();

  if (!user) {
    // const currentUrl = await getServerUrl();
    redirect(`/auth/login`);
  }

  const { email } = user;

  return (
    <div>
      <FormHeader
        title="Check your email"
        description={`We have sent an OTP to ${email}`}
      />
      <VerifyEmailForm email={email} />
    </div>
  );
}
