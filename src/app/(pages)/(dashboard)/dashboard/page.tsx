import React from "react";
import TopNavigation from "../_components/top-navigation";
import getUserAndRole from "@/utils/getUserAndRole";
import CompleteProfile from "../_components/CompleteProfile";
import DashboardCalendar from "../_components/DashboardCalendar";
import PublicURLComponent from "../_components/PublicURLComponent";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { steps } from "@/data/local.index";

type CircularProgressProps = {
  percentage: number;
};

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => (
  <div className="relative w-20 h-20 md:w-36 md:h-36">
    <svg className="w-full h-full" viewBox="0 0 36 36">
      <circle
        cx="18"
        cy="18"
        r="15.9155"
        fill="none"
        stroke="#eedb8f" /* Gray */
        strokeWidth="2"
      />
      <circle
        cx="18"
        cy="18"
        r="15.9155"
        fill="none"
        stroke="#e59e10" /* Main Color */
        strokeWidth="2"
        strokeDasharray={`${percentage}, 100`}
        strokeLinecap="round"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <h2 className="text-lg md:text-xl font-bold">{percentage}%</h2>
      <p className="hidden md:block text-sm text-gray-500">Completed</p>
    </div>
  </div>
);

export default async function HomePage() {
  const { user } = await getUserAndRole();

  if (!user) return null;

  const updatedSteps = steps(user);
  const completedSteps = updatedSteps.filter((step) => step.completed).length;
  const completionPercentage = Math.round(
    (completedSteps / updatedSteps.length) * 100
  );

  return (
    <div>
      <TopNavigation pageTitle={`Welcome back, ${user.firstname}`} />
      <main className="flex w-full justify-between">
        {/* Left Section */}
        <div className="flex flex-col gap-4 w-full">
          {/* Account Setup Section */}
          <div className="p-4 bg-gray-50 border border-gray-300 rounded-xl flex justify-between items-start gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-medium">
                Complete your account setup
              </h2>
              <p className="text-sm md:text-base text-gray-500">
                You&apos;re 4.5 times more likely to get hired by clients with a
                quality profile.
              </p>
              <Button
                asChild
                className="w-max flex items-center gap-2 text-sm font-medium text-black leading-none bg-main-color-500 hover:bg-main-color-400 transition"
              >
                <Link href="/dashboard/update">
                  Continue
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            <CircularProgress percentage={completionPercentage} />
          </div>

          {/* Metrics Section */}
          <div className="flex gap-4">
            <div className="w-full border rounded-xl p-4 gap-4 flex flex-col justify-between">
              <h2 className="text-sm font-medium">Earnings</h2>
              <h3 className="text-2xl font-bold">$0</h3>
              <small>
                <span className="text-green-500">0%</span> increase
              </small>
            </div>
            <div className="w-full border rounded-xl p-4 gap-4 flex flex-col justify-between">
              <h2 className="text-sm font-medium">Projects completed</h2>
              <h3 className="text-2xl font-bold">0</h3>
              <small>
                <span className="text-green-500">0%</span> increase
              </small>
            </div>
          </div>

          {/* Profile Metrics */}
          <div className="border rounded-xl p-4 flex flex-col gap-4">
            <h2 className="font-medium">Profile metrics</h2>
            <h3 className="text-xl font-medium">
              <span>0</span>&nbsp;profile views
            </h3>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-col gap-4 px-4 w-full lg:max-w-md flex-shrink-0">
          <PublicURLComponent user={user} />
          <CompleteProfile user={user} />
          <DashboardCalendar />
        </div>
      </main>
    </div>
  );
}
