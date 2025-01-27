"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Heart } from "iconsax-react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Talent = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  avatar: string;
  country: string;
};

type TopRatedTalentsSectionProps = {
  talents: Talent[];
};

export default function TopRatedTalentsSection({
  talents,
}: TopRatedTalentsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className="container pt-8 md:py-8 mt-12 md:mt-20"
    >
      <h2 className="md:text-[2.3rem] text-3xl md:mb-12 mb-6 font-varela text-center font-medium">
        Top Rated Talents
      </h2>

      <ScrollArea className="pb-3">
        <div className="flex gap-8 w-full">
          {talents.map((talent) => (
            <div
              key={talent.id}
              className="TopTalentCard w-48 md:w-60 relative flex flex-col gap-2"
            >
              <Heart
                size={24}
                className="absolute z-50 top-4 right-4"
                color="white"
              />

              <div className="md:h-60 h-44 w-full rounded-lg overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  quality={100}
                  src={talent.avatar}
                  alt={`${talent.firstname} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center md:gap-2">
                <div className="flex text-gray-700 flex-shrink-0">
                  <h2 className="font-semibold text-ellipsis text-sm md:text-base">
                    {talent.firstname} {talent.lastname}
                  </h2>
                </div>

                <div className="flex gap-1 items-center capitalize md:text-sm text-xs">
                  <MapPin color="gray" size={16} /> {talent.country}
                </div>
              </div>

              {talent.username && (
                <Link
                  className=" text-main-color-500 text-sm md:text-base -mt-1 md:mt-0 underline flex"
                  href={`/~/${talent.username}`}
                >
                  View profile
                </Link>
              )}
            </div>
          ))}
        </div>

        <ScrollBar orientation="horizontal" className="-mb-1.5 " />
      </ScrollArea>
    </motion.section>
  );
}
