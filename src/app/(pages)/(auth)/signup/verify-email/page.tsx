import FormHeader from "@/components/custom/FormHeader";
import React from "react";
import VerifyEmailForm from "../../_components/VerifyEmail.form";
import getUserAndRole from "@/utils/getUserAndRole";

export default async function VerifyEmail() {
  const { user } = await getUserAndRole();

  return (
    <div>
      <FormHeader
        title="Check your email"
        description={`We have sent an OTP to ${user?.email}`}
      />
      <VerifyEmailForm user={user} />
    </div>
  );
}
