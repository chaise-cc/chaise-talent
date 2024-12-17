import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AVATAR_FEMALE } from "@/data/mocks/default.mock";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "extra-small" | "small" | "md" | "medium" | "large" | "extra-large";
  shape?: "circle" | "square";
  initials?: string;
  border?: boolean;
  status?: "online" | "offline" | "busy";
  name?: string; // For dynamic initials calculation
}

const sizeClasses = {
  "extra-small": "w-6 h-6 text-xs",
  small: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-sm",
  medium: "w-12 h-12 text-md",
  large: "w-16 h-16 text-lg",
  "extra-large": "w-24 h-24 text-xl",
};

const shapeClasses = {
  circle: "rounded-full",
  square: "rounded-md",
};

const statusClasses = {
  online: "bg-green-500",
  offline: "bg-gray-500",
  busy: "bg-red-500",
};

const Avatar: React.FC<AvatarProps> = ({
  src = AVATAR_FEMALE,
  alt = "Avatar",
  size = "medium",
  shape = "circle",
  initials,
  border = false,
  status,
  name,
}) => {
  const calculateInitials = (name?: string) => {
    if (!name) return "";
    const [firstName, lastName] = name.split(" ");
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
  };

  const sizeValue = sizeClasses[size].split(" ")[0].replace("w-", "");

  return (
    <div className="relative w-max flex items-center justify-center">
      <div
        className={cn(
          "flex items-center justify-center bg-gray-200 text-gray-700",
          sizeClasses[size],
          shapeClasses[shape],
          border && "border-2 border-gray-300"
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={parseInt(sizeValue, 10) * 4}
            height={parseInt(sizeValue, 10) * 4}
            className={cn("object-cover h-full w-full", shapeClasses[shape])}
          />
        ) : (
          <span className="font-bold">
            {initials || calculateInitials(name)}
          </span>
        )}
      </div>
      {status && (
        <span
          aria-label={status}
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full",
            statusClasses[status]
          )}
        ></span>
      )}
    </div>
  );
};

export default Avatar;
