"use client";

import AccountSwitcher from "@/components/custom/AccountSwitcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logout, User } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type OnboardingHeaderType = {
  logout: () => void;
  activeRole: string;
};

export default function OnboardingHeader({
  logout,
  activeRole,
}: OnboardingHeaderType) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="py-4 container">
      <div className="flex justify-between  items-center py-5">
        <Link href={"/"}>
          <Image
            src={"/images/chaise-yellow.png"}
            alt="Chaise Logo"
            quality={100}
            height={80}
            width={180}
            className="h-6 w-auto object-cover"
          />
        </Link>

        <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
          <DropdownMenuTrigger>
            <User color="black" size={24} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-2 p-4 rounded-xl text-gray-900"
          >
            <div className="flex flex-col gap-4">
              <AccountSwitcher activeRole={activeRole} />

              <Button
                onClick={logout}
                className="bg-main-color-500 rounded-xl px-5 hover:bg-main-color-100 py-5 text-gray-900"
              >
                Logout <Logout size={16} color="black" />
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
