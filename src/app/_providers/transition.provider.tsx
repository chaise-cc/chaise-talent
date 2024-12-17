/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "framer-motion/dom";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null!);

  return (
    <TransitionRouter
      auto
      leave={(next: any) => {
        animate(
          wrapperRef.current,
          { opacity: [1, 0] },
          { duration: 0.5, onComplete: next }
        );
      }}
      enter={(next: any) => {
        animate(
          wrapperRef.current,
          { opacity: [0, 1] },
          { duration: 0.5, onComplete: next }
        );
      }}
    >
      <div ref={wrapperRef}>{children}</div>
    </TransitionRouter>
  );
}
