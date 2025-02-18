"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { AVATAR_FEMALE } from "@/data/mocks/default.mock";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Avatar from "@/components/icons/Avatar.icon";
import LevelRating from "@/components/icons/LevelRating.icon";

import NotificationIcon from "@/components/icons/Notification.icon";
import { Input } from "@/components/ui/input";
import MessageIcon from "@/components/icons/Message.icon";

import { User as Usss, SearchNormal1 } from "iconsax-react";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import AccountSwitcher from "@/components/custom/AccountSwitcher";
import { ChevronDown } from "lucide-react";
import { useNotifications } from "@/app/_providers/notification.provider";

type TalentDashboardHeader = {
  user: User;
  activeRole: string;
};

const TalentDashboardHeader = ({ user, activeRole }: TalentDashboardHeader) => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications } = useNotifications();

  return (
    <header className="px-4 h-16 w-full sticky top-0 z-50 bg-gray-50 gap-4 flex items-center justify-between">
      <div className="flex justify-start w-full h-full gap-4z md:gap-8 items-center">
        <div className="relative bg-white overflow-hidden bo rounded-md w-full max-w-sm">
          <div className="icon absolute left-3 top-[50%] translate-y-[-50%]">
            <SearchNormal1 size={16} color="black" />
          </div>
          <Input
            type="search"
            placeholder="What are you looking for?"
            className="w-full pl-10 py-4 text-sm placeholder:text-sm"
          />
        </div>
      </div>

      <div className="hidden md:flex">
        <AccountSwitcher activeRole={activeRole} />
      </div>

      <div className="flex items-center shrink-0 gap-4 ml-4 md:gap-8 justify-end">
        <div className="flex items-center gap-4 md:gap-8">
          <NotificationIcon unreadCount={notifications.length} />
          <MessageIcon badgeColor="bg-blue" unreadCount={4} />
        </div>

        <div className="flex gap-6 items-center">
          <div className="md:block hidden font-semibold">
            <LevelRating level={1} />
          </div>

          <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
            <DropdownMenuTrigger>
              <div className="flex items-center space-x-1  cursor-pointer">
                <Avatar
                  src={user.avatar ? user.avatar : AVATAR_FEMALE}
                  alt="User Image"
                  size="md"
                  shape="circle"
                  status="online"
                />
                <ChevronDown
                  size={20}
                  color="black"
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-gray-900">
              <div className="flex flex-col relative md:max-w-[300px] p-4 w-full gap-4 justify-center items-center">
                <div className="img-container shadow-sm size-20 md:size-24 rounded-full overflow-hidden">
                  <Image
                    src={user.avatar ? user.avatar : AVATAR_FEMALE}
                    width={120}
                    height={120}
                    quality={100}
                    alt=""
                    className="w-full h-full object-cover "
                  />
                </div>

                <div className="flex flex-col justify-center items-center gap-1">
                  <h2 className="text-lg">
                    {user.firstname} {user.lastname}
                  </h2>
                  <Badge>{activeRole}</Badge>
                </div>

                <div className="flex flex-col gap-8 my-2 w-full items-start justify-start">
                  <Link
                    href={"/dashboard/settings"}
                    className="flex gap-2 items-center text-start justify-self-start justify-start w-full px-4"
                  >
                    <Usss size="14" color="black" variant="Outline" /> Profile
                    Setting
                  </Link>
                </div>

                <div className="md:hidden flex">
                  <AccountSwitcher activeRole={activeRole} />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TalentDashboardHeader;
