import FormHeader from "@/components/custom/FormHeader";
import React from "react";
import VerifyEmailForm from "../../_components/VerifyEmail.form";

export default function VerifyEmail() {
  return (
    <div>
      <FormHeader
        title="Verify email"
        description="Verfication code is sent to your email address"
      />

      <VerifyEmailForm />
    </div>
  );
}
