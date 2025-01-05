"use client";

import { useState } from "react";

import SocialMediaAction from "@/data/socials";
import { ArrowDown2, Global } from "iconsax-react";
import servicesCategories from "@/data/services-categories";
import Link from "next/link";

// TODO: Update Social media Icons []

const categories = [
  {
    title: "Categories",
    links: servicesCategories.map((service) => ({
      name: service.name,
      href: `/services/${service.slug}`,
    })),
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "https://wiki.chaise.cc/company/about" },
      { name: "Careers", href: "/careers" },
      { name: "Our Impact", href: "/about/our-impact" },
      { name: "Partnership", href: "/become-partner" },
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
      { name: "Intellectual Property", href: "/" },
      { name: "Investor Relations", href: "/" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Customer Success", href: "/" },
      { name: "Chaise Reviews", href: "/" },
      { name: "Events", href: "/" },
      { name: "Blog", href: "/" },
      { name: "Creators", href: "/" },
      { name: "Affiliates", href: "/" },
      { name: "Podcast", href: "/" },
      { name: "Invite a Friend", href: "/" },
      { name: "Community Standards", href: "/" },
    ],
  },
  {
    title: "Support and Education",
    links: [
      { name: "Help & Support", href: "/" },
      { name: "Trust & Safety", href: "/" },
      { name: "Selling on Chaise", href: "/" },
      { name: "Buying on Chaise", href: "/" },
      { name: "Chaise Guides", href: "/" },
      { name: "Chaise Workplace", href: "/" },
    ],
  },
  {
    title: "Business Solutions",
    links: [
      { name: "Chaise Pro", href: "/" },
      { name: "How it works", href: "/" },
      { name: "Become an Agency", href: "/" },
      { name: "Chaise Enterprise", href: "/" },
      { name: "Content Marketing", href: "/" },
      { name: "Contact Sales", href: "/" },
    ],
  },
];

const SiteFooter = () => {
  const [sectionsAreCollapsed, setSectionsAreCollapsed] = useState(
    categories.map(() => true)
  );

  const toggleSection = (index: number) => {
    setSectionsAreCollapsed((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <footer className="footer pt-8 sm:pt-16 border-t bg-grayish">
      <div className="pb-8 border-gray-300 container">
        <div className="grid sm:grid-cols-2 md:grid-cols-5 sm:gap-24 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col gap-4 sm:gap-6">
              <div
                className="flex cursor-pointer justify-between items-center"
                onClick={() => toggleSection(index)}
              >
                <h2 className="font-medium leading-3 text-base md:text-lg">
                  {category.title}
                </h2>
                <div
                  className={`sm:hidden transition-transform duration-300 ${
                    sectionsAreCollapsed[index] ? "" : "rotate-180"
                  }`}
                >
                  <ArrowDown2
                    size="20"
                    variant="Outline"
                    className="text-gray-700"
                  />
                </div>
              </div>
              <ul
                className={`flex flex-col gap-4 pl-2 md:pl-0 text-sm ${
                  sectionsAreCollapsed[index] ? "hidden" : "flex"
                } sm:flex`}
              >
                {category.links.map((link, linkIndex) => (
                  <li
                    key={linkIndex}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col container divide-y-2 text-sm">
        <div className="flex w-full py-4 justify-center items-center">
          <div className="flex w-full sm:flex-row flex-col justify-between items-center gap-8 md:gap-4">
            <SocialMediaAction />

            <div className="flex gap-8 items-center text-sm">
              <div className="flex gap-1 items-center">
                <Global variant="Outline" size={20} /> English
              </div>
              <div className="flex gap-1 items-center">
                <Global size={20} variant="Outline" /> USD
              </div>
            </div>
          </div>
        </div>

        <div className="flex pt-4 pb-8 justify-center items-center">
          <div className="flex w-full sm:flex-row flex-col justify-between items-center gap-4">
            <p className="font-black text-sm opacity-65">
              &copy; 2024 &reg; La Chaise Innovations
            </p>
            <div className="flex flex-row gap-1.5 h-max text-center md:text-start md:justify-start justify-center sm:gap-6 items-center flex-wrap">
              <Link className="text-xs md:text-sm" href="/">
                Terms of Service
              </Link>
              <b>.</b>
              <Link className="text-xs md:text-sm" href="/">
                Privacy Policy
              </Link>
              <b>.</b>
              <Link className="text-xs md:text-sm" href="/">
                Accessibility
              </Link>
              <b>.</b>
              <Link className="text-xs md:text-sm" href="/">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
