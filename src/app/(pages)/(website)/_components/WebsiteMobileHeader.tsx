"use client";

import { SideBarContext } from "@/app/_providers/sidebar.provider";
import { User } from "@/types";
import { Add, HambergerMenu } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

type WebsiteMobileHeaderProps = {
  user?: User | undefined | null;
};

export default function WebsiteMobileHeader({
  user,
}: WebsiteMobileHeaderProps) {
  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error("SideBarConsumer must be used within a SideBarProvider");
  }

  const { showSideBar, toggleSideBar } = context;

  return (
    <header className="sm:hidden py-2 px-2 sticky top-0 z-50">
      <div className="flex justify-between border items-center p-2 px-4  bg-gray-50 rounded-full container">
        <div
          className="menu-toggler cursor-pointer rounded-full"
          onClick={toggleSideBar}
        >
          {showSideBar ? (
            <Add
              className="rotate-45 text-gray-900"
              size="28"
              variant="Outline"
              color="black"
            />
          ) : (
            <HambergerMenu
              size="24"
              className="text-gray-900 "
              variant="Outline"
              color="black"
            />
          )}
        </div>

        <Link href="/" className="logo w-fit shrink-0">
          <Image
            src="/images/chaise-yellow.png"
            alt="Chaise - The Future of Freelancing"
            height={32}
            width={82}
            priority
            className={"h-5 w-auto object-cover"}
          />
        </Link>

        {user ? (
          <Link
            className="bg-transparent text-sm border border-main-color-500 px-4 py-2 rounded-full font-bold text-main-color-900"
            href="/dashboard"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            className="bg-main-color-500 border border-main-color-500 px-4 text-sm py-2 rounded-full font-semibold text-main-color-900"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
