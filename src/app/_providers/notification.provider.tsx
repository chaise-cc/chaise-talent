"use client";

import { Notification, NotificationContextType } from "@/types/notification";
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Message",
      message: "You have a message from Jane.",
      timestamp: "2 mins ago",
      read: false,
      link: "/dashboard/messages/123",
    },
    {
      id: 2,
      title: "System Update",
      message: "System update completed.",
      timestamp: "1 hour ago",
      read: true,
      link: "/dashboard/system-updates",
    },
    {
      id: 3,
      title: "Reminder",
      message: "Team meeting tomorrow.",
      timestamp: "3 hours ago",
      read: false,
      link: "/dashboard/calendar/events/456",
    },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        markAsRead,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
