import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Image } from "iconsax-react";
import { ArrowRight, Edit2Icon } from "lucide-react";
import React from "react";

export default function CreateServiceStepTwo() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2></h2>
        <h3 className="font-bold text-sm">Description</h3>

        <div className=""></div>
      </div>

      {/*  */}
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center justify-between mb-1">
          <Label className="font-medium text-base">Description</Label>

          <Button variant={"outline"}>
            <Edit2Icon size={16} /> Generate with AI
          </Button>
        </div>
        <Textarea rows={5} className="py-6" />
        <small className="ml-auto block ">0/80 characters</small>
      </div>

      {/*  */}

      <div className="flex flex-col gap-1">
        <Label className="font-medium text-base">
          Service Images (up to 3)
        </Label>{" "}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col w-full h-48 justify-center items-center  rounded-xl bg-gray-100">
            <Image
              variant="Outline"
              color="black"
              size={32}
              className="h-max"
            />
            <p className="text-sm h-max text-center p-4">
              Drag and drop a photo here or browse
            </p>
          </div>
          <div className="flex flex-col w-full h-48 justify-center items-center  rounded-xl bg-gray-100">
            {" "}
            <Image
              variant="Outline"
              color="black"
              size={32}
              className="h-max"
            />
            <p className="text-sm h-max text-center p-4">
              Drag and drop a photo here or browse
            </p>
          </div>
          <div className="flex flex-col w-full h-48 justify-center items-center  rounded-xl bg-gray-100">
            {" "}
            <Image
              variant="Outline"
              color="black"
              size={32}
              className="h-max"
            />
            <p className="text-sm h-max text-center p-4">
              Drag and drop a photo here or browse
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-4 items-center gap-4 ml-auto">
        <Button
          variant={"outline"}
          className="gap-2 rounded-full font-semibold px-8 py-6 w-max "
        >
          <ArrowLeft size={18} color="gray" /> Back
        </Button>
        <Button className="gap-2 font-semibold px-8 py-6 rounded-full">
          Next <ArrowRight size={18} color="gray" />
        </Button>
      </div>
    </>
  );
}
