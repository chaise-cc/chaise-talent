import Link from "next/link";
import React, { FC } from "react";
import { Message2 } from "iconsax-react";

interface MessageIconProps {
  unreadCount: number;
  iconSize?: number;
  badgeSize?: "small" | "medium" | "large";
  badgeColor?: string;
  iconColor?: string;
}

const badgeSizeClasses = {
  small: "h-3.5 w-3.5 text-[.6rem]",
  medium: "h-5 w-5 text-sm",
  large: "h-6 w-6 text-base",
};

const MessageIcon: FC<MessageIconProps> = ({
  unreadCount,
  iconSize = 24,
  badgeSize = "small",
  badgeColor = "bg-green-700",
  iconColor = "black",
}) => {
  return (
    <Link
      href={"/dashboard/messages"}
      className="relative inline-flex items-center"
    >
      <div
        className="icon bg-gray-100 rounded-full grid place-items-center"
        style={{ height: iconSize, width: iconSize }}
      >
        <Message2 color={iconColor} size={iconSize} aria-label="Messages" />
      </div>
      {unreadCount > 0 && (
        <div
          className={`absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white ${badgeSizeClasses[badgeSize]} ${badgeColor}`}
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </div>
      )}
    </Link>
  );
};

export default MessageIcon;
