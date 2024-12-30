"use client";

import Link from "next/link";

// app/@[username]/error.tsx
export default function Error({ error }: { error: Error }) {
  return (
    <div className="container mx-auto text-center py-16">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <p className="mt-4">{error.message}</p>
      <Link href="/" className="text-blue-500 underline mt-4">
        Go Back Home
      </Link>
    </div>
  );
}
