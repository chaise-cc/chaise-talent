"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef } from "react";

function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T | undefined>(undefined); // Pass 'undefined' as the initial value

  useEffect(() => {
    prevValue.current = value; // Update the ref to hold the current value
  }, [value]); // Only run when `value` changes

  return prevValue.current;
}

// Component to freeze the router context during animation
function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;

  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);

  const changed =
    segment !== prevSegment &&
    segment !== undefined &&
    prevSegment !== undefined;

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

interface LayoutTransitionProps {
  children: React.ReactNode;
  className?: React.ComponentProps<typeof motion.div>["className"];
  style?: React.CSSProperties;
  initial?: React.ComponentProps<typeof motion.div>["initial"];
  animate?: React.ComponentProps<typeof motion.div>["animate"];
  exit?: React.ComponentProps<typeof motion.div>["exit"];
}

// Component to handle layout transitions
export function LayoutTransition({
  children,
  className,
  style,
  initial,
  animate,
  exit,
}: LayoutTransitionProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className={className}
        style={style}
        key={segment} // Ensure unique key for segment changes
        initial={initial}
        animate={animate}
        exit={exit}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
