"use client";

import { useState } from "react";
import CreateServiceStepOne from "./createService/Stepone";
import CreateServiceStepTwo from "./createService/StepTwo";
import CreateServiceStepThree from "./createService/StepThree";
import CreateServiceStepFour from "./createService/StepFour";
import { ServiceFormData } from "@/types";

export default function CreateServiceScreen() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = (formData: ServiceFormData) => {
    console.log("Form data for step", currentStep, formData);
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSaveDraft = (formData: ServiceFormData) => {
    console.log("Draft saved:", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CreateServiceStepOne
            onSaveDraft={handleSaveDraft}
            onNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <CreateServiceStepTwo
            onSaveDraft={handleSaveDraft}
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
          />
        );
      case 3:
        return (
          <CreateServiceStepThree
            onSaveDraft={handleSaveDraft}
            onNextStep={handleNextStep}
            onBackStep={handleBackStep}
          />
        );
      case 4:
        return <CreateServiceStepFour />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col text-gray-700 gap-6 max-w-4xl my-8 mx-auto w-full p-8 rounded-xl border bg-white">
      {renderStep()}

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentStep === index + 1 ? "bg-main-color-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}