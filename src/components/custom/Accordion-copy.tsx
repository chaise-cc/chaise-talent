// "use client";

// import { useState } from "react";
// import { ChevronUp, ChevronDown, Link, File, Video } from "lucide-react";
// import { AccordionProps } from "@/types";

// type AccordionType = { contentList: AccordionProps[] };

// const Accordion = ({ contentList }: AccordionType) => {
//   const [accordionItems, setAccordionItems] = useState(contentList);

//   const handleSwitch = (id: number, status: string) => {
//     const dataCopy = [...accordionItems];
//     dataCopy.map((i: AccordionProps) => (i.itemClose = true));

//     const itemSelected = dataCopy.find((i: any) => i.id == id);
//     const itemIndex = dataCopy.findIndex((i: any) => i.id == id);

//     itemSelected.itemClose = status == "open" ? false : true;
//     dataCopy[itemIndex] = itemSelected;

//     setAccordionItems(dataCopy);
//   };

//   return (
//     <div className="rounded-t-2xl border overflow-hidden">
//       {accordionItems.map((content: any) => (
//         <div key={content.id} className="flex flex-col">
//           <div
//             className="flex bg-gray-200 p-4 border border-x-0 border-t-0 border-b-1"
//             onClick={() =>
//               handleSwitch(content.id, content.itemClose ? "open" : "close")
//             }
//           >
//             {content.itemClose ? (
//               <ChevronDown size={20} />
//             ) : (
//               <ChevronUp size={20} />
//             )}
//             <h2 className="font-bold ms-4">{content.head}</h2>
//           </div>

//           {content.itemClose == false && (
//             <div className="my-2">
//               {content.content.map((list: any) => (
//                 <div key={list.id} className="flex items-center p-2">
//                   {list.type == "file" ? (
//                     <File size={15} />
//                   ) : list.type == "link" ? (
//                     <Link size={15} />
//                   ) : (
//                     <Video size={15} />
//                   )}
//                   <span className="ms-5">{list.name}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Accordion;
