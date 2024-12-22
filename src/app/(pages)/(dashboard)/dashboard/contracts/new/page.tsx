"use client";

import FormHeader from "@/components/custom/FormHeader";
import { Modal } from "@/components/custom/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "iconsax-react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
// import React, { useState } from "react";

export default function NewContractSetupPage() {
  // const [contractSteps, setContractSteps] = useState(3);
  const router = useRouter();

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    alert("d");
  };

  return (
    <Modal className="w-full h-max max-w-[90%] p-4 md:max-w-3xl">
      <div className="w-full py-8 px-6 md:px-8 rounded-xl  bg-main-color-50 bg-opacity-15">
        <FormHeader
          title="Create a project contract"
          description="Setup and send to client in minutes"
        />

        {/* Contract Steps */}

        <form onSubmit={handleFormSubmit} className="py-12 w-full">
          <div className="flex flex-col gap-8 w-full">
            {/*  */}
            <div className="flex gap-1 flex-col w-full">
              <Label className="text-base">Contract title</Label>
              <Input
                className="md:text-lg text-base py-6"
                placeholder="What's this contract for?"
                type="email"
              />
            </div>

            {/*  */}
            <div className="flex gap-1 flex-col w-full">
              <Label className="text-base">Contract Description</Label>
              <Input
                className="md:text-lg text-base py-6"
                placeholder="What are the expectations of this contract?"
                type="email"
              />
            </div>

            {/*  */}
            <div className="flex gap-1 flex-col w-full">
              <Label className="text-base">Contract type</Label>

              <Select>
                <SelectTrigger className="w-full py-6 text-base">
                  <SelectValue placeholder="Select Payment Mode" />
                </SelectTrigger>
                <SelectContent className="text-black font-medium !text-base">
                  <SelectItem value="light">Hourly</SelectItem>
                  <SelectItem value="dark">Fixed</SelectItem>
                  <SelectItem value="system">Milestone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full justify-between items-center gap-4">
              {/*  */}
              <Button
                onClick={() => router.push("/dashboard/contracts")}
                className="w-max border border-red-500 hover:bg-red-500  bg-white flex items-center text-black leading-none font-semibold py-5 px-4  mt-8"
              >
                <Plus size={20} className="rotate-45" />
                Close
              </Button>
              {/*  */}
              <Button
                type="submit"
                className="w-max hover:bg-main-color-50 border-transparent hover:border-main-color-500 border bg-main-color-500  flex items-center text-black font-semibold py-5 px-6 mt-8"
              >
                Next <ArrowRight size={20} color="black" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

// const ContractStepOne = () => {
//   return "step one";
// };

// const ContractStepTwo = () => {
//   return "step one";
// };

// const ContractStepThree = () => {
//   return "step one";
// };
