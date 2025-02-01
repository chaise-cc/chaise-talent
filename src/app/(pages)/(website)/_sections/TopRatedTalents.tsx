"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Heart } from "iconsax-react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

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
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (!scrollAreaRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollAreaRef.current;
    // setCanScrollLeft(scrollLeft > 0);
    // setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
      // setTimeout(checkScrollPosition, 300); // Check position after scrolling
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });

      // setTimeout(checkScrollPosition, 300); // Check position after scrolling
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
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className="container pt-8 md:py-8 mt-12 md:mt-20"
    >
      <h2 className="md:text-[2.3rem] text-3xl md:mb-12 mb-6 font-varela text-center font-medium">
        Top Rated Talents
      </h2>
      <div className="w-full flex items-center">
        <ArrowLeft2
          size={50}
          color={!canScrollLeft ? "gray" : "black"}
          className={`text-gray-700 ${
            !canScrollLeft ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={canScrollLeft ? scrollLeft : undefined}
          aria-disabled={!canScrollLeft}
        />

        <ScrollArea className="pb-3">
          <div
            className="flex gap-8 w-full overflow-x-auto scroll-smooth"
            ref={scrollAreaRef}
          >
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

        <ArrowRight2
          size={50}
          color={!canScrollRight ? "gray" : "black"}
          className={`text-gray-700 ${
            !canScrollRight ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={canScrollRight ? scrollRight : undefined}
          aria-disabled={!canScrollRight}
        />
      </div>
    </motion.section>
  );
}
