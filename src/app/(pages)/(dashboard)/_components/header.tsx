"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Avatar from "@/components/icons/Avatar.icon";
import { useState } from "react";
import LevelRating from "@/components/icons/LevelRating.icon";

import NotificationIcon from "@/components/icons/Notification.icon";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { User, SearchNormal1, More } from "iconsax-react";
import Badge from "@/components/icons/Badge.icon";
import { AVATAR_FEMALE } from "@/data/mocks/default.mock";
import MessageIcon from "@/components/icons/Message.icon";
// import dataConstant from "@/constants/data.constant";

// interface HubHeaderProps {}

const HubHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-4 h-16 w-full sticky top-0 z-50 bg-gray-50 gap-4 flex items-center justify-between">
      <div className="flex justify-start w-full h-full gap-4 bgwhi md:gap-8 items-center">
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

      <div className="flex items-center shrink-0 gap-4 md:gap-8 justify-end">
        <div className="flex items-center gap-4 md:gap-8">
          <NotificationIcon unreadCount={4} />
          <MessageIcon badgeColor="bg-blue" unreadCount={4} />
        </div>

        <div className="flex gap-6 items-center">
          <div className="md:block hidden">
            <LevelRating level={2} rating={3} />
          </div>

          <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
            <DropdownMenuTrigger>
              <div className="flex items-center space-x-1  cursor-pointer">
                <Avatar
                  src={AVATAR_FEMALE}
                  alt="User Image"
                  size="md"
                  shape="circle"
                  status="online"
                />
                <More
                  size={24}
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-gray-900">
              <div className="flex flex-col relative md:p-8 md:w-[320px] p-4 w-full  gap-4 justify-center items-center">
                <div className="img-container h-24 w-24 rounded-full overflow-hidden">
                  <Image
                    src={AVATAR_FEMALE}
                    width={120}
                    height={120}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center items-center gap-1">
                  <h2 className="text-xl">Login User</h2>
                  <Badge variant={"secondary"}>Talent</Badge>
                </div>

                <div className="flex flex-col gap-8 md:mt-8 my-4 w-full items-start justify-start">
                  <Link
                    href={"/dashboard/settings"}
                    className="flex gap-2 items-center text-start justify-self-start justify-start w-full px-4"
                  >
                    <User size="18" variant="Outline" /> Profile Setting
                  </Link>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default HubHeader;
