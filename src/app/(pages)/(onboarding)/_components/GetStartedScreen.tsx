/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { FC } from "react";

import { LuFolderHeart } from "react-icons/lu";
import { LiaUserEditSolid } from "react-icons/lia";
import { CiBadgeDollar } from "react-icons/ci";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { ArrowRight } from "iconsax-react";

interface GetStartedScreenProps {}

const GetStartedScreen: FC<GetStartedScreenProps> = () => {
  return (
    <div className="container py-4 pb-12 flex gap-8 items-center">
      <div className="flex flex-col w-full gap-4 md:gap-6">
        <div className="flex flex-col gap-4 md:gap-6">
          <h1 className="text-2xl md:text-3xl xl:text-4xl tracking-tight">
            Hey, ready for your big opportunity on Chaise? <br /> Here&apos;s
            what to look forward to:
          </h1>

          <p className="!text-sm md:!text-base">
            It takes 5-10 minutes and you can edit later. We&apos;ll save as you
            go.
          </p>
        </div>

        {/* TODOS */}
        <div className="flex flex-col gap-4 !text-sm md:!text-base max-w-2xl">
          <div className="flex gap-2 items-start py-4 md:py-6 border-b">
            <div className="icon h-10 w-10 grid place-items-start">
              <LiaUserEditSolid size={24} />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">Create your Profile</h2>
              <p className="pb-0">
                Answer a few questions and start building your profile
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-start py-4 md:py-6 border-b">
            <div className="icon h-10 w-10 grid place-items-start">
              <LuFolderHeart size={24} />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">Apply or list your services</h2>
              <p className="pb-0">
                Apply for open roles or list services for clients to buy
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-start py-4 md:py-6 border-b">
            <div className="icon h-10 w-10 grid place-items-start">
              <CiBadgeDollar size={24} />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">Get paid</h2>
              <p className="pb-0">
                Get paid safely and know we&apos;re there to help
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Link
            href={"/onboarding/talent/personal-info"}
            className="px-6 py-3 flex gap-3 items-center leading-none font-bold  bg-black text-white rounded-full"
          >
            Get Started <ArrowRight size={20} color="white" />
          </Link>
          <Link
            href={"/talent-onboarding/personal-info"}
            className="text-main-color-500 leading-none font-bold flex items-center gap-2"
          >
            What not to do <HelpCircle size={17} />
          </Link>
        </div>
      </div>

      <div className="w-[400px] hidden h-[430px] md:flex shrink-0 pl-8 rounded-xl bg-gray-50 border border-gray-300"></div>
    </div>
  );
};
export default GetStartedScreen;
