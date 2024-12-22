import React from "react";
import RecoverAccountForm from "../_components/RecoverAccount.form";
import FormHeader from "@/components/custom/FormHeader";
import Link from "next/link";

export default function RecoverAccountPage() {
  return (
    <>
      <FormHeader title="Recover your account" description="" />
      <RecoverAccountForm />
      <div className="grid place-items-center text-gray-700 text-sm gap-2 my-4 ">
        <div className="space-x-4 divide-x-2">
          <Link href="/auth/login" className="font-semibold text-sm underline">
            Login
          </Link>
          <Link
            target="_blank"
            href="https://chaise.cc/signup?accountType=talent"
            className="font-bold underline pl-4"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
