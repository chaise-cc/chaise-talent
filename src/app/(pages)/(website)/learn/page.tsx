"use client";

import React from "react";
import MainLayout from "../_components/mainLayout";

import { motion } from "framer-motion";
import SearchBoxHero from "../_components/HeroSearchBox";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import formatCurrency from "@/app/helpers/currencyFormatter";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";

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
    name: "Artificial Intelligence and Machine Learning",
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

const courses = [
  {
    thumbnail: "/images/thumbnails/courses/course-1.png",
    platform: { name: "coursera", icon: "/images/icons/udemy.png" },
    name: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2025",
    instructor: {
      name: "Andrew Brown",
      profession: "Developer and Lead Instructor",
    },
    rating: 3.9,
    students: 231869,
    price: { currency: "USD", amount: 19.99 },
  },
  {
    thumbnail: "/images/thumbnails/courses/course-2.png",
    platform: { name: "coursera", icon: "/images/icons/coursera.png" },
    name: "100 Days of Code: The Complete Python Pro Bootcamp",
    instructor: {
      name: "Dr. Angela Yu",
      profession: "Developer and Lead Instructor",
    },
    rating: 3.9,
    students: 231869,
    price: { currency: "NGN", amount: 48950 },
  },
  {
    thumbnail: "/images/thumbnails/courses/course-1.png",
    platform: { name: "coursera", icon: "/images/icons/udemy.png" },
    name: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2025",
    instructor: {
      name: "Andrew Brown",
      profession: "Developer and Lead Instructor",
    },
    rating: 3.9,
    students: 231869,
    price: { currency: "USD", amount: 198.99 },
  },
  {
    thumbnail: "/images/thumbnails/courses/course-2.png",
    platform: { name: "coursera", icon: "/images/icons/coursera.png" },
    name: "100 Days of Code: The Complete Python Pro Bootcamp",
    instructor: {
      name: "Dr. Angela Yu",
      profession: "Developer and Lead Instructor",
    },
    rating: 3.9,
    students: 231869,
    price: { currency: "NGN", amount: 18900 },
  },
  {
    thumbnail: "/images/thumbnails/courses/course-1.png",
    platform: { name: "coursera", icon: "/images/icons/udemy.png" },
    name: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2025",
    instructor: {
      name: "Andrew Brown",
      profession: "Developer and Lead Instructor",
    },
    rating: 3.9,
    students: 231869,
    price: { currency: "USD", amount: 19.0 },
  },
  {
    thumbnail: "/images/thumbnails/courses/course-2.png",
    platform: { name: "coursera", icon: "/images/icons/coursera.png" },
    name: "100 Days of Code: The Complete Python Pro Bootcamp",
    instructor: {
      name: "Dr. Angela Yu",
      profession: "Developer and Lead Instructor",
    },
    rating: 3.9,
    students: 231869,
    price: { currency: "NGN", amount: 48950 },
  },
];

export default function LearnPage() {
  return (
    <MainLayout>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="bg-gradient-to-b from-[#F7C164] to-[#B57300] text-white relative h-[calc(100vh-160px)] max-h-[600px] w-full container mx-auto py-8 flex flex-col justify-center"
      >
        <div className="w-full flex flex-col justify-center items-center gap-4 md:gap-8 max-w-4xl mx-auto">
          <div className="flex gap-0.5 items-center">
            <Image
              src={"/images/chaise-white.png"}
              alt=""
              height={48}
              width={80}
              quality={100}
              className="h-8 w-max object-contain"
            />
            <span className="text-2xl font-varela">Learn</span>
          </div>

          <h2 className="text-center text-3xl md:text-5xl font-medium">
            Explore More Than 5,000 Courses across Trusted Platforms
          </h2>

          <div className="w-full max-w-2xl">
            <SearchBoxHero />
          </div>

          <div className="flex flex-col justify-center items-center text-center gap-4">
            <p className="md:text-lg text-gray-300">Supported by:</p>
            <div className="gap-x-8 gap-y-4 flex justify-center grayscale flex-wrap items-center">
              <Image
                src={"/images/icons/coursera.png"}
                alt=""
                width={240}
                height={120}
                className="h-3 w-auto object-contain"
              />
              <Image
                src={"/images/icons/udemy.png"}
                alt=""
                width={240}
                height={120}
                className="h-6 w-auto object-contain"
              />
              <Image
                src={"/images/icons/edx.png"}
                alt=""
                width={240}
                height={120}
                className="h-6 w-auto object-contain"
              />
              <Image
                src={"/images/icons/skillshare.png"}
                alt=""
                width={240}
                height={120}
                className="h-6 w-auto object-contain"
              />
              <Image
                src={"/images/icons/moodle.png"}
                alt=""
                width={240}
                height={120}
                className="h-5 w-auto object-contain"
              />
              <Image
                src={"/images/icons/khan_academy.png"}
                alt=""
                width={240}
                height={120}
                className="h-5 w-auto object-contain"
              />
            </div>
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
            <h2 className="text-2xl md:text-4xl font-semibold">
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
            <h2 className="text-2xl md:text-4xl font-semibold">
              Trending Courses
            </h2>
            <p className="md:text-base max-w-2xl text-sm text-gray-500">
              Keep up with the latest trends through our top-rated courses,
              selected by learners from all corners of the globe. Acquire
              essential skills and become part of the community of thousands of
              students advancing their careers.
            </p>
          </div>

          <div className="grid gap-2 md:gap-8 grid-cols-2 md:grid-cols-3 py-8 ">
            {courses.map((course, index) => (
              <Link
                href={"/learn/courses/1"}
                className="md:p-4 bg-gray-50 shadow-sm max-w-sm drop-shadow-sm rounded-xl flex justify-between flex-col gap-3"
                key={index}
              >
                <Image
                  src={course.thumbnail}
                  alt=""
                  width={720}
                  height={580}
                  className="h-44 md:h-52 w-full object-cover rounded-lg"
                />

                <div className="flex flex-col gap-3 px-2 pb-2 md:px-0 md:pb-0">
                  <div className="flex flex-col gap-2">
                    <Image
                      src={course.platform.icon}
                      alt=""
                      width={200}
                      height={200}
                      className="h-3 w-max object-contain "
                    />
                    <h3 className="line-clamp-2 text-ellipsis">
                      {course.name}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-500">
                    {course.instructor.name}, {course.instructor.profession}
                  </p>

                  <div className="flex items-center gap-4 leading-none">
                    <span className="flex items-center  gap-2 leading-none text-main-color-500">
                      {course.rating}{" "}
                      <FaStar size={18} className="leading-none -mt-1" />
                    </span>
                    <span className="text-sm text-gray-500">
                      ({course.students})
                    </span>
                  </div>

                  <h3 className="font-bold text-sm md:text-base">
                    {formatCurrency(course.price.currency, course.price.amount)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-1 rounded-full bg-main-color-500 w-max mt-8 mx-auto">
            <Button className="bg-main-color-500 rounded-full border-2 px-8 py-5 border-white">
              Join for free
            </Button>
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
                className="h-5 w-auto object-contain"
              />
              <Image
                src={"/images/icons/udemy.png"}
                alt=""
                width={240}
                height={120}
                className="h-10 w-auto object-contain"
              />
              <Image
                src={"/images/icons/edx.png"}
                alt=""
                width={240}
                height={120}
                className="h-10 w-auto object-contain"
              />
              <Image
                src={"/images/icons/skillshare.png"}
                alt=""
                width={240}
                height={120}
                className="h-12 w-auto object-contain"
              />
              <Image
                src={"/images/icons/moodle.png"}
                alt=""
                width={240}
                height={120}
                className="h-8 w-auto object-contain"
              />
              <Image
                src={"/images/icons/khan_academy.png"}
                alt=""
                width={240}
                height={120}
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </motion.section>
    </MainLayout>
  );
}
