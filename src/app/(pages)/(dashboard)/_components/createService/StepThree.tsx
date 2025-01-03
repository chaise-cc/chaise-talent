/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "iconsax-react";

type MilestoneProps = {
  index: number;
  description: string;
  duration: string;
  amount: string;
  onChange: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
};

const Milestone: React.FC<MilestoneProps> = ({
  index,
  description,
  duration,
  amount,
  onChange,
  onRemove,
}) => (
  <div className="flex gap-4 w-full items-center">
    <div className="flex flex-col w-full gap-1">
      <Label>Description</Label>
      <Input
        value={description}
        onChange={(e) => onChange(index, "description", e.target.value)}
        placeholder="Enter milestone description"
      />
    </div>
    <div className="flex flex-col w-full gap-1">
      <Label>Duration</Label>
      <Input
        value={duration}
        onChange={(e) => onChange(index, "duration", e.target.value)}
        placeholder="Enter duration"
      />
    </div>
    <div className="flex flex-col w-full gap-1">
      <Label>Amount</Label>
      <Input
        type="number"
        value={amount}
        onChange={(e) => onChange(index, "amount", e.target.value)}
        placeholder="Enter amount"
      />
    </div>
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="text-red-500 font-bold"
    >
      ✕
    </button>
  </div>
);

export default function CreateServiceStepThree({
  onSaveDraft,
  onNextStep,
  onBackStep,
}: {
  onSaveDraft: (data: any) => void;
  onNextStep: (data: any) => void;
  onBackStep: () => void;
}) {
  const [pricingPlan, setPricingPlan] = useState<"fixed" | "milestone">(
    "fixed"
  );
  const [fixedPrice, setFixedPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState({
    duration: "",
    unit: "day",
  });
  const [milestones, setMilestones] = useState<
    { description: string; duration: string; amount: string }[]
  >([]);

  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      { description: "", duration: "", amount: "" },
    ]);
  };

  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
    setMilestones(updatedMilestones);
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Step 3: Pricing</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSaveDraft({ pricingPlan, fixedPrice, milestones })}
        >
          Save to Draft
        </Button>
      </div>

      {/* Pricing Plan - Pill-like badges */}
      <div className="flex flex-col gap-1">
        <Label className="font-medium text-base">
          Choose your pricing plan
        </Label>
        <div className="flex gap-2 mt-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              pricingPlan === "fixed"
                ? "bg-main-color-600 text-white"
                : "bg-gray-200 text-gray-600"
            } hover:bg-main-color-500 hover:text-white`}
            onClick={() => setPricingPlan("fixed")}
          >
            Fixed Price
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              pricingPlan === "milestone"
                ? "bg-main-color-600 text-white"
                : "bg-gray-200 text-gray-600"
            } hover:bg-main-color-500 hover:text-white`}
            onClick={() => setPricingPlan("milestone")}
          >
            Milestone
          </button>
        </div>
      </div>

      {/* Fixed Price */}
      {pricingPlan === "fixed" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full gap-1">
            <Label className="font-medium text-base">Delivery Time</Label>
            <div className="flex gap-4 w-full">
              <select
                className="py-4 px-4 border rounded-xl w-full"
                value={deliveryTime.duration}
                onChange={(e) =>
                  setDeliveryTime({
                    ...deliveryTime,
                    duration: e.target.value,
                  })
                }
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <select
                className="py-4 px-4 border rounded-xl w-full"
                value={deliveryTime.unit}
                onChange={(e) =>
                  setDeliveryTime({ ...deliveryTime, unit: e.target.value })
                }
              >
                <option value="hour">Hour</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <Label className="font-medium text-base">Price</Label>
            <Input
              className="py-6"
              type="number"
              step={100}
              min={0}
              value={fixedPrice}
              onChange={(e) => setFixedPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>
        </div>
      )}

      {/* Milestones */}
      {pricingPlan === "milestone" && (
        <div className="flex flex-col gap-4">
          <Label className="font-medium text-base">Milestones</Label>
          {milestones.map((milestone, index) => (
            <Milestone
              key={index}
              index={index}
              description={milestone.description}
              duration={milestone.duration}
              amount={milestone.amount}
              onChange={handleMilestoneChange}
              onRemove={handleRemoveMilestone}
            />
          ))}
          <Button
            variant="outline"
            className="mt-4"
            onClick={handleAddMilestone}
          >
            Add Milestone
          </Button>
        </div>
      )}

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
          onClick={() =>
            onNextStep({ pricingPlan, fixedPrice, deliveryTime, milestones })
          }
        >
          Next <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
