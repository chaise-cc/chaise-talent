"use client";

import AccountSwitcher from "@/components/custom/AccountSwitcher";
import Avatar from "@/components/icons/Avatar.icon";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { PiQuestionMark } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchBarComponent from "./SearchBar";
import { MdOpenInNew } from "react-icons/md";
import NotificationIcon from "@/components/icons/Notification.icon";
import { useNotifications } from "@/app/_providers/notification.provider";
import { ChevronDown, Heart } from "lucide-react";
// import LinkItem from "./MobileLinkItem";
import { DESKTOP_NAV_LINK_ITEMS } from "@/data/menuCategories";
// import { usePathname } from "next/navigation";

type HeaderProps = {
  user?: User | null;
  activeRole?: string;
};

export default function Header({ user, activeRole }: HeaderProps) {
  const [, setIsOpen] = useState(false);
  const { notifications } = useNotifications();
  // const currentPath = usePathname();

  return (
    <header className="my-4 hidden md:flex">
      <div className="container w-full">
        <div className="flex w-full rounded-full bg-gray-50 justify-between items-center gap-4 py-4 pl-6 pr-4 shadow-sm">
          {/* Logo and Navigation Links */}
          <div className="flex gap-8 items-center">
            <Link
              href="/"
              className="logo mr-4 flex items-center h-6 font-semibold"
            >
              <Image
                src="/images/chaise-yellow.png"
                alt="Chaise - The Future of Freelancing"
                height={32}
                width={82}
                loading="lazy"
                className="h-full object-cover"
              />
            </Link>

            {!user ? (
              <ul className="flex gap-8 items-center">
                {DESKTOP_NAV_LINK_ITEMS.map((item) => (
                  <Link
                    href={"/"}
                    key={item.text}
                    {...item}
                    // isActive={true}
                  />
                ))}
              </ul>
            ) : activeRole === "talent" ? (
              <div className="flex items-center gap-8 font-medium">
                <Link href="/dashboard/messages">Find Work</Link>
                <Link href="/dashboard/messages">Messages</Link>
              </div>
            ) : (
              <div className="flex items-center gap-8 font-medium">
                <Link href="#">Jobs</Link>
                <Link href="#">Talents</Link>
                <Link href="#">Messages</Link>
              </div>
            )}
          </div>

          {/* User Actions */}
          <nav className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <SearchBarComponent />

              {!user ? (
                <ul className="flex space-x-4 ml-5 shrink-0 items-center">
                  <li>
                    <Link href="/login" className="font-bold">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="bg-main-color-500 px-4 py-3 rounded-full text-main-color-900 font-semibold"
                    >
                      Join for Free
                    </Link>
                  </li>
                </ul>
              ) : (
                <div className="flex gap-6 items-center">
                  <PiQuestionMark size={24} className="text-4xl shrink-0" />

                  {activeRole === "client" && (
                    <Heart className="text-red-500" />
                  )}

                  <NotificationIcon unreadCount={notifications.length} />

                  <DropdownMenu onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger>
                      <div className="flex ml-2 items-center cursor-pointer">
                        <Avatar
                          src={user.avatar}
                          alt="User Avatar"
                          size="md"
                          shape="circle"
                          status="online"
                        />
                        <ChevronDown size={20} className="text-gray-600 ml-1" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="text-gray-900">
                      <div className="p-4 flex flex-col gap-4 items-center">
                        <div className="flex gap-4 items-center border-b pb-3 w-full">
                          <div className="img-container size-14 rounded-full overflow-hidden">
                            <Image
                              src={user.avatar}
                              width={96}
                              height={96}
                              alt={`${user.firstName} ${user.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="text-lg">
                              {user.firstName} {user.lastName}
                            </h2>
                            <div className="flex gap-4 items-center">
                              <Badge>{activeRole}</Badge>
                              <Link href="/dashboard">
                                <MdOpenInNew className="text-xl" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <AccountSwitcher activeRole={activeRole} />
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
