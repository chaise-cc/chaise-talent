import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { ArrowRight } from "iconsax-react";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { login } from "@/app/_actions/auth.action";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const formStatus = useFormStatus();
  const pending = formStatus?.pending || false; // Safe fallback for pending state

  return (
    <form
      action={loginAction}
      className="space-y-6 max-w-lg mx-auto w-full py-4"
    >
      {/* Email Field */}
      <EmailField
        errors={state && "errors" in state ? state.errors?.email : undefined}
        pending={pending}
      />

      {/* Password Field */}
      <PasswordField
        errors={state && "errors" in state ? state.errors?.password : undefined}
        pending={pending}
      />

      {/* Options */}
      <div className="flex mt-2 justify-between items-center">
        <div></div>
        <Link href="/recover-account" className="font-bold text-sm underline">
          Recover password
        </Link>
      </div>

      {/* Submit Button */}
      <SubmitButton pending={pending} />
    </form>
  );
}

const PasswordField = ({
  errors,
  pending,
}: {
  errors?: string[];
  pending: boolean;
}) => (
  <div className="flex flex-col items-start space-y-1">
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
    {errors && (
      <p className="text-red-500 mt-1 text-sm" aria-live="polite">
        {errors.join(", ")}
      </p>
    )}
  </div>
);

const EmailField = ({
  errors,
  pending,
}: {
  errors?: string[];
  pending: boolean;
}) => (
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
    {/* Error for Email */}
    {errors && (
      <p className="text-red-500 mt-1 text-sm" aria-live="polite">
        {errors.join(", ")}
      </p>
    )}
  </div>
);

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      className="text-base w-full font-bold border border-transparent hover:border-main-color-500 hover:bg-transparent py-6 text-gray-700 bg-main-color-500"
      disabled={pending}
    >
      {pending ? (
        <>
          Logging in <Loader2 size={18} className="animate-spin ml-2" />
        </>
      ) : (
        <>
          Login <ArrowRight size={20} color="black" className="ml-2" />
        </>
      )}
    </Button>
  );
}
