"use client";

import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeSlash } from "iconsax-react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const disabled =
      props.value === "" || props.value === undefined || props.disabled;

    return (
      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "pr-12 w-full",
            "hide-password-toggle",
            className // Allow additional styles to be passed
          )}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          tabIndex={0} // Ensure it's focusable
          style={{ zIndex: 10 }} // Explicitly bring to the front
        >
          {showPassword && !disabled ? (
            <Eye size={18} color="black" aria-hidden="true" />
          ) : (
            <EyeSlash size={18} color="black" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>

        {/* Hide browser's password toggles */}
        <style jsx>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
