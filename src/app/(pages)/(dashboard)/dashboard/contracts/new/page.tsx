"use client";

import { useState } from "react";
import FormHeader from "@/components/custom/FormHeader";
import { Modal } from "@/components/custom/Modal";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ContractStepTwo from "../../../_components/ContractStepTwo";
import ContractStepOne from "../../../_components/ContractStepOne";

export default function NewContractSetupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    contractName: "",
    description: "",
    contractType: "",
    milestones: [] as { title: string; amount: string; dueDate: string }[],
  });
  const [errors, setErrors] = useState({
    email: "",
    contractName: "",
    description: "",
    contractType: "",
  });
  const router = useRouter();

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const validateField = (field: keyof typeof formData) => {
    let error = "";
    if (
      field === "email" &&
      !formData.email.match(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    ) {
      error = "Please enter a valid email address.";
    } else if (
      field !== "milestones" &&
      typeof formData[field] === "string" &&
      !formData[field]?.trim()
    ) {
      error = "This field is required.";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));

    return !error;
  };

  const validateAllFields = () => {
    const fieldsToValidate = Object.keys(formData).filter(
      (key) => key !== "milestones"
    ) as (keyof typeof formData)[];
    const validationResults = fieldsToValidate.map((field) =>
      validateField(field)
    );
    return validationResults.every(Boolean);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      if (validateAllFields()) {
        handleNext();
      }
    } else {
      alert("Form submitted successfully!");
    }
  };

  const handleFormDataUpdate = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <Modal className="w-full max-w-[90%] relative overflow-y-scroll p-4 md:max-w-3xl">
      <Plus
        size={18}
        onClick={() => router.push("/dashboard/contracts")}
        className="rotate-45 cursor-pointer font-bold absolute top-4 right-4 bg-red-500 text-white"
      />
      <div className="w-full py-8 px-6 md:px-8 rounded-xl bg-main-color-50 bg-opacity-15">
        {step === 1 && (
          <FormHeader
            title="Create contract"
            description="Setup and send to client in minutes"
          />
        )}
        <form onSubmit={handleFormSubmit} className="py-8 w-full">
          <div className="flex flex-col gap-8 w-full">
            {step === 1 && (
              <ContractStepOne
                formData={formData}
                setFormData={handleFormDataUpdate}
                errors={errors}
                validateField={validateField}
                onNext={handleNext}
              />
            )}
            {step === 2 && (
              <ContractStepTwo
                formData={formData}
                setFormData={handleFormDataUpdate}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            )}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold">Step Three</h2>
                <p>Finalize your contract setup here.</p>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-main-color-500 text-white rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
