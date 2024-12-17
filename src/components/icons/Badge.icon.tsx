import {
  Badge as ShadcnBadge,
  BadgeProps as ShadcnBadgeProps,
} from "@/components/ui/badge";
import React from "react";
import cn from "classnames";

// Extend the original BadgeProps from Shadcn UI
interface BadgeProps extends ShadcnBadgeProps {
  className?: string; // Allow custom className
  size?: "small" | "medium" | "large"; // Custom size property
}

const sizeClasses = {
  small:
    "px-2.5 py-1 text-xs font-medium gap-1 justify-between flex items-center bg-gray-75 border-gray-300",
  medium:
    "px-4 py-1.5 text-sm font-medium gap-1 justify-between flex items-center bg-gray-75 border-gray-300",
  large:
    "px-4 py-1.5 text-base font-medium gap-1 justify-between flex items-center bg-gray-75 border-gray-300",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "secondary",
  className,
  size = "medium",
  ...props
}) => (
  <ShadcnBadge
    variant={variant}
    className={cn(sizeClasses[size], className, "shrink-0 select-none")}
    {...props}
  >
    {children}
  </ShadcnBadge>
);

export default Badge;
