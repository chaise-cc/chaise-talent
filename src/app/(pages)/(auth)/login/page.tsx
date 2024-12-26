"use client";

import Link from "next/link";
import FormHeader from "@/components/custom/FormHeader";
import LoginForm from "../_components/Login.form";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <FormHeader title="Welcome back!" description="Login to your account" />

      <Suspense
        fallback={
          <div className="flex items-center justify-center space-x-2">
            <Loader2 size={24} className="animate-spin" />
            <span>Loading...</span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>

      <div className="grid place-items-center text-sm gap-2 my-4 ">
        <p>
          Don&apos;t have an account? &nbsp;
          <Link href="/get-started" className="font-bold underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
