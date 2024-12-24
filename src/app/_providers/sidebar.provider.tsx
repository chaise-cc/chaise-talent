"use client";

import { createContext, ReactNode, useState } from "react";

export interface SideBarContextType {
  showSideBar: boolean;
  toggleSideBar(): void;
  showDropDown: boolean;
  toggleDropDown(): void;
}

interface SideBarProviderProps {
  children: ReactNode;
}

export const SideBarContext = createContext<SideBarContextType | undefined>(
  undefined
);

const SideBarProvider = ({ children }: SideBarProviderProps) => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const toggleSideBar = () => setShowSideBar((prev) => !prev);
  const toggleDropDown = () => setShowDropDown((prev) => !prev);

  return (
    <SideBarContext.Provider
      value={{ showSideBar, toggleSideBar, showDropDown, toggleDropDown }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
