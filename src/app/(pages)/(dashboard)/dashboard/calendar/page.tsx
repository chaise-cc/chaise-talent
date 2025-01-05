import { Calendar } from "@/components/ui/calendar";
import React from "react";

export default function CalendarPage() {
  return (
    <Calendar
      mode="single"
      classNames={{
        month: "space-y-12 w-full flex flex-col",
        cell: "md:text-base md:py-8",
        caption_label: "text-base font-semibold",
        head_cell: "text-base",
      }}
    />
  );
}
