import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

const ContractStepTwo = () => {
  const [milestones, setMilestones] = useState([
    { title: "", amount: "", dueDate: "" },
  ]);

  const calculateTotals = () => {
    const total = milestones.reduce((sum, milestone) => {
      const amount = parseFloat(milestone.amount) || 0;
      return sum + amount;
    }, 0);
    const chaiseFee = total * 0.05;
    return { total, chaiseFee };
  };

  const { total, chaiseFee } = calculateTotals();

  const handleAddMilestone = () => {
    // Prevent adding a new milestone if any existing one is incomplete
    const hasEmptyFields = milestones.some(
      (milestone) => !milestone.title || !milestone.amount
    );
    if (!hasEmptyFields) {
      setMilestones((prev) => [
        ...prev,
        { title: "", amount: "", dueDate: "" },
      ]);
    }
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: keyof (typeof milestones)[0],
    value: string
  ) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index][field] = value;
    setMilestones(updatedMilestones);
  };

  return (
    <div className="flex flex-col gap-8  w-full">
      {/* Header */}
      <div className="sticky top-0 -mt-4  bg-white z-50">
        <h2 className="text-center py-5 w-full flex items-center justify-center text-5xl lg:text-6xl text-gray-700 font-light">
          <span className="text-main-color-500 text-5xl">$</span>
          {total.toFixed(2)}
        </h2>
        <h2 className="text-center py-4 border-t border-b w-full text-xl text-gray-500 font-medium ">
          Project Deliverables
        </h2>
      </div>

      {/* Milestones */}
      {milestones.map((milestone, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-4 border rounded-xl bg-main-color-50"
        >
          <div className="flex gap-1 flex-col w-full">
            <Label className="text-base font-medium">
              Milestone {index + 1}
            </Label>
            <Input
              className="md:text-lg bg-white text-base py-6"
              placeholder="Describe this milestone"
              type="text"
              value={milestone.title}
              onChange={(e) =>
                handleInputChange(index, "title", e.target.value)
              }
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-1 flex-col">
              <Label className="text-base font-medium">Amount</Label>
              <Input
                className="md:text-lg bg-white text-base py-6"
                placeholder="Enter amount"
                type="number"
                value={milestone.amount}
                onChange={(e) =>
                  handleInputChange(index, "amount", e.target.value)
                }
              />
            </div>

            <div className="flex flex-1 flex-col">
              <Label className="text-base font-medium">Due Date</Label>
              <Input
                className="md:text-lg bg-white text-base py-6"
                placeholder="Select a date"
                type="date"
                value={milestone.dueDate}
                onChange={(e) =>
                  handleInputChange(index, "dueDate", e.target.value)
                }
              />
            </div>
          </div>

          {milestones.length > 1 && (
            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full text-red-500 hover:bg-red-100"
              onClick={() => handleRemoveMilestone(index)}
            >
              <Trash size={16} className="mr-2" /> Remove Milestone
            </Button>
          )}
        </div>
      ))}

      {/* Add Milestone */}
      <Button
        type="button"
        variant="outline"
        className="mt-6 self-start text-main-color-500 hover:bg-main-color-100"
        onClick={handleAddMilestone}
        disabled={milestones.some(
          (milestone) => !milestone.title || !milestone.amount
        )}
      >
        <Plus size={16} className="mr-2" /> Add Milestone
      </Button>

      {/* Summary */}
      <div className="text-center !font-varela flex flex-col gap-2 w-full text-gray-700">
        <p className="text-lg  flex w-full justify-between">
          <span className="font-medium !font-varela">5.0% Chaise Fee:</span> $
          {chaiseFee.toFixed(2)}
        </p>
        <p className="text-lg font-semibold mt-2 flex w-full justify-between ">
          <span className="text-main-color-500 font-medium !font-varela">
            You&apos;ll Receive:
          </span>{" "}
          ${(total - chaiseFee).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ContractStepTwo;
