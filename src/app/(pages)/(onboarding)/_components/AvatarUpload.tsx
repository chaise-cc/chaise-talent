"use client";

import { Button } from "@/components/ui/button";
import { Add, Edit2 } from "iconsax-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const AvatarUpload = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      //   const file = event.target.files[0];
      //   const fileExt = file.name.split(".").pop();
      //   const fileName = `${Math.random()}.${fileExt}`;
      //   const filePath = `avatars/${fileName}`;
    } finally {
      setUploading(false);
    }
  }

  //
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
    uploadAvatar(event);
  };

  return (
    <>
      <div className="talent-avatar mx-auto mb-2 h-32 w-32 md:h-44 md:w-44 border-2 relative border-black bg-gray-100 border-dotted rounded-full">
        {previewUrl ? (
          <div className="relative h-full">
            <Image
              height={200}
              width={200}
              quality={100}
              src={previewUrl}
              alt="Avatar Preview"
              className="h-full w-full object-cover rounded-full"
            />
            <div className="absolute bottom-1 md:bottom-2 h-7 md:size-8 w-7 grid place-items-center right-1 md:right-2 upload-button z-50 bg-main-color-500 text-white rounded-full cursor-pointer">
              <Edit2 color="black" size={14} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div
              className="absolute bottom-1 md:bottom-2 md:h-8 md:w-8 h-7 w-7 grid place-items-center md:right-2 right-1 upload-button z-50 bg-main-color-500 text-white rounded-full cursor-pointer"
              onClick={handleFileInputClick}
            >
              <Plus className="text-base md:text-xl" size={20} />
            </div>
            <p className="font-varela text-sm md:text-base font-medium">
              Upload photo
            </p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {previewUrl && (
        <div className="flex w-max mb-4 mx-auto gap-4">
          <Button
            type="button"
            className="flex bg-red-500 hover:bg-red-100 border border-transparent hover:border-red-500 pl-2 pr-4 text-white hover:text-black py-4 gap-1 font-semibold text-sm w-max  leading-none"
            onClick={() => setPreviewUrl("")}
          >
            <Add className="rotate-45 text-xl" size={20} color="black" /> Remove
          </Button>

          <Button
            type="button"
            className="flex bg-green-500 text-white hover:bg-green-100 border border-transparent hover:border-green-500 hover:text-black py-4 font-semibold text-sm mx-auto w-max mb-4 pr-3 leading-none"
            onClick={handleFileInputClick}
          >
            Upload another
          </Button>
        </div>
      )}
    </>
  );
};

export default AvatarUpload;