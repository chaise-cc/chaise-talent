import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import React from "react";

export default function CreateServiceStepone() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2></h2>
        <h3 className="font-bold text-sm">Overview</h3>
        <div className=""></div>
      </div>

      {/*  */}
      <div className="flex flex-col gap-1">
        <Label className="font-medium text-base">Name of Service</Label>
        <Input className="py-6" />
      </div>

      {/*  */}
      <div className="flex gap-4">
        {/*  */}
        <div className="flex flex-col w-full gap-1">
          <Label className="font-medium text-base">Category</Label>
          <Input className="py-6" placeholder="Select Category" />
        </div>

        {/*  */}
        <div className="flex flex-col w-full gap-1">
          <Label className="font-medium text-base">&nbsp;</Label>
          <Input className="py-6" placeholder="Select Subcategory" />
        </div>
      </div>

      {/*  */}
      <div className="flex flex-col w-full gap-1">
        <Label className="font-medium text-base">Associated Job Titles</Label>
        <Input
          className="py-6"
          placeholder="Titles associated with one who provides this service"
        />
        <small className="block ml-auto">
          3 tags maximum. Separate each tag with a comma
        </small>
      </div>

      {/*  */}
      <div className="flex flex-col w-full gap-1">
        <Label className="font-medium text-base">Relevant keywords</Label>
        <Input
          className="py-6"
          placeholder="Add keywords to help clients find your service"
        />
        <small className="block ml-auto">
          5 tags maximum. Separate each tag with a comma
        </small>
      </div>

      <Button className="ml-auto rounded-full px-8 py-6  gap-2 mt-4">
        Next <ArrowRight />
      </Button>
    </>
  );
}
