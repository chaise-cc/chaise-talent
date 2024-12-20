// import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import { ReactNode } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface TabsContainerProps {
  children: ReactNode;
}

const TabsContainer = ({ children }: TabsContainerProps) => {
  return (
    <ScrollArea className="w-full border-b border-gray-200  z-40 text-sm md:text-base">
      <div className="w-full flex md:gap-8 gap-4">{children}</div>

      <ScrollBar className="-mb-1.5" orientation="horizontal" />
    </ScrollArea>
  );
};

export default TabsContainer;
