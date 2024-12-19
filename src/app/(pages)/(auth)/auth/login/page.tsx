"use client";

import Link from "next/link";
import FormHeader from "@/components/custom/FormHeader";
import LoginForm from "../../_components/Login.form";

const LoginPage = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <FormHeader title="Welcome back!" description="Login to your account" />

      <LoginForm />

      <div className="grid place-items-center text-sm gap-2 my-4 ">
        <p>
          Don&apos;t have an account? &nbsp;
          <Link
            target="_blank"
            href="https://chaise.cc/signup?accountType=talent"
            className="font-bold underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
