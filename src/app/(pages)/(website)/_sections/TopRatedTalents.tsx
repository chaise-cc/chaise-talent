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
      className="container py-8 my-12 md:my-24"
    >
      <h2 className="text-[2.3rem] md:mb-8 mb-4 font-varela text-center font-medium">
        Top Rated Freelancers
      </h2>

      <ScrollArea>
        <div className="flex gap-8 w-full">
          {talents.map((talent) => (
            <div
              key={talent.id}
              className="TopTalentCard w-60 relative flex flex-col gap-2"
            >
              <Heart
                size={24}
                className="absolute z-50 top-4 right-4"
                color="white"
              />

              <div className="h-60 w-full rounded-lg overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  quality={100}
                  src={talent.avatar}
                  alt={`${talent.firstname} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="flex text-gray-700 flex-shrink-0">
                  <h2 className="font-semibold text-ellipsis">
                    {talent.firstname} {talent.lastname}
                  </h2>
                </div>

                <div className="flex gap-1 items-center capitalize text-sm">
                  <MapPin color="gray" size={16} /> {talent.country}
                </div>
              </div>

              {talent.username && (
                <Link
                  className="text-xs text-main-color-500 underline flex -mt-1"
                  href={`/~/${talent.username}`}
                >
                  View profile
                </Link>
              )}
            </div>
          ))}
        </div>

        <ScrollBar />
      </ScrollArea>
    </motion.section>
  );
}
