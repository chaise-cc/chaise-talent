import FormHeader from "@/components/custom/FormHeader";
import React from "react";
import VerifyEmailForm from "../../_components/VerifyEmail.form";

type VerifyEmail = {
  email: string;
};

export default function VerifyEmail({ email }: VerifyEmail) {
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
