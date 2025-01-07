"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Service, User } from "@/types";

import { DESKTOP_NAV_LINK_ITEMS } from "@/data/menuCategories";

import { useNotifications } from "@/app/_providers/notification.provider";

import AccountSwitcher from "@/components/custom/AccountSwitcher";
import Avatar from "@/components/icons/Avatar.icon";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import NotificationIcon from "@/components/icons/Notification.icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBarComponent from "./SearchBar";

import { ChevronDown, Heart } from "lucide-react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { MdOpenInNew } from "react-icons/md";

type HeaderProps = {
  user?: User | null;
  activeRole?: string;
  serviceCategories?: Service[];
};

export default function Header({
  user,
  activeRole,
  serviceCategories,
}: HeaderProps) {
  const [, setIsOpen] = useState(false);
  const { notifications } = useNotifications();
  const currentPath = usePathname();
  const [showCategories, setShowCategories] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const heroHeight = 600;

  useEffect(() => {
    if (currentPath === "/") {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > heroHeight) {
          setShowCategories(true);
        } else {
          setShowCategories(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [currentPath, heroHeight]);

  const checkScrollPosition = () => {
    if (!scrollAreaRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollAreaRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const scrollLeft = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 300); // Check position after scrolling
    }
  };

  const scrollRight = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 300); // Check position after scrolling
    }
  };

  useEffect(() => {
    const scrollContainer = scrollAreaRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition(); // Initial check

    return () =>
      scrollContainer.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <header
      className={`hidden z-50 fixed top-0 h-auto w-full bg-white md:flex flex-col 
       ${
         currentPath === "/" && !currentPath.includes("/blog")
           ? "pt-4"
           : "pt-4 pb-0"
       }
    `}
    >
      <div className="container w-full">
        <div className="flex w-full rounded-full h-[72px] bg-gray-100 border justify-between items-center gap-4 py-5 pl-6 pr-4">
          {/* Logo and Navigation Links */}
          <div className="flex gap-4 leading-none items-center">
            <Link
              href="/"
              className="logo mr-4 flex items-center h-6 p font-semibold"
            >
              <Image
                src="/images/chaise-yellow.png"
                alt="Chaise - The Future of Freelancing"
                height={32}
                width={82}
                loading="lazy"
                className="h-[95%] w-auto object-cover"
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
            <div className="flex gap-6 items-center">
              {showCategories && <SearchBarComponent />}

              {!user ? (
                <ul className="flex space-x-6 ml-5 shrink-0 items-center">
                  <li>
                    <Link href="/login" className="font-bold">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="bg-main-color-500 px-7 py-3 rounded-full text-main-color-900 font-[600]"
                    >
                      Join for free
                    </Link>
                  </li>
                </ul>
              ) : (
                <div className="flex gap-8 items-center">
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
                              alt={`${user.firstname} ${user.lastname}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="text-lg">
                              {user.firstname} {user.lastname}
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

      {(currentPath !== "/" && !currentPath.includes("/blog")) ||
      showCategories ? (
        <div className="navigate-categories relative w-full container flex gap-4 justify-between items-center">
          <ArrowLeft2
            color={!canScrollLeft ? "gray" : "black"}
            size="24"
            className={`text-gray-700 ${
              !canScrollLeft
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={canScrollLeft ? scrollLeft : undefined}
            aria-disabled={!canScrollLeft}
          />

          <ScrollArea className="w-full py-2" ref={scrollAreaRef}>
            <div className="w-full flex relative z-40 gap-4 md:gap-6 py-2 justify-center">
              {serviceCategories?.map((service, index) => (
                <Link
                  shallow={true}
                  key={index}
                  className="text-sm whitespace-nowrap"
                  href={`/services/${service.id}`}
                >
                  {service.name}
                </Link>
              ))}
            </div>

            <ScrollBar orientation="horizontal" className="-mb-1.5" />
          </ScrollArea>

          <ArrowRight2
            size="24"
            color={!canScrollRight ? "gray" : "black"}
            className={`text-gray-700 ${
              !canScrollRight
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={canScrollRight ? scrollRight : undefined}
            aria-disabled={!canScrollRight}
          />
        </div>
      ) : null}
    </header>
  );
}
