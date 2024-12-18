"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function TransitionLink({
  children,
  href,
  className,
  target,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const main = document.querySelector("main");
    main?.classList.add("page-transition");

    await sleep(450);

    if (target) window.open("www.yourdomain.com", "_ blank");
    else router.push(href);

    await sleep(450);

    main?.classList.remove("page-transition");
  };

  return (
    <Link
      {...props}
      className={className}
      href={href}
      onClick={handleTransition}
      target={target}
    >
      {children}
    </Link>
  );
}
