"use client";

import React, { FC } from "react";
import { Notification } from "iconsax-react";
import { useNotifications } from "@/app/_providers/notification.provider";
//
interface NotificationIconProps {
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

const NotificationIcon: FC<NotificationIconProps> = ({
  unreadCount,
  iconSize = 24,
  badgeSize = "small",
  badgeColor = "bg-green-700",
  iconColor = "black",
}) => {
  const { toggleSidebar } = useNotifications();

  return (
    <div
      className="relative cursor-pointer hover:opacity-75  transition inline-flex items-center"
      onClick={toggleSidebar}
      aria-label="Open Notifications"
    >
      <div
        className="icon bg-gray-100 rounded-full grid place-items-center"
        style={{ height: iconSize, width: iconSize }}
      >
        <Notification
          color={iconColor}
          size={iconSize}
          aria-label="Notifications"
          className="hover:scale-95 transition"
        />
      </div>
      {unreadCount > 0 && (
        <div
          className={`absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white ${badgeSizeClasses[badgeSize]} ${badgeColor}`}
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
