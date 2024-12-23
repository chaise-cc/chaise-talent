import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }: { message: string }) => (
  <span className="text-red-500 text-sm flex items-center mt-1" role="alert">
    <AlertCircle size={16} className="mr-2" /> {message}
  </span>
);

const ContractStepOne = ({ onNext }: { onNext: () => void }) => {
  const [formData, setFormData] = useState({
    email: "",
    contractName: "",
    description: "",
    contractType: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    contractName: "",
    description: "",
    contractType: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when user starts typing
  };

  const validateField = (field: keyof typeof formData) => {
    let error = "";
    if (
      field === "email" &&
      !formData.email.match(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    ) {
      error = "Please enter a valid email address.";
    } else if (!formData[field].trim()) {
      error = "This field is required.";
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateAllFields = () => {
    const emailValid = validateField("email");
    const contractNameValid = validateField("contractName");
    const descriptionValid = validateField("description");
    const contractTypeValid = validateField("contractType");
    return (
      emailValid && contractNameValid && descriptionValid && contractTypeValid
    );
  };

  const handleSubmit = () => {
    if (validateAllFields()) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Client Email */}
      <div className="flex flex-col w-full">
        <Label htmlFor="email" className="text-base font-medium">
          Client Email
        </Label>
        <Input
          id="email"
          className={`md:text-lg text-base py-6 ${
            errors.email ? "border-red-500" : ""
          }`}
          placeholder="Enter the client's email address"
          type="email"
          value={formData.email}
          onBlur={() => validateField("email")}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        {errors.email && <ErrorMessage message={errors.email} />}
      </div>

      {/* Contract Name */}
      <div className="flex flex-col w-full">
        <Label htmlFor="contractName" className="text-base font-medium">
          Contract Name
        </Label>
        <Input
          id="contractName"
          className={`md:text-lg text-base py-6 ${
            errors.contractName ? "border-red-500" : ""
          }`}
          placeholder="Name this contract (e.g., Web Design Agreement)"
          type="text"
          value={formData.contractName}
          onBlur={() => validateField("contractName")}
          onChange={(e) => handleInputChange("contractName", e.target.value)}
        />
        {errors.contractName && <ErrorMessage message={errors.contractName} />}
      </div>

      {/* Description */}
      <div className="flex flex-col w-full">
        <Label htmlFor="description" className="text-base font-medium">
          Description
        </Label>
        <Input
          id="description"
          className={`md:text-lg text-base py-6 ${
            errors.description ? "border-red-500" : ""
          }`}
          placeholder="Briefly describe the contract purpose and expectations"
          type="text"
          value={formData.description}
          onBlur={() => validateField("description")}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
        {errors.description && <ErrorMessage message={errors.description} />}
      </div>

      {/* Contract Type */}
      <div className="flex flex-col w-full">
        <Label htmlFor="contractType" className="text-base font-medium">
          Contract Type
        </Label>
        <Select
          onValueChange={(value) => {
            handleInputChange("contractType", value);
          }}
        >
          <SelectTrigger
            id="contractType"
            className={`w-full py-6 text-base ${
              errors.contractType ? "border-red-500" : ""
            }`}
          >
            <SelectValue placeholder="Select the type of contract" />
          </SelectTrigger>
          <SelectContent className="text-black font-medium !text-base">
            <SelectItem value="Hourly">Hourly</SelectItem>
            <SelectItem value="Fixed">Fixed</SelectItem>
            <SelectItem value="Milestone">Milestone</SelectItem>
          </SelectContent>
        </Select>
        {errors.contractType && <ErrorMessage message={errors.contractType} />}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-main-color-500 hover:bg-main-color-700 text-white py-4 px-6 rounded-lg text-lg font-semibold"
      >
        Next
      </button>
    </div>
  );
};

export default ContractStepOne;
