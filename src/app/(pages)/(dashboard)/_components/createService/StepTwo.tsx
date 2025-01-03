"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Edit, Image } from "iconsax-react";
import { ArrowRight } from "lucide-react";

type ServiceImageUploaderProps = {
  images: File[];
  onChange: (updatedImages: File[]) => void;
  maxImages?: number;
};

const ServiceImageUploader: React.FC<ServiceImageUploaderProps> = ({
  images,
  onChange,
  maxImages = 3,
}) => {
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, maxImages - images.length);
      onChange([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative flex flex-col w-full h-48 justify-center items-center rounded-xl bg-gray-100"
        >
          <img
            src={URL.createObjectURL(image)}
            alt={`Service image ${index + 1}`}
            className="object-cover w-full h-full rounded-xl"
          />
          <button
            type="button"
            onClick={() => handleRemoveImage(index)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          >
            ✕
          </button>
        </div>
      ))}
      {images.length < maxImages && (
        <label
          htmlFor="image-uploader"
          className="flex flex-col w-full h-48 justify-center items-center rounded-xl bg-gray-100 cursor-pointer"
        >
          <Image variant="Outline" color="black" size={32} className="h-max" />
          <p className="text-sm h-max text-center p-4">
            Drag and drop a photo here or browse
          </p>
          <input
            id="image-uploader"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddImage}
          />
        </label>
      )}
    </div>
  );
};

export default function CreateServiceStepTwo({
  onSaveDraft,
  onNextStep,
  onBackStep,
}: {
  onSaveDraft: (data: { description: string; images: File[] }) => void;
  onNextStep: (data: { description: string; images: File[] }) => void;
  onBackStep: () => void;
}) {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const maxDescriptionLength = 80;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Step 2: Description</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSaveDraft({ description, images })}
        >
          Save to Draft
        </Button>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center mb-1">
          <Label className="font-medium text-base">Description</Label>
          <Button size="sm" variant="outline">
            <Edit color="gray" size={14} /> Generate with AI
          </Button>
        </div>
        <Textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={maxDescriptionLength}
          placeholder="Write a short description of your service..."
          className="py-3 px-4 border rounded-md"
        />
        <small className="ml-auto text-sm text-gray-500">
          {description.length}/{maxDescriptionLength} characters
        </small>
      </div>

      {/* Service Images */}
      <div className="flex flex-col gap-1">
        <Label className="font-medium text-base">
          Service Images (up to 3)
        </Label>
        <ServiceImageUploader images={images} onChange={setImages} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          variant="outline"
          className="gap-2 rounded-full font-semibold px-8 py-4"
          onClick={onBackStep}
        >
          <ArrowLeft size={18} /> Back
        </Button>
        <Button
          className="gap-2 rounded-full font-semibold px-8 py-4"
          onClick={() => onNextStep({ description, images })}
        >
          Next <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
