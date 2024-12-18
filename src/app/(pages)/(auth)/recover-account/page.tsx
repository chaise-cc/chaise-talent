import React from "react";
import RecoverAccountForm from "../_components/RecoverAccount.form";
import FormHeader from "@/components/custom/FormHeader";

export default function RecoverAccountPage() {
  return (
    <>
      <FormHeader title="Recover your account" description="" />
      <RecoverAccountForm />;
    </>
  );
}
