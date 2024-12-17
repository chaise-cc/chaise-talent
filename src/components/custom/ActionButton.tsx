import React from "react";
import { Add } from "iconsax-react";
import { Button } from "../ui/button";

type ActionButton = {
  label: string;
  onclick?: () => void;
};

export default function ActionButton({ label, onclick }: ActionButton) {
  return (
    <Button
      className="leading-none flex items-center px-4 py-5 bg-main-color-500 text-main-color-900 hover:bg-main-color-400 font-semibold rounded-full"
      onClick={onclick}
    >
      <Add size={21} color="black" className=" shrink-0" />
      <span className="leading-none">{label}</span>
    </Button>
  );
}
