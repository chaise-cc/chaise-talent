import React from "react";
import Accordion from "@/components/custom/Accordion";

interface AccordionProps {
  id: number;
  head: string;
  content: ContentType[];
  itemClose: boolean
};

type ContentType = {
  id: number;
  name: string;
  path?: string;
  type: string;
};

export default function BlogHome() {
  const contentList: AccordionProps[] = [
    {
      id: 0, 
      head: "Text One- Text this with your page", 
      content: [
        {id: 0, name: "Setting up your account on Chaise", path: "#", type: "link" }, 
        {id: 1, name: "Getting people to notice you by upgrading your account.", path: "#", type: "video" }, 
        {id: 2, name: "Completing your account on how to use the gjjiui bvgrty nhugytfty nbjyftyfy g6t", path: "#", type: "file" }, 
      ],
      itemClose: true
    },
    {
      id: 1, 
      head: "Text Two- This is the content fot the second page", 
      content: [
        {id: 0, name: "Setting up your account on Chaise", path: "#", type: "file" }, 
        {id: 1, name: "Getting people to notice you by upgrading your account.", path: "#", type: "video" }, 
      ],
      itemClose: true
    },
  ]

  return (
    <div className="my-36">
      <section className="container">
        <Accordion contentList={contentList}/>
      </section>
    </div>
  );
}
