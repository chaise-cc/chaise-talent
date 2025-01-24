"use client";

import React from "react";
import MainLayout from "../_components/mainLayout";

//
import { motion } from "framer-motion";
import SearchBoxHero from "../_components/HeroSearchBox";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const courseCategories = [
  {
    name: "Programming and Development",
    icon: "/images/icons/coding.png",
  },
  {
    name: "Data Science and Analytics",
    icon: "/images/icons/analysis.png",
  },
  {
    name: "Cloud Computing",
    icon: "/images/icons/server.png",
  },
  {
    name: "Cybersecurity",
    icon: "/images/icons/cybersecurity.png",
  },
  {
    name: "UX/UI Design",
    icon: "/images/icons/ux.png",
  },
  {
    name: "Artificial Intelligence and MAchine Learning",
    icon: "/images/icons/artificial-intelligence.png",
  },
  {
    name: "Blockchain and Web3",
    icon: "/images/icons/web.png",
  },
  {
    name: "IT Support and Administration",
    icon: "/images/icons/maintenance.png",
  },
];

export default function LearnPage() {
  return (
    <MainLayout>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="bg-gradient-to-b from-[#F7C164] to-[#B57300] text-white relative h-[calc(100vh-160px)] max-h-[600px] w-full container  mx-auto py-8 flex flex-col justify-center"
      >
        <div className="w-full flex flex-col justify-center items-center gap-4 max-w-4xl mx-auto">
          <h2 className="text-center text-3xl md:text-5xl font-medium">
            Explore More Than 5,000 Courses across Trusted Platforms
          </h2>

          <div className="w-full max-w-2xl">
            <SearchBoxHero />
          </div>

          <div className="flex flex-col gap-4">
            <p className="md:text-lg text-gray-300">Supported by:</p>
            <div className="flex gap-4 items-center"></div>
          </div>
        </div>
      </motion.section>

      {/*  */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="h-max mt-20 mb-8"
        id="chaise-pro"
      >
        <div className="container">
          <div className="flex flex-col gap-2 justify-center items-center text-center">
            <h2 className="text-2xl md:text-4xl font-medium">
              Explore by Categories
            </h2>
            <p className="md:text-base max-w-xl text-sm text-gray-500">
              Explore our wide range of courses designed for all interests and
              skill levels, and discover the ideal course to unleash your
              potential.
            </p>
          </div>

          <div className="grid gap-2 md:gap-8 md:px-12 grid-cols-2 md:grid-cols-4 py-8 ">
            {courseCategories.map((category, index) => (
              <div
                className="p-4 md:p-5 shadow-sm drop-shadow-sm bg-gray-50 rounded-sm flex justify-between flex-col gap-2 lg:gap-4"
                key={index}
              >
                <Image src={category.icon} alt="" width={32} height={32} />
                <h3 className="text-sm md:text-base font-medium line-clamp-2 text-ellipsis">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/*  */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="h-max mt-20 mb-8"
        id="chaise-pro"
      >
        <div className="container">
          <div className="flex flex-col gap-2 justify-center items-center text-center">
            <h2 className="text-2xl md:text-4xl font-medium">
              Trending Courses
            </h2>
            <p className="md:text-base max-w-2xl text-sm text-gray-500">
              Keep up with the latest trends through our top-rated courses,
              selected by learners from all corners of the globe. Acquire
              essential skills and become part of the community of thousands of
              students advancing their careers.
            </p>
          </div>

          <div className="grid gap-2 md:gap-8 grid-cols-2 md:grid-cols-4 py-8 ">
            {courseCategories.map((category, index) => (
              <div
                className="p-4 bg-gray-50 flex justify-between flex-col gap-2"
                key={index}
              >
                <Image src={category.icon} alt="" width={32} height={32} />
                <h3 className="text-sm font-medium line-clamp-2 text-ellipsis">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/*  */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="h-max mt-20 mb-8"
        id="chaise-pro"
      >
        <div className="container">
          <div
            style={{
              backgroundImage: `linear-gradient(to right, #FFA722, rgba(255,167,34,0)), url(/images/bg-learn.jpeg)`,
            }}
            className="rounded-tr-xl rounded-tl-xl md:p-20 p-8 px-4 bg-cover bg-left-top bg-no-repeat"
          >
            <div className="w-full flex flex-col justify-center md:justify-start text-center md:text-left gap-8">
              <h2 className="text-3xl md:max-w-lg  md:text-5xl font-medium text-white">
                Join Us and Unlock Your Full Potential.
              </h2>
              <p className="md:max-w-xl  text-white">
                Step into a world of limitless learning and growth. Whether
                you&apos;re starting your journey or leveling up your skills,
                our platform is built to empower you every step of the way.
              </p>
              <div className="text-white">
                <p>Expert-Led Courses</p>
                <p>Flexible Learning</p>
                <p>Hands-On Projects</p>
                <p>Certifications That Matter</p>
              </div>

              <Button className="rounded-full mx-auto md:mx-0 mt-4 font-bold inset-2 border bottom-2 w-max py-6 px-8 bg-white">
                Join for free
              </Button>
            </div>
          </div>
          <div className="bg-main-color-200 flex flex-col items-center md:flex-row gap-4 md:gap-8 text-gray-700 md:p-20 md:py-12 p-8 rounded-bl-xl rounded-br-xl">
            <div className="w-full md:max-w-md">
              <h2 className="text-3xl md:text-5xl mb-4 font-bold">
                Who Will You Learn With?
              </h2>
              <p className="text-sm md:text-base">
                Learn alongside industry leaders, expert instructors, and
                renowned global organizations. Together, we&apos;re shaping the
                future of innovation and learning.
              </p>
            </div>

            <div className="gap-8 flex flex-wrap items-center">
              <Image
                src={"/images/icons/coursera.png"}
                alt=""
                width={240}
                height={120}
                className="h-5 bg- w-auto object-contain"
              />
              <Image
                src={"/images/icons/udemy.png"}
                alt=""
                width={240}
                height={120}
                className="h-10 bg- w-auto object-contain"
              />
              <Image
                src={"/images/icons/edx.png"}
                alt=""
                width={240}
                height={120}
                className="h-10 bg- w-auto object-contain"
              />
              <Image
                src={"/images/icons/skillshare.png"}
                alt=""
                width={240}
                height={120}
                className="h-12 bg- w-auto object-contain"
              />
              <Image
                src={"/images/icons/moodle.png"}
                alt=""
                width={240}
                height={120}
                className="h-8 bg- w-auto object-contain"
              />
              <Image
                src={"/images/icons/khan_academy.png"}
                alt=""
                width={240}
                height={120}
                className="h-8 bg- w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </motion.section>
    </MainLayout>
  );
}
