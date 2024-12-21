"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { PasswordInput } from "../../../../components/custom/PasswordInput";

import { ArrowRight } from "iconsax-react";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { signup } from "@/app/_actions/auth.action"; // Define a signup action
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const { pending } = useFormStatus();
  const [state, signupAction] = useActionState(signup, undefined);

  console.log(state);

  return (
    <form
      action={signupAction}
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
          required
          minLength={2}
          disabled={pending}
        />
        {state && state.errors?.firstname && (
          <p className="text-red-500">{state.errors.firstname.join(", ")}</p>
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
          required
          minLength={2}
          disabled={pending}
        />
        {state && state.errors?.lastname && (
          <p className="text-red-500">{state.errors.lastname.join(", ")}</p>
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
          required
          minLength={6}
          disabled={pending}
        />
        {state && state.errors?.email && (
          <p className="text-red-500">{state.errors.email.join(", ")}</p>
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
          placeholder="Enter Password"
          required
          minLength={6}
          disabled={pending}
        />
        {state && state.errors?.password && (
          <p className="text-red-500">{state.errors.password.join(", ")}</p>
        )}
      </div>

      {/* Options */}
      <div className="flex mt-2 justify-between items-center">
        <div className="flex flex-row items-start space-x-4">
          <Checkbox />
          <Label className="leading-none">Agree to terms and conditions</Label>
        </div>
      </div>

      {/* Submit Button */}
      <SubmitButton pending={pending} />
    </form>
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
