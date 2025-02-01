"use client";

import MainLayout from "../../../_components/mainLayout";
import { motion } from "framer-motion";
import formatCurrency from "@/app/helpers/currencyFormatter";
import { Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Accordion from "@/components/custom/Accordion";
import { courses } from "@/data/courses/understanding-content-management";

export default async function CoursePage(props: {
  params: Promise<{ courseId: number }>;
}) {
  const { courseId } = await props.params;

  const course = courses.find((c) => c.id == courseId);

  if (course == undefined) {
    return (
      <div className="flex justify-center items-center h-screen animate-pulse font-medium">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="bg-gradient-to-b from-[#B2B2B2] to-[#595651] text-white relative min-h-[calc(100vh-160px)] bg-no-repeat bg-cover w-full container mx-auto py-8 md:py-24 flex items-start justify-between"
      >
        <div className="w-full flex flex-col gap-4 md:gap-6 md:max-w-2xl">
          <h2 className="text-3xl md:text-4xl">{course?.title}</h2>

          <p>
            Master Python by building 100 projects in 100 days. Learn data
            science, automation, build websites, games and apps!
          </p>

          <div className="flex items-center gap-2">
            {course?.rating}
            <Star
              className="-mt-1 text-yellow-400 fill-main-color-500"
              size={16}
            />
            <span>(231,869 rating)</span>
            <span>{course?.students} students</span>
          </div>

          <p>
            Created by:{" "}
            <span>
              {course?.instructor.name}, {course?.instructor.profession}
            </span>
          </p>

          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl">
              {formatCurrency(course?.price?.currency, course?.price?.amount)}
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
        className="container py-8 md:py-12 flex flex-col md:flex-row gap-8 "
      >
        <div className="w-full">
          <h2 className="text-xl text-gray-700 md:text-2xl mb-4 md:mb-6 font-semibold">
            Course Content
          </h2>

          <div className="flex flex-col gap-2">
            <p className="text-sm">
              101 sections • 592 lectures • 56h 20m total length
            </p>
            <Accordion contentList={course?.modules} />
          </div>
        </div>

        <div className="w-full md:max-w-sm flex flex-col gap-4 shrink-0 border p-4 rounded-xl">
          <h2 className="text-xl font-medium">{course?.title}</h2>

          <div className="flex text-sm items-center gap-2">
            {course?.rating}
            <Star
              className="-mt-1 text-yellow-400 fill-main-color-500"
              size={16}
            />
            <span>(231,869 rating)</span>
            <span>{course?.students} students</span>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl">
              {formatCurrency(course?.price?.currency, course?.price?.amount)}
            </h3>
            <small className="text-red-700 flex gap-2 items-center leading-none">
              <Timer size={20} className="text-red-600 " />{" "}
              <span className="-mb-1">13 hours left at this price!</span>
            </small>
          </div>

          <div className="flex items-center flex-col gap-4 mt-4 w-full">
            <div className="p-1 rounded-full w-full bg-main-color-500">
              <Button className="bg-main-color-500 w-full rounded-full font-semibold border-2 px-10 py-6 border-white">
                Buy this course
              </Button>
            </div>
            <span className="text-sm">Financial aid available</span>
          </div>
        </div>
      </motion.section>
    </MainLayout>
  );
}
