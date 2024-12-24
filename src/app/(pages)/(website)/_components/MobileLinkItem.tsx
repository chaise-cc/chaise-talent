"use client";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface Props {
  text: string;
  href?: string;
  isLast: boolean;
  children?: ReactNode;
}

const LinkItem = ({ href, text, isLast, children }: Props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const toggleDropDownState = () => setIsDropDownOpen((prev) => !prev);

  return (
    <>
      {children ? (
        <div className={`${!isLast && "border-b border-gray-400"} py-4 px-1`}>
          <span
            className="flex items-center justify-between"
            onClick={toggleDropDownState}
          >
            <p className="font-medium text-base">{text}</p>

            {isDropDownOpen ? (
              <ArrowUp2
                size="16"
                variant="Outline"
                color="black"
                className="cursor-pointer text-gray-800"
              />
            ) : (
              <ArrowDown2
                size="16"
                variant="Outline"
                color="black"
                className="cursor-pointer text-gray-800"
              />
            )}
          </span>

          <ul
            className={`flex flex-col px-4 text-sm ${
              isDropDownOpen && "mt-2"
            } `}
          >
            {(isDropDownOpen as boolean) && children}
          </ul>
        </div>
      ) : (
        <div
          className={`${
            !isLast && "border-b border-gray-400"
          } py-4 px-1.5 w-full`}
        >
          <Link className="w-full font-medium text-base" href={href as string}>
            {text}
          </Link>
        </div>
      )}
    </>
  );
};

export default LinkItem;
