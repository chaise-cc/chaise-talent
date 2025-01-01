"use client";

import Link from "next/link";
import { ArrowRight, TickCircle } from "iconsax-react";
import { steps } from "@/data/local.index";

type CompleteProfileProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
};

export default function CompleteProfile({ user }: CompleteProfileProps) {
  const updateSteps = steps(user);

  return (
    <section className="bg-white w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex gap-2 items-center  justify-between">
        <h2 className="text-xl font-semibold ">Next Steps</h2>
      </div>

      {/* Steps Section */}
      <div className="flex flex-col gap-2 text-gray-600">
        {updateSteps.map((step, index) => (
          <Link
            key={index}
            href={step.href}
            className={`flex justify-between py-3.5 leading-none items-center border-b border-gray-300 ${
              step.completed
                ? "text-main-color-700 pointer-events-none cursor-not-allowed"
                : "hover:text-main-color-500"
            }`}
          >
            <span className="flex items-center gap-2">{step.label}</span>

            {step.completed ? (
              <span className="h-7 w-7 bg-green-700 leading-none rounded-full flex items-center justify-center text-white">
                <TickCircle size={18} color="white" />
              </span>
            ) : (
              <ArrowRight size={20} color="black" />
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
