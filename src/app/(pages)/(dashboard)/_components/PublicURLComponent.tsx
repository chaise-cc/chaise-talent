"use client";

import { Clipboard, ClipboardTick } from "iconsax-react";
import React, { useState } from "react";

type PublicURLComponentProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
};

const ClipboardButton: React.FC<{
  text: string;
  onCopy: () => void;
  isCopied: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ text, onCopy, isCopied }) => (
  <button
    onClick={onCopy}
    aria-label={isCopied ? "Copied!" : "Copy public URL to clipboard"}
    className="ml-2 p-1 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {isCopied ? (
      <ClipboardTick color="green" size={20} className="animate-scale" />
    ) : (
      <Clipboard color="black" size={20} />
    )}
  </button>
);

export default function PublicURLComponent({ user }: PublicURLComponentProps) {
  const [isCopied, setIsCopied] = useState(false);

  const publicURL = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/~/${user.username}`
    : null;

  const handleCopy = async () => {
    if (!publicURL) return;
    try {
      await navigator.clipboard.writeText(publicURL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  if (!user.username) return null;

  return (
    <div className="overflow-hidden pb-2 border-b">
      <h2 className="font-semibold text-lg text-gray-700">Public URL</h2>
      <div className="py-2">
        <div className="flex w-full items-center justify-between rounded-xl">
          {publicURL ? (
            <>
              <p
                className="text-sm text-ellipsis font-varela overflow-hidden font-semibold"
                title={publicURL}
              >
                {publicURL}
              </p>
              <ClipboardButton
                text={publicURL}
                onCopy={handleCopy}
                isCopied={isCopied}
              />
            </>
          ) : (
            <p className="text-red-500 text-sm font-medium">
              Public URL not available. Please check your configuration.
            </p>
          )}
        </div>
        {isCopied && (
          <p className="mt-2 text-green-600 text-sm font-medium animate-pulse">
            Copied!
          </p>
        )}
      </div>
    </div>
  );
}
