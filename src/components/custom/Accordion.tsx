"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Link, File, Video } from "lucide-react";
import { AccordionProps } from "@/types";

type AccordionType = { contentList: AccordionProps[] };

const Accordion = ({ contentList }: AccordionType) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleSwitch = (id: number) => {
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
              className="flex items-center w-full bg-gray-200 p-4 text-left"
              onClick={() => handleSwitch(id)}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <ChevronUp size={20} className="shrink-0" />
              ) : (
                <ChevronDown size={20} className="shrink-0" />
              )}
              <h2 className="font-medium text-gray-700 ml-4">{title}</h2>
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="p-2">
                {contents.map(({ id, type, name }) => (
                  <div
                    key={id}
                    className="flex shrink-0 items-center p-4 py-2 md:py-4"
                  >
                    {type === "file" ? (
                      <File size={18} className="shrink-0" />
                    ) : type === "link" ? (
                      <Link size={18} className="shrink-0" />
                    ) : (
                      <Video size={18} className="shrink-0" />
                    )}
                    <p className="ml-5">{name}</p>
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
