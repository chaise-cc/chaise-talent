"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NotificationBing } from "iconsax-react";
import { useNotifications } from "@/app/_providers/notification.provider";

// type NotificationSidebarType = {
//   notifications: Notification[];
// };

export default function NotificationSidebar() {
  const { notifications, isSidebarOpen, toggleSidebar } = useNotifications();
  const router = useRouter();

  const handleNotificationClick = (link: string) => {
    toggleSidebar(); // Close the sidebar after clicking a notification
    router.push(link);
  };

  return (
    <>
      {/* Overlay with Fade-In/Out Animation */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar with Slide-In/Out Animation */}
      <div
        className={`fixed right-0 top-0 bottom-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b flex border-gray-200 justify-between gap-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={toggleSidebar}>
            <Plus className="rotate-45 text-red-500" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100vh-100px)]">
          {notifications.length > 0 ? (
            <ul className="">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`p-4 border-b cursor-pointer ${
                    notif.read
                      ? "bg-main-color-200 hover:bg-main-color-100 transition border-main-color-300"
                      : "bg-main-color-50 hover:border-l-4 transition-all border-main-color-500  hover:bg-main-color-50"
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
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 transition hover:bg-gray-700 bg-black">
          <Link
            href={"/dashboard/notifications"}
            className="w-full flex items-center text-center justify-center font-medium gap-2 text-sm py-4 text-gray-100 rounded-md transition"
            onClick={() => {
              toggleSidebar(); // Close the sidebar
            }}
          >
            <NotificationBing
              className="animate-bounce"
              size={15}
              color="white"
            />
            View All Notifications
          </Link>
        </div>
      </div>
    </>
  );
}
