"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import TagInput from "@/components/custom/TagInput";

export default function CreateServiceStepFour() {
  const [skills, setSkills] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">
          Step 4: Additional Information
        </h2>
      </div>

      {/* Add Skills */}
      <div className="flex flex-col w-full gap-1">
        <Label className="font-medium text-base">Add skills</Label>
        <TagInput
          tags={skills}
          onChange={setSkills}
          placeholder="What skills make you stand out?"
          maxTags={5}
        />
        <small className="block ml-auto">5 skills maximum.</small>
      </div>

      {/* Add Tools */}
      <div className="flex flex-col w-full gap-1">
        <Label className="font-medium text-base">Add tools</Label>
        <TagInput
          tags={tools}
          onChange={setTools}
          placeholder="What tools do you use for this service?"
          maxTags={8}
        />
        <small className="block ml-auto">8 tools maximum.</small>
      </div>

      {/* Additional Note */}
      <div className="flex flex-col gap-1">
        <Label className="font-medium text-base">Additional note</Label>
        <Textarea rows={4} className="py-6" />
        <small className="ml-auto block">0/80 characters</small>
      </div>

      <div className="flex mt-4 items-center gap-4 ml-auto">
        <Button
          variant="outline"
          className="gap-2 rounded-full font-semibold px-8 py-6 w-max"
        >
          <ArrowLeft size={18} color="gray" /> Back
        </Button>
        <Button className="gap-2 font-semibold px-8 py-6 rounded-full">
          Preview <ArrowRight size={18} color="gray" />
        </Button>
      </div>
    </>
  );
}
