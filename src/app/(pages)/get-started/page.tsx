"use client";

import { Modal } from "@/components/custom/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Helper function to detect if the device is an iPhone
const GetStartedPage = () => {
  const [onboardAs, setOnboardAs] = useState("");

  // Handle category selection
  const handleOnboardAs = (value: string) => {
    setOnboardAs(value);
  };

  return (
    <Modal className="w-full h-max md:max-w-3xl">
      <div className="p-8 flex flex-col h-full items-center w-full justify-center">
        <Link href={"/"} className="mb-12">
          <Image
            quality={100}
            src="/images/chaise-yellow.png"
            alt="Chaise - The Future of Freelancing"
            height={48}
            width={200}
            loading="lazy"
            className=" h-8 w-auto object-cover"
          />
        </Link>

        <h2 className="text-2xl md:text-3xl text-center mb-4 md:mb-8 font-medium">
          JOIN AS A CLIENT OR FREELANCER
        </h2>

        <RadioGroup
          name="onboardAs"
          onValueChange={handleOnboardAs}
          className="flex flex-col gap-4  w-full !text-sm md:!text-base"
        >
          <Label className="p-6 rounded-xl border w-full font-medium border-gray-300 bg-white flex gap-4 items-center">
            <RadioGroupItem value="client" className="" />
            I&apos;m hiring for a project
          </Label>

          <Label className="p-6 rounded-xl border font-medium border-gray-300 bg-white flex gap-4 items-center">
            <RadioGroupItem value="talent" />
            I&apos;m ready to work
          </Label>
        </RadioGroup>

        <Link
          href={`signup?accountType=${onboardAs}`}
          className="flex flex-col gap-2 text-center w-max mx-auto justify-center items-center mt-8"
        >
          <Button
            disabled={!onboardAs}
            className="rounded-full leading-none flex gap-2"
          >
            Continue <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </Modal>
  );
};

export default GetStartedPage;
