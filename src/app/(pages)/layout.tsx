import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import NextTopLoader from "nextjs-toploader";
import { LayoutTransition } from "@/LayoutTransition";

const varela_round = localFont({
  src: "../../fonts/varela-round.woff2",
  display: "swap",
  variable: "--font-varela-round",
});

const sora = localFont({
  src: [
    {
      path: "../../fonts/sora-100.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../fonts/sora-200.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../fonts/sora-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/sora-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/sora-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/sora-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/sora-800.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Chaise - Empowering Africa's Top Freelancers and Verified Talents",
  description:
    "Discover top freelancers and verified talents on Chaise. Get your projects done by skilled writing, tech, design, and more professionals. Join today for secure payments, AI matching, and access to Africa's trusted freelance community. Redefine your success with Chaise - your gateway to talent in Africa.",
  keywords: [
    "African freelancers",
    "Hire freelancers in Africa",
    "Top African talent marketplace",
    "secure freelance platform",
    "verified freelancers in africa",
    "african designers and developers",
    "Africa's best freelance platform",
    "AI-powered talent matching",
    "affordable african freelance services",
    "trusted African freelance marketplace",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`${varela_round.variable} ${sora.variable} antialiased`}>
        <NextTopLoader />

        <LayoutTransition
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </LayoutTransition>
      </body>
    </html>
  );
}
