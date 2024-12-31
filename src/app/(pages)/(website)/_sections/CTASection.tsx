"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className=""
    >
      <div className="py-12 md:py-[6rem] px-4 md:px-6 bg-main-color-500 text-gray-900">
        <div className="!max-w-4xl container mx-auto text-center gap-8 grid place-items-center py-16">
          <h1 className="md:text-5xl text-3xl font-medium">
            Ready to get the best there is?
          </h1>
          <p className="px-9 text-lg">
            Work with the largest network of independent professionals and get
            things done quickly
          </p>

          <Link
            href="/signup"
            className="bg-black rounded-full px-6 mt-4 py-3 text-white"
          >
            Join now
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
