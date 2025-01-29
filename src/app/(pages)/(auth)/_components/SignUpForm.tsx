"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { PasswordInput } from "../../../../components/custom/PasswordInput";

import { ArrowRight } from "iconsax-react";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Suspense, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signup } from "@/app/_actions/signup.action";

export default function SignupForm() {
  const searchParams = useSearchParams();
  const accountType = searchParams.get("accountType");

  const [pending, setPending] = useState(false); // For managing form state
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    firstname?: string[];
    lastname?: string[];
  }>({});
  const router = useRouter();

  // Local state for form inputs
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    accountType: accountType || "",
  });

  if (!accountType) return redirect("/get-started");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true); // Indicate loading
    setErrors({}); // Clear previous errors

    const formData = new FormData(e.currentTarget);

    try {
      const response = await signup(undefined, formData);

      if ("redirectUrl" in response) {
        toast.success("Signup successful! 🎉");
        router.push(response.redirectUrl || "");
      } else if (response.errors) {
        const errorMessage =
          response.errors.email?.[0] ||
          response.errors.password?.[0] ||
          response.errors.firstname?.[0] ||
          response.errors.lastname?.[0] ||
          "Signup failed.";
        toast.error(errorMessage);

        setErrors(response.errors);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message ||
          "An unexpected error occurred. Please try again later."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setPending(false); // Reset pending state
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const isPending = pending;

  return (
    <Suspense
      fallback={
        <p className="text-gray-500 text-center text-sm">
          Retrieving account type...
        </p>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-lg mx-auto w-full py-4"
      >
        {/* First Name Field */}
        <div className="flex flex-col items-start space-y-1">
          <Label className="font-semibold text-base" htmlFor="firstname">
            First Name
          </Label>
          <Input
            className="text-base py-6"
            type="text"
            placeholder="First Name"
            name="firstname"
            value={formValues.firstname}
            onChange={handleChange}
            required
            minLength={2}
            disabled={isPending}
          />
          {errors.firstname && (
            <p className="text-red-500">{errors.firstname.join(", ")}</p>
          )}
        </div>

        {/* Last Name Field */}
        <div className="flex flex-col items-start space-y-1">
          <Label className="font-semibold text-base" htmlFor="lastname">
            Last Name
          </Label>
          <Input
            className="text-base py-6"
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={formValues.lastname}
            onChange={handleChange}
            required
            minLength={2}
            disabled={isPending}
          />
          {errors.lastname && (
            <p className="text-red-500">{errors.lastname.join(", ")}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col items-start space-y-1">
          <Label className="font-semibold text-base" htmlFor="email">
            Email
          </Label>
          <Input
            className="text-base py-6"
            type="email"
            placeholder="Email address"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            minLength={6}
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.join(", ")}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col items-start space-y-1">
          <Label className="font-semibold text-base" htmlFor="password">
            Password
          </Label>
          <PasswordInput
            className="text-base py-6"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
            minLength={6}
            disabled={isPending}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.join(", ")}</p>
          )}
        </div>

        {/* Hidden Account Type Field */}
        <input
          type="hidden"
          name="accountType"
          value={formValues.accountType}
        />

        {/* Options */}
        <div className="flex mt-2 justify-between items-center">
          <div className="flex flex-row items-start space-x-4">
            <Checkbox />
            <Label className="leading-none">
              Agree to terms and conditions
            </Label>
          </div>
        </div>

        {/* Submit Button */}
        <SubmitButton pending={pending} />
      </form>
    </Suspense>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      className="text-base w-full font-bold border border-transparent hover:border-main-color-500 hover:bg-transparent py-6 text-gray-700 bg-main-color-500"
      disabled={pending}
    >
      {pending ? (
        <>
          Signing up <Loader2 size={18} className="animate-spin" />
        </>
      ) : (
        <>
          Sign Up <ArrowRight size={20} color="black" />
        </>
      )}
    </Button>
  );
}
