import React from "react";

export default function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-screen animate-pulse font-medium">
      <p>Loading...</p>
    </div>
  );
}
