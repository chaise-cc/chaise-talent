import FormHeader from "@/components/custom/FormHeader";
import React from "react";
import VerifyEmailForm from "../../_components/VerifyEmail.form";
import getUserAndRole from "@/utils/getUserAndRole";

export default async function VerifyEmail() {
  const { user } = await getUserAndRole();

  if (!user) return null;

  const { email } = user;

  if (!email) {
    return <div>Email is required to verify.</div>;
  }

  return (
    <div>
      <FormHeader
        title="Check your email"
        description={`We have sent an OTP to ${email}`}
      />
      <VerifyEmailForm />
    </div>
  );
}
