import { User } from "@/types";
import { User as Uss } from "iconsax-react";
// import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type HeaderType = {
  user: User | null;
};

export default function Header({ user }: HeaderType) {
  return (
    <header className="my-4">
      <div className="container w-full">
        <div className="flex w-full rounded-full bg-gray-50 justify-between items-center gap-4 py-4 shadow-sm pl-6 pr-4">
          <Link
            shallow={true}
            href="/"
            className="logo flex  gap-2 font-semibold items-center w-fit shrink-0"
          >
            <Image
              src="/images/chaise-yellow.png"
              alt="Chaise - The Future of Freelancing"
              height={32}
              width={82}
              loading="lazy"
              className={""}
            />
            <span className="mt-2 text-gray-500 ">Talent</span>
          </Link>

          <nav className="flex gap-4 items-center">
            <div className="flex gap-2 items-center ">
              {!user ? (
                <ul className="flex space-x-4 md:space-x-6 shrink-0 items-center list-none">
                  <li className="shrink-0">
                    <Link
                      className="font-bold"
                      href="/auth/login"
                      data-view="login"
                    >
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="https://chaise.cc/signup?accountType=talent"
                      className="bg-main-color-500 w-[9rem] h-11 !leading-1 overflow-hidden flex items-center justify-center font-semibold rounded-full text-main-color-900"
                      data-view="signup"
                      target="_blank"
                    >
                      Join for free
                    </Link>
                  </li>
                </ul>
              ) : (
                <Link
                  className="bg-main-color-500 px-4 gap-1.5 h-11 !leading-1 overflow-hidden flex items-center justify-center font-semibold rounded-full text-main-color-900"
                  href="/dashboard"
                  data-view="dashboard"
                >
                  <Uss color="black" size={16} /> Dashboard
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
