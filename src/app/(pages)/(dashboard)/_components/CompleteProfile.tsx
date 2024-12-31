"use client";

import Link from "next/link";
import { ArrowRight, TickCircle, CloseSquare } from "iconsax-react";

type CompleteProfileProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
};

export default function CompleteProfile({ user }: CompleteProfileProps) {
  const steps = [
    {
      label: "Update your profile",
      href: "/dashboard/update",
      completed: user.username && user?.social_accounts.length >= 1 && user.bio,
    },
    {
      label: "Add work experience(s)",
      href: "/dashboard/settings?tab=profile",
      completed: false,
    },
    {
      label: "Create your first service",
      href: "/dashboard/services/new",
      completed: false,
    },

    {
      label: "Setup withdrawal method",
      href: "/dashboard/settings?tab=withdrawals",
      completed: false,
    },
  ];

  const completedSteps = steps.filter((step) => step.completed).length;

  return (
    <section className="bg-white border-t w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex gap-2 items-center justify-between">
        <h2 className="text-xl font-semibold py-4">Next Steps</h2>
        <div
          className={`h-10 w-10 flex items-center text-sm font-medium justify-center rounded-full ${
            completedSteps === steps.length
              ? "bg-green-500 text-white"
              : "border-4 border-l-main-color-300 text-gray-700"
          }`}
        >
          {completedSteps === steps.length ? (
            <CloseSquare size={24} color="white" />
          ) : (
            `${completedSteps}/${steps.length}`
          )}
        </div>
      </div>

      {/* Steps Section */}
      <div className="flex flex-col gap-2 text-gray-600">
        {steps.map((step, index) => (
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
