"use client";

import { useContext } from "react";
import Link from "next/link";
import { MOBILE_NAV_LINK_ITEMS } from "@/data/menuCategories";
import { User } from "@/types";
import LinkItem from "./MobileLinkItem";
import { SideBarContext } from "@/app/_providers/sidebar.provider";
import { Add } from "iconsax-react";
// import { SideBarContext } from "./SideBarProvider";

type SideBarWebsiteMobileProps = {
  user?: User | undefined | null;
};

const SideBarWebsiteMobile = ({ user }: SideBarWebsiteMobileProps) => {
  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error(
      "SideBarWebsiteMobile must be used within a SideBarProvider"
    );
  }

  const { showSideBar, toggleSideBar } = context;

  return (
    <>
      {showSideBar && (
        <nav className="side-bar-container pt-16 max-w-sm fixed inset-0 z-20 bg-gray-50 flex flex-col justify-between shadow-md border-gray-300 lg:hidden">
          <Add
            size={32}
            color="red"
            className="absolute rotate-45 top-4 right-4"
          />
          <div className="flex flex-col p-4">
            {MOBILE_NAV_LINK_ITEMS.map((item) => (
              <LinkItem
                key={item.text}
                text={item.text}
                href={item.href}
                isLast={item.isLast}
              >
                {item.children?.map((child) => (
                  <li key={child.text} className="py-2 w-full">
                    <Link
                      onClick={toggleSideBar}
                      className="w-full text-gray-500 hover:text-gray-700"
                      href={child.href}
                    >
                      {child.text}
                    </Link>
                  </li>
                ))}
              </LinkItem>
            ))}
          </div>

          <div className="p-4">
            {user ? (
              <Link
                href="/dashboard"
                onClick={toggleSideBar}
                className="shadow-xl bg-main-color-500 text-black  py-4 flex items-center justify-center rounded-full font-bold"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/signup"
                onClick={toggleSideBar}
                className="shadow-xl bg-main-color-500 text-black font-bold py-4 flex items-center justify-center rounded-full"
              >
                Sign in
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default SideBarWebsiteMobile;
