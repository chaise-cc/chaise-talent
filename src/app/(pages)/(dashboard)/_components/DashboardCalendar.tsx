"use client";

import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";

export default function DashboardCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      className="p-0 mt-4"
      onSelect={setDate}
      classNames={{
        month: "space-y-4 w-full flex flex-col",
      }}
    />
  );
}
