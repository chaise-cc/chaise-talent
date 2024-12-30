import { Button } from "@/components/ui/button";
import { Add, Edit2 } from "iconsax-react";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const AvatarInput = ({
  previewUrl,
  onFileChange,
  onRemove,
  fileInputRef, // Prop from parent
}: {
  previewUrl: string | undefined;
  onFileChange: (file: File | null) => void;
  onRemove: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>; // Allow only HTMLInputElement, no null
}) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("File size must be less than 1MB.");
        return;
      }
      onFileChange(file);
    }
    // Reset the input value to allow re-uploading the same file if needed
    event.target.value = "";
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click(); // Safely access and click the file input
  };

  return (
    <>
      <div className="talent-avatar mx-auto mb-2 h-32 w-32 md:h-44 md:w-44 border-2 relative border-black bg-gray-100 border-dotted rounded-full">
        {previewUrl ? (
          <div className="relative h-full">
            <Image
              height={200}
              width={200}
              src={previewUrl}
              alt="Avatar Preview"
              className="h-full w-full object-cover rounded-full"
            />
            <div
              className="absolute bottom-1 md:bottom-2 h-7 md:h-8 w-7 md:w-8 grid place-items-center right-1 md:right-2 upload-button z-50 bg-main-color-500 text-white rounded-full cursor-pointer"
              onClick={handleFileInputClick} // Fixed invocation
              aria-label="Edit Avatar"
            >
              <Edit2 color="black" size={14} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-white opacity-80">
            <div
              className="absolute bottom-1 md:bottom-2 h-7 w-7 md:h-8 md:w-8 grid place-items-center right-1 md:right-2 upload-button z-50 bg-main-color-500 text-white rounded-full cursor-pointer"
              onClick={handleFileInputClick} // Fixed invocation
              aria-label="Upload Avatar"
            >
              <Plus className="text-base md:text-xl" size={20} />
            </div>
            <p className="font-varela text-sm md:text-base font-medium">
              Upload photo
            </p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileSelect}
      />
      {previewUrl && (
        <div className="flex w-max mb-4 mx-auto gap-4">
          <Button
            type="button"
            className="flex bg-red-500 hover:bg-red-100 border border-transparent hover:border-red-500 pl-2 pr-4 text-white hover:text-black py-4 gap-1 font-semibold text-sm w-max leading-none"
            onClick={onRemove} // Fixed invocation
            aria-label="Remove Avatar"
          >
            <Add className="rotate-45 text-xl" size={20} color="black" /> Remove
          </Button>

          <Button
            type="button"
            className="flex bg-green-500 text-white hover:bg-green-100 border border-transparent hover:border-green-500 hover:text-black py-4 font-semibold text-sm mx-auto w-max mb-4 pr-3 leading-none"
            onClick={handleFileInputClick} // Fixed invocation
            aria-label="Upload Another Avatar"
          >
            Upload another
          </Button>
        </div>
      )}
    </>
  );
};

export default AvatarInput;
