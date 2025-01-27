import servicesCategories from "./services-categories";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformServicesCategories = (categories: any[]) => {
  return categories.map((category) => ({
    text: category.name,
    href: `/services/${category.slug}`,
  }));
};

// Use this transformed data for navigation
const TRANSFORMED_SERVICE_CATEGORIES =
  transformServicesCategories(servicesCategories);

export const MOBILE_NAV_LINK_ITEMS = [
  {
    text: "Find Talents",
    isLast: false,
    children: TRANSFORMED_SERVICE_CATEGORIES,
  },
  {
    text: "Find Works",
    isLast: false,
    children: [
      { text: "Ways to earn", href: "" },
      { text: "Find works relevant to your skill", href: "" },
      { text: "Join Chaise Pro", href: "" },
    ],
  },
  { text: "Chaise Pro", isLast: false, href: "" },
  {
    text: "Explore",
    isLast: true,
    children: [
      { text: "Works made on Chaise", href: "" },
      { text: "Chaise Learn", href: "" },
      { text: "Blog", href: "" },
      { text: "Reviews", href: "" },
    ],
  },
];

export const DESKTOP_NAV_LINK_ITEMS = [
  { text: "Find Talents", haschildren: "true" },
  { text: "Find Works", haschildren: "true" },
  { text: "Chaise Learn", href: "/learn" },
  { text: "Explore", haschildren: "true" },
];

export const FIND_WORKS_LINK_ITEM = {
  text: "Find Works",
  children: [
    {
      href: "",
      title: "Ways to earn",
      desp: ["Learn about all the different opportunities chaise have for you"],
    },
    {
      href: "",
      title: "Find work relevant to your skills",
      desp: ["Explore the kind of work available for your skills"],
    },
    {
      href: "",
      title: "Join Chaise Pro",
      desp: "Learn how to be part of chaise pro to worrk with top Clients and earn higher",
    },
  ],
};

export const FIND_TALENTS_LINK_ITEM = {
  text: "Find Talents",
  isLast: false,
  children: [
    {
      title: "Categories",
      desp: TRANSFORMED_SERVICE_CATEGORIES,
    },
    {
      title: "Chaise Pro",
      desp: [{ text: "Hire the best in your industry", href: "" }],
    },
    {
      title: "How to hire",
      desp: [{ text: "Learn how to hire skilled talents", href: "" }],
    },
  ],
};

export const EXPLORE = {
  text: "Explore",
  isLast: false,

  children: [
    {
      href: "",
      text: "Works made on Chaise",
      desp: "Discover inspiring works made on chaise",
    },
    {
      slug: "/learn",
      text: "Chaise Learn",
      desp: "Learn how Chaise works",
    },
    {
      href: "/blog",
      text: "Blog",
      desp: "Get access to latest news, information and community stories",
    },
    {
      href: "",
      text: "Reviews",
      desp: "Learn what people have to say about us",
    },
  ],
};
