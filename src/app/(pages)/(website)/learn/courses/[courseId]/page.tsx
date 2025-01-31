"use client";
import React from "react";
import MainLayout from "../../../_components/mainLayout";
import { motion } from "framer-motion";
import formatCurrency from "@/app/helpers/currencyFormatter";
import { Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Accordion from "@/components/custom/Accordion";

interface AccordionProps {
  id: number;
  head: string;
  content: ContentType[];
  itemClose: boolean;
}

type ContentType = {
  id: number;
  name: string;
  path?: string;
  type: string;
};

export default function CoursePage() {
  const contentList: AccordionProps[] = [
    {
      id: 0,
      head: "Day 1 - Beginner - Working with Variables in Python to Manage Data",
      content: [
        {
          id: 0,
          name: "Setting up your account on Chaise",
          path: "#",
          type: "link",
        },
        {
          id: 1,
          name: "Getting people to notice you by upgrading your account.",
          path: "#",
          type: "video",
        },
        {
          id: 2,
          name: "Completing your account on how to use the gjjiui bvgrty nhugytfty nbjyftyfy g6t",
          path: "#",
          type: "file",
        },
      ],
      itemClose: true,
    },
    {
      id: 1,
      head: "Day 2 - Beginner - Understanding Data Types and How to Manipulate Strings",
      content: [
        {
          id: 0,
          name: "Setting up your account on Chaise",
          path: "#",
          type: "file",
        },
        {
          id: 1,
          name: "Getting people to notice you by upgrading your account.",
          path: "#",
          type: "video",
        },
      ],
      itemClose: true,
    },
    {
      id: 2,
      head: "Day 3 - Beginner - Control Flow and Logical Operators",
      content: [
        {
          id: 0,
          name: "Setting up your account on Chaise",
          path: "#",
          type: "file",
        },
        {
          id: 1,
          name: "Getting people to notice you by upgrading your account.",
          path: "#",
          type: "video",
        },
      ],
      itemClose: true,
    },
    {
      id: 3,
      head: "Day 4 - Beginner - Randomisation and Python Lists",
      content: [
        {
          id: 0,
          name: "Setting up your account on Chaise",
          path: "#",
          type: "file",
        },
      ],
      itemClose: true,
    },
  ];

  return (
    <MainLayout>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="bg-gradient-to-b from-[#B2B2B2] to-[#595651] text-white relative min-h-[calc(100vh-160px)] bg-no-repeat bg-cover w-full container mx-auto py-8 md:py-24 flex items-start justify-between"
      >
        <div className="w-full flex flex-col gap-4 md:gap-6 md:max-w-2xl">
          <h2 className="text-3xl md:text-4xl">
            100 Days of Code: The Complete Python Pro Bootcamp
          </h2>

          <p>
            Master Python by building 100 projects in 100 days. Learn data
            science, automation, build websites, games and apps!
          </p>

          <p>
            Created by:{" "}
            <span>Dr. Angela Yu, Developer and Lead Instructor</span>
          </p>

          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl">
              {formatCurrency("NGN", 10900)}
            </h3>
            <small className="text-red-300 flex gap-2 items-center leading-none">
              <Timer size={20} />{" "}
              <span className="-mb-1">13 hours left at this price!</span>
            </small>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="p-1 rounded-full bg-main-color-500 w-max">
              <Button className="bg-main-color-500 rounded-full font-semibold border-2 px-10 py-6 border-white">
                Buy this course
              </Button>
            </div>
            <small>Financial aid available</small>
          </div>

          <small className="text-gray-300 mt-4">Powered by:</small>
        </div>

        <div className="w-max md:flex hidden">
          <video
            autoPlay
            className="h-auto w-full rounded-xl border-2 border-main-color-500 object-contain max-w-lg aspect-video "
            controls
            src="/videos/previews/course-1.mp4"
          />
        </div>
      </motion.section>

      {/*  */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="container py-8 md:py-12"
      >
        <h2 className="text-xl text-gray-700 md:text-2xl font-semibold">
          Course Content
        </h2>
        <Accordion contentList={contentList} />
      </motion.section>
    </MainLayout>
  );
}
