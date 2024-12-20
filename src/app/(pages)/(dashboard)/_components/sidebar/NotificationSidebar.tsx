"use client";

import { Plus } from "lucide-react";
import { useNotificationContext } from "../../_providers/NotificationProvider";
import { useRouter } from "next/navigation";
import { Notification } from "@/types/notification";

type NotificationSidebarType = {
  notifications: Notification[];
};

export default function NotificationSidebar({
  notifications,
}: NotificationSidebarType) {
  const { isSidebarOpen, toggleSidebar } = useNotificationContext(); // Assuming toggleSidebar handles the opening/closing state
  const router = useRouter();

  const handleNotificationClick = (link: string) => {
    toggleSidebar(); // Close the sidebar after clicking a notification
    router.push(link);
  };

  return (
    isSidebarOpen && (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition z-40"
          onClick={toggleSidebar} // Close the sidebar when clicking the overlay
        />

        {/* Sidebar */}
        <div className="fixed right-0 top-0 bottom-0 h-full w-80 bg-white shadow-lg z-50">
          <div className="p-4 border-b flex border-gray-200 justify-between gap-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button onClick={toggleSidebar}>
              <Plus className="rotate-45 text-red-500" />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-100px)]">
            <ul className="">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`p-4 border-b cursor-pointer ${
                    notif.read
                      ? "bg-main-color-200 hover:bg-main-color-100 transition border-main-color-300"
                      : "bg-main-color-50 hover:border-l-4 transition-all border-main-color-500  hover:bg-main-color-50 border-blue-400"
                  }`}
                  onClick={() => handleNotificationClick(notif.link)}
                >
                  <h3 className="text-sm font-medium">{notif.title}</h3>
                  <p className="text-xs text-main-color-900">{notif.message}</p>
                  <span className="text-xs text-main-color-700">
                    {notif.timestamp}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 transition hover:bg-gray-700 bg-black">
            <button
              className="w-full text-sm py-4 text-white rounded-md transition"
              onClick={() => {
                toggleSidebar(); // Close the sidebar
                router.push("/dashboard/notifications");
              }}
            >
              View All Notifications
            </button>
          </div>
        </div>
      </>
    )
  );
}
