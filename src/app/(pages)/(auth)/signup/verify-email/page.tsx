import FormHeader from "@/components/custom/FormHeader";
import React from "react";
import VerifyEmailForm from "../../_components/VerifyEmail.form";

type VerifyEmailProps = {
  email: string;
};

export default function VerifyEmail({ email }: VerifyEmailProps) {
  return (
    <div>
      <FormHeader
        title="Check your email"
        description={`We have sent an otp to ${email}`}
      />

      <VerifyEmailForm />
    </div>
  );
}
