import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed h-screen w-screen bg-main-color-50 flex justify-center items-center flex-col gap-2">
      <h2 className="animate-pulse">Loading ...</h2>
    </div>
  );
}
