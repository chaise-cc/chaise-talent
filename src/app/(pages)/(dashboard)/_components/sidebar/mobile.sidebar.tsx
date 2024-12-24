"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { TbDeviceProjector } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";

const iconSize = 21;

const links = [
  {
    name: "Home",
    link: "/dashboard",
    icon: <FaHome size={iconSize} />,
  },
  {
    name: "Messages",
    link: "/dashboard/messages",
    icon: <HiOutlineChatBubbleLeft size={iconSize} />,
  },
  {
    name: "Find work",
    link: "/dashboard/works",
    icon: <TbDeviceProjector size={iconSize} />,
  },
  {
    name: "Services",
    link: "/dashboard/services",
    icon: <PiPencilSimpleLineThin size={iconSize} />,
  },
  {
    name: "Settings",
    link: "/dashboard/settings",
    icon: <Settings size={iconSize} />,
  },
];

const MobileNavbarDashboard = () => {
  const currentPath = usePathname();

  const isActive = (path: string) => (currentPath === path ? "active" : "");

  return (
    <nav className="mobile-nav flex gap-4 justify-between sm:hidden bg-main-color-50 bg-blend-lighten 1 fixed bottom-0 left-0 px-4 h-16 items-center z-50 drop-shadow-lg w-full">
      {links.map(({ name, link, icon }, index) => (
        <Link
          key={index}
          href={link}
          className={`flex pt-1.5 pb-3 justify-center items-center flex-col gap-1.5 ${isActive(
            link
          )}`}
        >
          {icon}
          <small className="text-xs">{name}</small>
        </Link>
      ))}
    </nav>
  );
};

export default MobileNavbarDashboard;
