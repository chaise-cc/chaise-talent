"use client";

import { useState } from "react";
import { toast } from "sonner"; // Import toast from Sonner
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { ArrowRight } from "iconsax-react";
import { Loader2 } from "lucide-react";
import { login } from "@/app/_actions/auth.action";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [pending, setPending] = useState(false); // For managing form state
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true); // Indicate loading
    setErrors({}); // Clear previous errors

    const formData = new FormData(e.currentTarget);

    try {
      const response = await login(undefined, formData);
      if (response.success) {
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          // Handle default redirection (e.g., based on user role)
          router.push("/dashboard");
        }
        toast.success("Login successful! 🎉");
      } else if (response.errors) {
        // Display toast for the first available error message
        const errorMessage =
          response.errors.email?.[0] ||
          response.errors.password?.[0] ||
          "Login failed.";
        toast.error(errorMessage);

        // Set field-specific errors to state for form validation feedback
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto w-full py-4"
    >
      {/* Email Field */}
      <EmailField errors={errors.email} pending={pending} />

      {/* Password Field */}
      <PasswordField errors={errors.password} pending={pending} />

      {/* Options */}
      <div className="flex mt-2 justify-between items-center">
        <div />
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
  <FieldContainer label="Password" id="password" errors={errors}>
    <PasswordInput
      className="text-base py-3"
      id="password"
      name="password"
      autoComplete="current-password"
      placeholder="Enter Password"
      required
      minLength={6}
      disabled={pending}
    />
  </FieldContainer>
);

const EmailField = ({
  errors,
  pending,
}: {
  errors?: string[];
  pending: boolean;
}) => (
  <FieldContainer label="Email" id="email" errors={errors}>
    <Input
      className="text-base py-3"
      type="email"
      placeholder="Email address"
      name="email"
      required
      minLength={6}
      disabled={pending}
    />
  </FieldContainer>
);

function FieldContainer({
  label,
  id,
  errors,
  children,
}: {
  label: string;
  id: string;
  errors?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start space-y-1">
      <Label className="font-semibold text-base" htmlFor={id}>
        {label}
      </Label>
      {children}
      {errors && (
        <p className="text-red-500 mt-1 text-sm" aria-live="polite">
          {errors.join(", ")}
        </p>
      )}
    </div>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      className="text-base w-full font-bold border border-transparent hover:border-main-color-500 hover:bg-transparent py-3 text-gray-700 bg-main-color-500"
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
