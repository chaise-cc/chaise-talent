/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TopNavigation from "../_components/top-navigation";
import getUserAndRole from "@/utils/getUserAndRole";
import CompleteProfile from "../_components/CompleteProfile";

export default async function HomePage() {
  const { user } = await getUserAndRole();

  if (!user) return null;

  return (
    <div>
      <TopNavigation
        pageTitle={`Welcome back, ${user?.firstName || "Guest"}`}
        pageCrumbs={[
          { text: "Here’s an overview of your Dashboard", link: "" },
        ]}
      />
      <main className="flex w-full justify-between">
        <div className="md:w-[65%] w-full">
          <div className="flex w-full gap-4">
            <div className="border rounded-xl flex gap-4 h-full justify-between flex-col p-4 w-full">
              <h2 className="font-bold text-sm">Earnings</h2>

              <h3 className="font-bold text-2xl">$1550</h3>

              <small>
                <span className="text-green-500">10%</span> increase
              </small>
            </div>
            <div className="border rounded-xl h-full flex flex-col justify-between gap-4 p-4 w-full">
              <h2 className="font-bold text-sm">Projects completed</h2>

              <h3 className="font-bold text-2xl">3</h3>

              <small>
                <span className="text-green-500">10%</span> increase
              </small>
            </div>
          </div>
        </div>
        <div className="md:w-[35%] px-4 max-w-sm hidden flex-shrink-0 md:block">
          <CompleteProfile />
        </div>
      </main>
    </div>
  );
}
