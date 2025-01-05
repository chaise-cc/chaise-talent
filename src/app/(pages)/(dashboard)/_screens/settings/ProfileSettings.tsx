import React from "react";
import Link from "next/link";

import { User } from "@/types";

import Avatar from "@/components/icons/Avatar.icon";
import { Button } from "@/components/ui/button";

import { EditIcon, EyeIcon, MapPinIcon } from "lucide-react";
import { RxDownload } from "react-icons/rx";

type ProfileSettingsProps = {
  user: User;
};

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  return (
    <>
      {/*  */}
      <div className="bg-gray-100 rounded-xl w-full h-48 md:h-52 mb-4">
        <div className="w-full  h-full flex flex-col gap-2 justify-center items-center text-center">
          <div className="IconContainer grid place-items-center size-12 md:size-14 mt-2 bg-white rounded-full border border-gray-50s">
            <RxDownload size={24} />
          </div>
          <h3 className="text-xl md:text-2xl font-medium leading-none">
            Add banner Image
          </h3>
          <p className="leading-none md:text-base text-sm">
            Optimal dimension 3200 x 410
          </p>
        </div>
      </div>

      {/*  */}
      <div className="flex flex-col md:flex-row gap-x-4">
        {/* Small side */}
        <div className="w-full md:max-w-xs py-4 md:border rounded-xl divide-y">
          <div className="flex flex-col gap-3 md:px-4 items-center">
            <Avatar
              src={user.avatar}
              alt="User Image"
              size="extra-large"
              shape="circle"
            />

            <div className="flex gap-2 items-center">
              <h2 className="text-xl">
                {user.firstname} {user.lastname}
              </h2>
              <EditIcon size={16} />
            </div>

            {/*  */}
            <p className="flex gap-1 items-center capitalize text-sm">
              <MapPinIcon size={16} className="-mt-0.5" /> {user.country}
            </p>

            {/*  */}
            <div className="flex w-full justify-center items-center flex-col gap-1 mb-6">
              <Button
                asChild
                variant={"outline"}
                className="text-sm md:text-base rounded-full flex gap-2.5 items-center w-fmax text-main-color-600 !border-transparent "
              >
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/~/${user.username}`}
                  target="_blank"
                >
                  <EyeIcon size={18} /> Preview my Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
