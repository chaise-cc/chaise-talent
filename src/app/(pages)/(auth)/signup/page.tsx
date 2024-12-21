import FormHeader from "@/components/custom/FormHeader";
import Link from "next/link";
import React from "react";
import SignupForm from "../_components/SignUpForm";

export default function SignUp() {
  return (
    <div className="w-full flex flex-col items-center">
      <FormHeader
        title="Create your account"
        description="You'll be up and running in 5 minutes"
      />

      {/* <LoginForm /> */}

      <SignupForm />

      <div className="grid place-items-center text-sm gap-2 my-4 ">
        <p>
          Already have an account? &nbsp;
          <Link href="/auth/login" className="font-bold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
