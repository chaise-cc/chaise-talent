"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Link, File, Video } from "lucide-react";

const Accordion = ({ contentList }: any) => {
  const [accordionItems, setAccordionItems] = useState(contentList);

  const handleSwitch = (id: number, status: string) => {
    const dataCopy = [...accordionItems];
    dataCopy.map((i: any) => (i.itemClose = true));

    const itemSelected = dataCopy.find((i: any) => i.id == id);
    const itemIndex = dataCopy.findIndex((i: any) => i.id == id);

    itemSelected.itemClose = status == "open" ? false : true;
    dataCopy[itemIndex] = itemSelected;

    setAccordionItems(dataCopy);
  };

  return (
    <div className="rounded-t-2xl border overflow-hidden">
      {accordionItems.map((content: any) => (
        <div key={content.id} className="flex flex-col">
          <div
            className="flex justify-between bg-[#F6F7F9] p-4 border border-x-0 border-t-0 border-b-1"
            onClick={() =>
              handleSwitch(content.id, content.itemClose ? "open" : "close")
            }
          >
            <div className="flex items-center">
              {content.itemClose ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronUp size={20} />
              )}
              <p className="font-semibold ms-4">{content.head}</p>
            </div>
            <div className="flex items-center text-[#303141] text-[12px]">
              <span>{content?.content?.length} lectures</span>
              <div className="h-[2px] w-[2px] bg-[#303141] mx-1"></div>
              <span>1hr 12mins</span>
            </div>
          </div>

          {content.itemClose == false && (
            <div className="my-2">
              {content.content.map((list: any) => (
                <div key={list.id} className="flex items-center p-2">
                  {list.type == "file" ? (
                    <File size={15} className="mx-3" />
                  ) : list.type == "link" ? (
                    <Link size={15} className="mx-3" />
                  ) : (
                    <Video size={15} className="mx-3" />
                  )}
                  <span className="text-[14px]">{list.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
