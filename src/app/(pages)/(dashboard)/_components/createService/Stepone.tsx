"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import TagInput from "@/components/custom/TagInput";
import { ServiceFormData } from "@/types";

export default function CreateServiceStepOne({
  onSaveDraft,
  onNextStep,
}: {
  onSaveDraft: (formData: Partial<ServiceFormData>) => void;
  onNextStep: (formData: Partial<ServiceFormData>) => void;
}) {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    category: "",
    subCategory: "",
    jobTitles: [],
    keywords: [],
  });

  const handleInputChange =
    (field: keyof Omit<ServiceFormData, "jobTitles" | "keywords">) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleTagsChange =
    (field: "jobTitles" | "keywords") => (tags: string[]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: tags,
      }));
    };

  const handleNext = () => {
    onNextStep(formData);
  };

  const handleSave = () => {
    onSaveDraft(formData);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Step 1: Overview</h2>
        <Button variant="outline" size="sm" onClick={handleSave}>
          Save to Draft
        </Button>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        {/* Service Name */}
        <div className="flex flex-col gap-1">
          <Label className="font-medium text-base">Name of Service</Label>
          <input
            type="text"
            className="py-3 px-4 border rounded-md"
            placeholder="Enter the name of your service"
            value={formData.name}
            onChange={handleInputChange("name")}
          />
        </div>

        {/* Category & Subcategory */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-1/2">
            <Label className="font-medium text-base">Category</Label>
            <input
              type="text"
              className="py-3 px-4 border rounded-md"
              placeholder="Select a category"
              value={formData.category}
              onChange={handleInputChange("category")}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <Label className="font-medium text-base">Subcategory</Label>
            <input
              type="text"
              className="py-3 px-4 border rounded-md"
              placeholder="Select a subcategory"
              value={formData.subCategory}
              onChange={handleInputChange("subCategory")}
            />
          </div>
        </div>

        {/* Job Titles */}
        <div className="flex flex-col gap-1">
          <Label className="font-medium text-base">Associated Job Titles</Label>
          <TagInput
            tags={formData.jobTitles}
            onChange={handleTagsChange("jobTitles")}
            placeholder="Enter job titles and press Enter"
            maxTags={3}
          />
          <small className="text-sm text-gray-500 ml-auto">
            3 tags maximum. Separate each tag with a comma
          </small>
        </div>

        {/* Keywords */}
        <div className="flex flex-col gap-1">
          <Label className="font-medium text-base">Relevant Keywords</Label>
          <TagInput
            tags={formData.keywords}
            onChange={handleTagsChange("keywords")}
            placeholder="Enter keywords and press Enter"
            maxTags={5}
          />
          <small className="text-sm text-gray-500 ml-auto">
            5 tags maximum. Separate each tag with a comma
          </small>
        </div>
      </div>

      {/* Next Button */}
      <Button
        className="ml-auto rounded-full px-8 py-4 flex items-center gap-2"
        onClick={handleNext}
      >
        Next <ArrowRight />
      </Button>
    </div>
  );
}
