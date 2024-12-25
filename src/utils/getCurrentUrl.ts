"use client";

export function getCurrentUrl() {
  if (typeof window === "undefined") {
    return ""; // Return an empty string for non-browser environments
  }

  const { pathname, search } = window.location;
  return `${pathname}${search}`;
}
