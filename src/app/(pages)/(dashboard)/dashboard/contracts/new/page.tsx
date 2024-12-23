"use client";

import { useState } from "react";
import FormHeader from "@/components/custom/FormHeader";
import { Modal } from "@/components/custom/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ArrowRight, ArrowLeft } from "iconsax-react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ContractStepTwo from "../../../_components/ContractStepTwo";
import ContractStepOne from "../../../_components/ContractStepOne";

export default function NewContractSetupPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
    } else {
      // Simulate form submission
      alert("Form submitted successfully!");
    }
  };

  return (
    <Modal className="w-full max-w-[90%] relative overflow-y-scroll p-4 md:max-w-3xl">
      <div className="w-full py-8 px-6 md:px-8 rounded-xl bg-main-color-50 bg-opacity-15">
        {step === 1 && (
          <FormHeader
            title="Create a project contract"
            description="Setup and send to client in minutes"
          />
        )}
        {/* Contract Steps */}
        <form onSubmit={handleFormSubmit} className="py-8 w-full">
          <div className="flex flex-col gap-8 w-full">
            {step === 1 && <ContractStepOne onNext={handleNext} />}
            {step === 2 && <ContractStepTwo />}
            {step === 3 && <StepThree />}

            <div className="flex w-full justify-between items-center gap-4">
              {/* Back or Close Button */}
              {step > 1 ? (
                <Button
                  type="button"
                  onClick={handleBack}
                  className="w-max border border-gray-500 hover:bg-gray-200 bg-white flex items-center text-black font-semibold py-5 px-4 mt-8"
                >
                  <ArrowLeft size={20} className="mr-2" color="black" /> Back
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => router.push("/dashboard/contracts")}
                  className="w-max border border-red-500 hover:bg-red-500 bg-white flex items-center text-black font-semibold py-5 px-4 mt-8"
                >
                  <Plus size={20} className="rotate-45" />
                  Close
                </Button>
              )}

              {/* Next or Submit Button */}
              <Button
                type="submit"
                className="ml-auto w-max hover:bg-main-color-50 border-transparent hover:border-main-color-500 border bg-main-color-500 flex items-center text-black font-semibold py-5 px-6 mt-8"
              >
                {step < 3 ? (
                  <>
                    Next <ArrowRight size={20} color="black" className="ml-2" />
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

const StepThree = () => {
  return (
    <div>
      <div className="flex gap-1 flex-col w-full">
        <Label className="text-base">Additional Notes</Label>
        <Input
          className="md:text-lg text-base py-6"
          placeholder="Add any additional information here"
          type="text"
        />
      </div>
    </div>
  );
};
