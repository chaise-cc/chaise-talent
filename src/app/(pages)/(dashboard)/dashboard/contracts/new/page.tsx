import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "iconsax-react";
import React from "react";

export default function NewContractSetupPage() {
  return (
    <div>
      <div className="w-full my-12 py-12 max-w-3xl mx-auto px-8 rounded-xl shadow-md bg-white">
        <h2 className="text-3xl font-bold text-center">New Contract</h2>

        <form action="" className="py-12">
          <div className="flex flex-col gap-8 w-full ">
            {/*  */}
            <div className="flex gap-1 flex-col w-full">
              <Label className="font-bold">Client&apos;s email</Label>
              <Input className="text-lg" type="email" />
            </div>
            {/*  */}
            <div className="flex gap-1 flex-col w-full">
              <Label className="font-bold">Contract title</Label>
              <Input className="text-lg" type="email" />
            </div>
            {/*  */}
            <div className="flex gap-1 flex-col w-full">
              <Label className="font-bold">Describe this Contract</Label>
              <Input className="text-lg" type="email" />
            </div>
            {/*  */}
            <div className="flex gap-1 flex-col w-full">
              <Label className="font-bold">Describe this Contract</Label>
              <select>
                <option value="">Hourly</option>
                <option value="">Fixed</option>
              </select>
            </div>

            {/*  */}

            <Button className="w-max ml-auto mt-8">
              Next <ArrowRight size={20} color="white" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
