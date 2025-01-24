"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import exclusiveBenefits from "@/data/exclusiveBenefits";
import Image from "next/image";
import { motion } from "framer-motion";
import ExclusiveBenefitCard from "../_components/ExclusiveBenefitCard";

const ExclusiveBenefitsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className="h-max mt-20 mb-8"
      id="chaise-pro"
    >
      <div className="container h-full pb-12">
        <div className="flex flex-col  h-full gap-4 md:gap-12 relative items-center">
          <div className="flex flex-col text-center ">
            <h1 className="mb-2 md:mb-4 text-3xl md:text-4xl varela-round-regular">
              Exclusive benefits just for&nbsp;{" "}
              <span className="relative text-main-color-500">
                you
                <div className="block absolute left-0 md:w-20 w-12 h-2">
                  <Image
                    src="/images/vector-underline.png"
                    alt=""
                    fill
                    className="w-full h-auto object-contain"
                  />
                </div>
              </span>
            </h1>
            <p className="py-1">
              Discover the exclusive features designed to enhance your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {exclusiveBenefits.map((benefit: any, index: any) => (
              <ExclusiveBenefitCard key={index} benefit={benefit} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ExclusiveBenefitsSection;
