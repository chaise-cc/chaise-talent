"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<React.ElementRef<"dialog">>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeModal = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) =>
    e.target === dialogRef.current && router.back();

  return (
    <dialog
      ref={dialogRef}
      onClick={closeModal}
      onClose={router.back}
      className="backdrop:bg-black/60 rounded-3xl overflow-y-hidden  w-screen md:w-[90%] h-full max-h-[90vh] backdrop:backdrop-blur-sm"
      style={{
        padding: "0", // Avoid default padding for better control
        overflow: "hidden", // Prevent dialog overflow
      }}
    >
      <div
        className=" h-full md:overflow-y-clip overflow-y-auto"
        style={{
          maxHeight: "90vh", // Constrain modal content height
        }}
      >
        {children}
      </div>
    </dialog>
  );
}
