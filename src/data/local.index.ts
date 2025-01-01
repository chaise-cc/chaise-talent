// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const steps = (user: any) => [
  {
    label: "Update your profile",
    href: "/dashboard/update",
    completed: user.username && user?.social_accounts.length >= 1 && user.bio,
  },
  {
    label: "Add work experience(s)",
    href: "/dashboard/settings?tab=profile",
    completed: false,
  },
  {
    label: "Create your first service",
    href: "/dashboard/services/new",
    completed: false,
  },

  {
    label: "Setup withdrawal method",
    href: "/dashboard/settings?tab=withdrawals",
    completed: false,
  },
];
