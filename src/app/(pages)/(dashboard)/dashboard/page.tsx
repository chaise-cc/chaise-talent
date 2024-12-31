/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TopNavigation from "../_components/top-navigation";
import getUserAndRole from "@/utils/getUserAndRole";
import CompleteProfile from "../_components/CompleteProfile";
import DashboardCalendar from "../_components/DashboardCalendar";
import PublicURLComponent from "../_components/PublicURLComponent";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const { user } = await getUserAndRole();

  if (!user) return null;

  return (
    <div>
      <TopNavigation
        pageTitle={`Welcome back, ${user?.firstname || "Guest"}`}
        pageCrumbs={[
          { text: "Here’s an overview of your Dashboard", link: "" },
        ]}
      />
      <main className="flex w-full justify-between">
        <div className=" flex flex-col gap-4 w-full">
          <div className=" p-4 md:h-[220px] bg-gray-50 border bottom-4 border-gray-300 flex gap-4 justify-between rounded-xl">
            <div className="flex flex-col gap-8 justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-[400]">
                  Complete your account setup
                </h2>
                <p className="text-gray-500 text-sm md:text-base">
                  You&apos;re 4.5 times more likely to get hired by clients with
                  quality profile
                </p>
              </div>

              <Button
                asChild
                className="w-max p-5 !text-sm flex gap-2 text-black font-medium items-center leading-none bg-main-color-500 hover:bg-main-color-400 transition"
              >
                <Link href={"/dashboard/update"}>
                  Continue
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>

            <div className="pie md:h-36 shrink-0 md:w-36 w-20 h-20 rounded-full border-gray-200 border-l-main-color-500 border-b-main-color-500 border-[12px] shrink- grid place-content-center text-center p-4">
              <h2 className="md:text-xl">65%</h2>
              <p className="hidden md:inline-block md:text-sm">Completed</p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="border rounded-xl flex gap-4 h-full justify-between flex-col p-4 w-full">
              <h2 className="font-medium text-sm">Earnings</h2>

              <h3 className="font-bold text-2xl">$0</h3>

              <small>
                <span className="text-green-500">10%</span> increase
              </small>
            </div>

            <div className="border rounded-xl h-full flex flex-col justify-between gap-4 p-4 w-full">
              <h2 className="font-medium text-sm">Projects completed</h2>

              <h3 className="font-bold text-2xl">3</h3>

              <small>
                <span className="text-green-500">10%</span> increase
              </small>
            </div>
          </div>

          {/*  */}
          <div className="border rounded-xl flex gap-2 h-full flex-col p-4 w-full">
            <h2 className="font-medium text-lg">Profile metrics</h2>

            <h3 className="font-medium text-2xl">
              <span>0</span>&nbsp;profile views
            </h3>
          </div>
        </div>

        {/*  */}
        <div className="md:w-[40%] md:flex flex-col gap-4 px-4 lg:max-w-md hidden flex-shrink-0">
          <PublicURLComponent user={user} />

          <CompleteProfile user={user} />

          {/*  */}
          <DashboardCalendar />
        </div>
      </main>
    </div>
  );
}
