"use client";

import { useState, type FC } from "react";
import { usePathname } from "next/navigation";

// Icons
import {
  Chart1,
  DollarCircle,
  Edit2,
  FolderOpen,
  Home,
  LogoutCurve,
  MessageQuestion,
  MonitorMobbile,
  Setting,
} from "iconsax-react";
import Image from "next/image";
import TransitionLink from "@/components/custom/TransitionLink";

interface DesktopDashboardSideBarProps {
  baseUrl?: string;
}

const DesktopSideBar: FC<DesktopDashboardSideBarProps> = ({
  baseUrl = "/dashboard",
}) => {
  const size = 18;
  const color = "black";

  const MenuItems = [
    {
      icon: <Home size={size} color={color} />,
      label: "Dashboard",
      link: "",
    },
    {
      icon: <Edit2 size={size} color={color} />,
      label: "Services",
      link: "/services",
    },
    {
      icon: <MonitorMobbile size={size} color={color} />,
      label: "Find Works",
      link: "/works",
    },
    {
      icon: <FolderOpen size={size} color={color} />,
      label: "Projects",
      link: "/projects",
    },
    {
      icon: <DollarCircle size={size} color={color} />,
      label: "Earnings",
      link: "/revenue",
    },
    {
      icon: <Chart1 size={size} color={color} />,
      label: "Analytics",
      link: "/analytics",
    },

    {
      icon: <Setting size={size} color={color} />,
      label: "Settings",
      link: "/settings",
    },
    {
      icon: <MessageQuestion size={size} color={color} />,
      label: "Help",
      link: "/help",
    },
    {
      icon: <LogoutCurve size={size} color={color} />,
      label: "Log out",
      // action: handleLogout(),
      link: "/",
    },
  ];

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const currentPath = usePathname();

  const isActive = (path: string) =>
    currentPath === `${baseUrl}${path}` ? "active" : "";

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <>
      <aside
        className={`fixed h-screen z-50 top-0 bg-gray-50 overflow-y-auto ${
          isMobileOpen ? "w-60" : "w-16"
        } md:w-60 shrink-0 hidden md:flex h-screen flex-col duration-300 transition-all`}
      >
        <Image
          height={80}
          width={200}
          className="h-5 px-4 my-[22px] w-max mx-auto object-contain"
          alt="Chaise Logo"
          src={"/images/chaise-yellow.png"}
        />
        <div
          className={`pb-4
          `}
        >
          <ul className={`flex flex-col gap-2`}>
            {MenuItems.slice(0, -3).map((item) => (
              <li key={item.label}>
                <TransitionLink
                  shallow={true}
                  className={`flex justify-start px-4 items-center gap-4 transition-all hover:border-main-color-300 hover:text-main-color-700 hover:bg-main-color-100 hover:border-r-4
                   ${isActive(item.link)}`}
                  href={`${baseUrl}${item.link}`}
                >
                  <div className="icon">{item.icon}</div>
                  <span>{item.label}</span>
                </TransitionLink>
              </li>
            ))}
          </ul>
          <div className="mt-20">
            <ul className="flex flex-col gap-1">
              {MenuItems.slice(-3).map((item) => (
                <li key={item.label}>
                  {item.label === "Log out" ? (
                    <div
                      className={`flex text-sm w-full items-center justify-center md:justify-start transition-all px-4 py-2.5 hover:border-main-color-300 hover:text-main-color-700 hover:bg-main-color-100 hover:border-r-4 gap-4`}
                      //   onClick={handleLogout}
                    >
                      <div className="icon text-black ">{item.icon}</div>
                      <span>{item.label}</span>
                    </div>
                  ) : (
                    <TransitionLink
                      shallow={true}
                      className={`flex justify-start px-4 py-2.5 items-center gap-4 transition-all hover:border-main-color-300 hover:text-main-color-700 hover:bg-main-color-100 hover:border-r-4 ${isActive(
                        item.link
                      )}`}
                      href={`${baseUrl}${item.link}`}
                    >
                      <div className="icon">{item.icon}</div>
                      <span>{item.label}</span>
                    </TransitionLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}
    </>
  );
};

export default DesktopSideBar;
