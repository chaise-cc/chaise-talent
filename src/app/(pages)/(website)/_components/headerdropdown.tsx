"use client";

import React from "react";
import Link from "next/link";
import {
  FIND_TALENTS_LINK_ITEM,
  FIND_WORKS_LINK_ITEM,
  EXPLORE,
} from "@/data/menuCategories";
import { ArrowRight } from "lucide-react";

type HeaderDropdownProps = {
  itemClicked?: string;
  isCategoryShowing: boolean;
};

export default function HeaderDropdown({
  itemClicked,
  isCategoryShowing,
}: HeaderDropdownProps) {
  return (
    <header
      className={`z-50 absolute w-full h-[90vh] bg-[rgba(0,0,0,0.5)] ${
        isCategoryShowing ? "top-[140px]" : "top-[90px]"
      } ${itemClicked == EXPLORE.text && "flex flex-col items-center"} 
      `}
    >
      <div
        className={`${
          itemClicked == EXPLORE.text ? "rounded-md px-6" : "w-full"
        } py-5 h-auto bg-white`}
      >
        <div className={`${itemClicked != EXPLORE.text && "container"}`}>
          <div className="leading-none">
            <div
              className={`${
                itemClicked == EXPLORE.text
                  ? "flex flex-col"
                  : "grid grid-cols-3"
              }`}
            >
              {itemClicked == FIND_TALENTS_LINK_ITEM.text
                ? FIND_TALENTS_LINK_ITEM?.children.map((item) => (
                    <div key={item.title}>
                      <h2 className="font-medium mb-3">{item.title}</h2>
                      <ul className="flex flex-col">
                        {item.desp.map((desp) => (
                          <Link
                            href={desp.href}
                            className="hover:border-l-4 hover:border-main-color-500 hover:bg-gray-75 p-3 ps-0 hover:ps-3 font-normal text-[14px] "
                            key={desp.text}
                          >
                            {desp.text}
                          </Link>
                        ))}
                      </ul>
                    </div>
                  ))
                : itemClicked == FIND_WORKS_LINK_ITEM.text
                ? FIND_WORKS_LINK_ITEM?.children.map((item) => (
                    <Link
                      href={item.href}
                      className="hover:border-l-4 hover:border-main-color-500 hover:bg-gray-75 p-3 "
                      key={item.title}
                    >
                      <h2 className="font-medium mb-3">{item.title}</h2>
                      <span className="font-normal text-[14px]">
                        {item.desp}
                      </span>
                    </Link>
                  ))
                : itemClicked == EXPLORE.text
                ? EXPLORE?.children.map((item) => (
                    <Link
                      href={item.href || item.slug || "/"}
                      className="hover:border-l-4 hover:border-main-color-500 hover:bg-gray-75 p-3 "
                      key={item.text}
                    >
                      <h2 className="font-medium mb-3">{item.text}</h2>
                      <span className="font-normal text-[14px]">
                        {item.desp}
                      </span>
                    </Link>
                  ))
                : null}

              {itemClicked == FIND_TALENTS_LINK_ITEM.text && (
                <div className="flex items-center text-main-color-500 my-4">
                  <h2 className="font-medium mr-2">Explore all categories</h2>
                  <ArrowRight size={25} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
