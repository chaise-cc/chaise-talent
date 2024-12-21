import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { PasswordInput } from "../../../../components/custom/PasswordInput";

import { ArrowRight } from "iconsax-react";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { login } from "@/app/_actions/auth.action";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const { pending } = useFormStatus();
  const [state, loginAction] = useActionState(login, undefined);

  console.log(state);

  return (
    <form
      action={loginAction}
      className="space-y-6 max-w-lg mx-auto w-full py-4"
    >
      {/* Email Field */}
      <div className="flex flex-col items-start space-y-1 ">
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
        {/* Error for Email */}
        {state && state !== undefined && state.errors?.email && (
          <p className="text-red-500">{state.errors.email.join(", ")}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="flex flex-col items-start space-y-1 ">
        <Label className="font-semibold text-base" htmlFor="password">
          Password
        </Label>

        <PasswordInput
          className="text-base py-6"
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter Password"
          required
          minLength={6}
          disabled={pending}
        />
        {/* Error for Password */}
        {state && state !== undefined && state.errors?.password && (
          <p className="text-red-500">{state.errors.password.join(", ")}</p>
        )}
      </div>

      {/* Options */}
      <div className="flex mt-2 justify-between items-center">
        <div className="flex flex-row items-start space-x-4 space-y-0">
          <Checkbox />
          <Label className="leading-none">Keep me logged in</Label>
        </div>

        <a href="/recover-account" className="font-bold text-sm underline">
          Recover password
        </a>
      </div>

      {/* Submit Button */}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="text-base w-full font-bold border border-transparent hover:border-main-color-500 hover:bg-transparent py-6 text-gray-700 bg-main-color-500"
      disabled={pending}
    >
      {pending ? (
        <>
          Logging in <Loader2 size={18} className="animate-spin" />
        </>
      ) : (
        <>
          Login <ArrowRight size={20} color="black" />
        </>
      )}
    </Button>
  );
}
