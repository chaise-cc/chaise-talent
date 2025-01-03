import { Label } from "@/components/ui/label";
import React from "react";

export default function CreateServiceStepThree() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2></h2>
        <h3 className="font-bold text-sm">Pricing</h3>

        <div className=""></div>
      </div>

      {/*  */}
      <div className="flex flex-col w-full gap-1">
        <Label className="font-medium text-base">Delivery Time</Label>

        <div className="flex gap-4 w-full">
          <select className="py-4 px-4 border rounded-xl w-full">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
            <option value="">6</option>
            <option value="">7</option>
            <option value="">8</option>
            <option value="">9</option>
            <option value="">10</option>
          </select>

          {/*  */}
          <select className="py-6">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
            <option value="">6</option>
            <option value="">7</option>
            <option value="">8</option>
            <option value="">9</option>
            <option value="">10</option>
          </select>
        </div>
      </div>
    </>
  );
}
