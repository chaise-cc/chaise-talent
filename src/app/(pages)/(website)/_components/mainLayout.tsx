"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const currentPath = usePathname();

  return (
    <main
      className={`md:pt-28 min-h-screen  ${
        currentPath !== "/" && !currentPath.includes("/blog") && "md:mt-14"
      }`}
    >
      {children}
    </main>
  );
};

export default MainLayout;
