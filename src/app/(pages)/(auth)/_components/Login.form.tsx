"use client";

import { useState } from "react";
import { toast } from "sonner";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    const formData = new FormData(e.currentTarget);

    try {
      const response = await login(undefined, formData);
      if (response.success) {
        toast.success("Login successful! 🎉");
        router.push(redirectUrl || "/dashboard");
      } else if (response.errors) {
        const firstError =
          response.errors.email?.[0] ||
          response.errors.password?.[0] ||
          "Login failed.";
        toast.error(firstError);
        setFormErrors(response.errors);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto w-full py-4"
    >
      <EmailField
        value={formValues.email}
        errors={formErrors.email}
        onChange={handleInputChange}
        disabled={isSubmitting}
      />
      <PasswordField
        value={formValues.password}
        errors={formErrors.password}
        onChange={handleInputChange}
        disabled={isSubmitting}
      />
      <div className="flex justify-between items-center mt-2">
        <div />
        <Link href="/recover-account" className="font-bold text-sm underline">
          Recover password
        </Link>
      </div>
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}

function EmailField({
  value,
  errors,
  onChange,
  disabled,
}: {
  value: string;
  errors?: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}) {
  return (
    <FieldContainer label="Email" id="email" errors={errors}>
      <Input
        type="email"
        name="email"
        placeholder="Email address"
        value={value}
        onChange={onChange}
        required
        minLength={6}
        disabled={disabled}
        className="text-base py-3"
      />
    </FieldContainer>
  );
}

function PasswordField({
  value,
  errors,
  onChange,
  disabled,
}: {
  value: string;
  errors?: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}) {
  return (
    <FieldContainer label="Password" id="password" errors={errors}>
      <PasswordInput
        name="password"
        id="password"
        placeholder="Enter Password"
        value={value}
        onChange={onChange}
        required
        minLength={6}
        autoComplete="current-password"
        disabled={disabled}
        className="text-base py-3"
      />
    </FieldContainer>
  );
}

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
    <div className="flex flex-col space-y-1">
      <Label htmlFor={id} className="font-semibold text-base">
        {label}
      </Label>
      {children}
      {errors && (
        <p className="text-red-500 mt-1 text-sm">{errors.join(", ")}</p>
      )}
    </div>
  );
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className="w-full py-3 text-base font-bold bg-main-color-500 text-gray-700 border border-transparent hover:bg-transparent hover:border-main-color-500"
    >
      {isSubmitting ? (
        <>
          Logging in <Loader2 size={18} className="animate-spin ml-2" />
        </>
      ) : (
        <>
          Login <ArrowRight size={20} className="ml-2" />
        </>
      )}
    </Button>
  );
}
