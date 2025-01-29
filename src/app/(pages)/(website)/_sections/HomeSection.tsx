"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Add } from "iconsax-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBoxHero from "../_components/HeroSearchBox";
// import SearchBoxHero from "../SearchBox.hero";

const HeroSection = () => {
  const images = [
    "/images/hero-testimonials/1.png",
    "/images/hero-testimonials/2.png",
    "/images/hero-testimonials/3.png",
    "/images/hero-testimonials/4.png",
  ];

  const [imageOneIndex, setImageOneIndex] = useState(0);
  const [imageTwoIndex, setImageTwoIndex] = useState(1);
  const [imageThreeIndex, setImageThreeIndex] = useState(2);
  const [imageFourIndex, setImageFourIndex] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageOneIndex((prevIndex) =>
        prevIndex == images.length - 1 ? 0 : prevIndex + 1
      );
      setImageTwoIndex((prevIndex) =>
        prevIndex == images.length - 1 ? 0 : prevIndex + 1
      );
      setImageThreeIndex((prevIndex) =>
        prevIndex == images.length - 1 ? 0 : prevIndex + 1
      );
      setImageFourIndex((prevIndex) =>
        prevIndex == images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className="bg-white relative h-[calc(100vh-160px)] max-h-[600px] w-full container  mx-auto py-8 flex flex-col justify-center"
    >
      {/*  */}
      <div className="absolute left-0 top-0 hidden container justify-between md:flex w-full h-full z-10 flex-col">
        <div className="flex w-full justify-between">
          <div className="h-28 w-40 flex justify-start relative">
            <AnimatePresence>
              <motion.img
                key={images[imageOneIndex]}
                src={images[imageOneIndex]}
                alt="Hero testimonial 1"
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
              />
            </AnimatePresence>
          </div>

          <div className="h-28 w-40 relative">
            <AnimatePresence>
              <motion.img
                key={images[imageTwoIndex]}
                src={images[imageTwoIndex]}
                alt="Hero testimonial 2"
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="flex w-full justify-between">
          <div className="h-28 w-40 relative">
            <AnimatePresence>
              <motion.img
                key={images[imageThreeIndex]}
                src={images[imageThreeIndex]}
                alt="Hero testimonial 2"
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
              />
            </AnimatePresence>
          </div>

          <div className="h-28 w-40 relative">
            <AnimatePresence>
              <motion.img
                key={images[imageFourIndex]}
                src={images[imageFourIndex]}
                alt="Hero testimonial 2"
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
              />
            </AnimatePresence>
            {/* <Image
              src={images[imageFourIndex]}
              quality={100}
              alt="Hero testimonial 1"
              fill
              className="h-full w-full object-contain"
            /> */}
          </div>
        </div>
      </div>

      {/*  */}
      <div className="relative z-20 mx-auto max-w-4xl w-full flex flex-col justify-center items-center gap-4 md:gap-5">
        <div className="text-center flex flex-col gap-4">
          <h2
            className="xl:text-7xl font-varela md:text-6xl text-4xl"
            style={{ lineHeight: 1.2 }}
          >
            Work with&nbsp;
            <span className="relative text-main-color-500">
              Africa&apos;s&nbsp;
              <div className="hidden md:block absolute right-9 top-[80%]">
                <Image
                  height={80}
                  width={200}
                  className=""
                  src="/images/vector-underline.png"
                  alt=""
                />
              </div>
            </span>
            <br />
            Top Talents
          </h2>
          <div className="flex mx-auto text-gray-700 max-w-sm px-4 md:max-w-3xl sora-regular md:text-lg flex-col justify-center items-center">
            <p className="md:text-lg text-base">
              You&apos;re a few steps away from the best talents and
              opportunities Africa has to offer.
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
          <div className="flex -space-x-2">
            <div className="h-8 md:h-10 w-8 md:w-10 overflow-hidden shadow-sm border border-gray-300 rounded-full bg-gray-300">
              <Image
                height={40}
                loading={"lazy"}
                width={40}
                src={"https://mighty.tools/mockmind-api/content/human/44.jpg"}
                alt={"Avatar 1"}
              />
            </div>
            <div className="h-8 md:h-10 w-8 md:w-10 overflow-hidden shadow-sm border border-gray-300 rounded-full bg-gray-400">
              <Image
                height={40}
                loading={"lazy"}
                width={40}
                src={"https://mighty.tools/mockmind-api/content/human/24.jpg"}
                alt={"Avatar 2"}
              />
            </div>
            <div className="h-8 md:h-10 w-8 md:w-10 overflow-hidden shadow-sm border border-gray-300 rounded-full bg-gray-500">
              <Image
                height={40}
                loading={"lazy"}
                width={40}
                src={"https://mighty.tools/mockmind-api/content/human/42.jpg"}
                alt={"Avatar 3"}
              />
            </div>
            <div className="h-8 md:h-10 w-8 md:w-10 overflow-hidden shadow-sm border border-gray-300 rounded-full bg-gray-600">
              <Image
                height={40}
                loading={"lazy"}
                width={40}
                src={"https://mighty.tools/mockmind-api/content/human/20.jpg"}
                alt={"Avatar 4"}
              />
            </div>
            <Link
              href={"/get-started"}
              className="h-8 md:h-10 w-8 md:w-10 overflow-hidden rounded-full border border-main-color-500 shadow-sm bg-main-color-500 grid place-items-center"
            >
              <Add className="text-lg md:text-xl" color="black" size={24} />
            </Link>
          </div>

          <p className="text-sm md:text-base">Join 20k + others</p>
        </div>

        <div className="w-full max-w-xl">
          <SearchBoxHero />
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
