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

type HeaderType = {
  user?: User | null;
  activeRole?: string;
};

export default function Header({ user, activeRole }: HeaderType) {
  const [, setIsOpen] = useState(false);
  const { notifications } = useNotifications();

  return (
    <header className="my-4 hidden md:flex">
      <div className="container w-full">
        <div className="flex w-full rounded-full bg-gray-50 justify-between items-center gap-4 py-4 pl-6 pr-4 shadow-sm ">
          <div className="flex gap-8 leading-none items-center">
            <Link
              shallow={true}
              href="/auth/login"
              className="logo flex mr-4 h-6 font-semibold items-center w-fit shrink-0"
            >
              <Image
                src="/images/chaise-yellow.png"
                alt="Chaise - The Future of Freelancing"
                height={32}
                width={82}
                loading="lazy"
                className={"h-full object-cover w-auto"}
              />
            </Link>

            {activeRole === "talent" ? (
              <div className="flex items-center gap-6 mt-1 font-medium">
                <Link
                  className="flex gap-1 items-center"
                  href={"/dashboard/messages"}
                >
                  Find works <ChevronDown size={18} />
                </Link>
                <Link href={"/dashboard/messages"}>Messages</Link>
              </div>
            ) : (
              <div className="flex items-center gap-6 mt-1 font-medium">
                <Link className="flex gap-1 items-center" href={"#"}>
                  Jobs <ChevronDown size={18} />
                </Link>
                <Link className="flex gap-1 items-center" href={"#"}>
                  Talents <ChevronDown size={18} />
                </Link>
                <Link href={"#"}>Messages</Link>
              </div>
            )}
          </div>

          <nav className="flex gap-4 items-center">
            <div className="flex gap-2 items-center ">
              <SearchBarComponent />

              {!user ? (
                <ul className="flex space-x-4 ml-5 md:space-x-6 shrink-0 items-center list-none">
                  <li className="shrink-0">
                    <Link
                      className="font-bold"
                      href="/auth/login"
                      data-view="login"
                    >
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/signup"
                      className="bg-main-color-500 px-4 md:px-5 py-3 md:py-4 !leading-none overflow-hidden flex items-center justify-center font-semibold rounded-full text-main-color-900"
                      data-view="signup"
                    >
                      Join for free
                    </Link>
                  </li>
                </ul>
              ) : (
                <div className="flex gap-6 items-center">
                  <PiQuestionMark size={24} className="!text-4xl shrink-0" />

                  {activeRole === "client" && <Heart />}

                  <NotificationIcon unreadCount={notifications.length} />

                  <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
                    <DropdownMenuTrigger>
                      <div className="flex ml-2 items-center space-x-1  cursor-pointer">
                        <Avatar
                          src={user.avatar}
                          alt="User Image"
                          size="md"
                          shape="circle"
                          status="online"
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="text-gray-900">
                      <div className="flex flex-col relative md:max-w-[300px] p-4 w-full gap-4 items-center">
                        <div className="flex gap-4 border-b pb-3">
                          <div className="img-container size-14 rounded-full overflow-hidden">
                            <Image
                              src={user.avatar}
                              width={96}
                              height={96}
                              quality={100}
                              priority={false}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex flex-col justify-center items-start">
                            <h2 className="md:text-lg">
                              {user.firstName} {user.lastName}
                            </h2>
                            <div className="flex gap-4 items-center">
                              <Badge>{activeRole}</Badge>
                              <Link href={"/dashboard"}>
                                <MdOpenInNew className="text-xl" />
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/*  */}
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
