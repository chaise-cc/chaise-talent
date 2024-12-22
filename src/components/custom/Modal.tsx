"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
  className?: string; // Optional className for additional styling
}

export function Modal({ children, className }: ModalProps) {
  const router = useRouter();
  const dialogRef = useRef<React.ElementRef<"dialog">>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeModal = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (e.target === dialogRef.current) {
      router.back();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={closeModal}
      onClose={router.back}
      className={`backdrop:bg-black/60 rounded-3xl overflow-y-hidden backdrop:backdrop-blur-sm h-full max-h-[90vh]  ${
        className || ""
      }`}
      style={{
        padding: "0", // Avoid default padding for better control
        overflow: "hidden", // Prevent dialog overflow
      }}
    >
      <div
        className="h-full md:overflow-y-clip overflow-y-auto"
        style={{
          maxHeight: "90vh", // Constrain modal content height
        }}
      >
        {children}
      </div>
    </dialog>
  );
}
