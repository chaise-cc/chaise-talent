"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import TagInput from "@/components/custom/TagInput";
import axios from "axios";

type Service = {
  id: string;
  name: string;
};

type SubCategory = {
  id: string;
  name: string;
};

type ServiceFormData = {
  name: string;
  category: string;
  subCategory: string;
  jobTitles: string[];
  keywords: string[];
};

export default function CreateServiceStepOne({
  onSaveDraft,
  onNextStep,
  servicesCategories,
}: {
  onSaveDraft: (formData: Partial<ServiceFormData>) => void;
  onNextStep: (formData: Partial<ServiceFormData>) => void;
  servicesCategories: Service[];
}) {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    category: "",
    subCategory: "",
    jobTitles: [],
    keywords: [],
  });

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  const handleInputChange =
    (field: keyof Omit<ServiceFormData, "jobTitles" | "keywords">) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = event.target.value;

    setFormData((prev) => ({
      ...prev,
      category: categoryId,
      subCategory: "", // Reset subcategory when category changes
    }));

    if (!categoryId) {
      setSubCategories([]);
      return;
    }

    try {
      setLoadingSubCategories(true);
      const response = await axios.get(
        `/api/subcategories?categoryId=${categoryId}`
      );
      setSubCategories(response.data); // Assuming the API returns an array of subcategories
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    } finally {
      setLoadingSubCategories(false);
    }
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
          {/* Category */}
          <div className="flex flex-col gap-1 w-1/2">
            <Label className="font-medium text-base">Category</Label>
            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="p-4 py-3 border text-sm rounded-md"
            >
              <option value="">Select a category</option>
              {servicesCategories.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div className="flex flex-col gap-1 w-1/2">
            <Label className="font-medium text-base">Subcategory</Label>
            <select
              value={formData.subCategory}
              onChange={handleInputChange("subCategory")}
              className="p-4 py-3 border text-sm rounded-md"
              disabled={!formData.category || loadingSubCategories}
            >
              <option value="">Select a subcategory</option>
              {subCategories.map((subCategory) => (
                <option value={subCategory.id} key={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
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
        className="ml-auto rounded-full px-8 py-6 mt-8 flex items-center gap-2"
        onClick={handleNext}
      >
        Next <ArrowRight />
      </Button>
    </div>
  );
}
