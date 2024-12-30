"use client";

import dayjs from "dayjs";
import "dayjs/locale/en";

import BreadcrumbsComponent, {
  BreadcrumbItem,
} from "@/components/custom/BreadCrumbs.custom";
import { ReactNode } from "react";

interface TopNavigationProps {
  pageTitle: string;
  pageCrumbs?: BreadcrumbItem[];
  action?: ReactNode;
}

const TopNavigation = ({
  pageTitle,
  pageCrumbs,
  action,
}: TopNavigationProps) => {
  return (
    <div className="flex justify-between gap-2 mb-4 items-center">
      <div className="flex-col flex gap-0.5">
        <h2 className="text-xl md:text-2xl font-semibold">{pageTitle}</h2>

        {pageCrumbs && <BreadcrumbsComponent items={pageCrumbs} />}
      </div>

      {action ? (
        action
      ) : (
        <p className="font-[500] hidden md:flex shrink-0 md:text-base text-gray-700 text-sm tracking-tight">
          {dayjs().format("DD MMMM, YYYY")}
        </p>
      )}
    </div>
  );
};

export default TopNavigation;
