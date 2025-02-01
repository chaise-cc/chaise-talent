"use client";

import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Link,
  File,
  TvMinimalPlay,
  Code,
} from "lucide-react";
import { AccordionProps } from "@/types";

type AccordionType = { contentList: AccordionProps[] };

const Accordion = ({ contentList }: AccordionType) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleSwitch = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="rounded-2xl border flex flex-col overflow-hidden">
      {contentList.map(({ id, title, contents }) => {
        const isOpen = openId === id;

        return (
          <div key={id} className="flex flex-col border-b">
            {/* Accordion Header */}
            <button
              className="flex items-center justify-between w-full bg-gray-200 p-4 text-left"
              onClick={() => handleSwitch(id)}
              aria-expanded={isOpen}
            >
              <div className="flex items-center">
                {isOpen ? (
                  <ChevronUp size={20} className="shrink-0" />
                ) : (
                  <ChevronDown size={20} className="shrink-0" />
                )}
                <h2 className="font-medium text-gray-700 ml-4">{title}</h2>
              </div>
              <span className="text-[12px]">
                {contents.length} lectures • 1hr 12min
              </span>
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="p-2">
                {contents.map(({ id, type, name, duration }) => (
                  <div
                    key={id}
                    className="flex justify-between shrink-0 items-center p-4 py-2 md:py-4"
                  >
                    <div className="flex items-center">
                      {type === "file-alt" ? (
                        <File size={18} className="shrink-0" />
                      ) : type === "text" ? (
                        <Link size={18} className="shrink-0" />
                      ) : type === "video" ? (
                        <TvMinimalPlay size={18} className="shrink-0" />
                      ) : (
                        <Code size={18} className="shrink-0" />
                      )}
                      <p className="ml-5">{name}</p>
                    </div>
                    <span className="text-[12px] items-end">{duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
