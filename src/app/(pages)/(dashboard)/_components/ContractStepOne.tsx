import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }: { message: string }) => (
  <span className="text-red-500 text-sm flex items-center mt-1" role="alert">
    <AlertCircle size={16} className="mr-2" /> {message}
  </span>
);

const StepOne = ({
  formData,
  setFormData,
  errors,
  validateField,
  onNext,
}: {
  formData: {
    email: string;
    contractName: string;
    description: string;
    contractType: string;
  };
  setFormData: (data: Partial<typeof formData>) => void;
  errors: Record<keyof typeof formData, string>;
  validateField: (field: keyof typeof formData) => boolean;
  onNext: () => void;
}) => {
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
  };

  const handleSubmit = () => {
    const allFieldsValid = Object.keys(formData).every((field) =>
      validateField(field as keyof typeof formData)
    );

    console.log(allFieldsValid);

    if (allFieldsValid) {
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
        <select
          id="contractType"
          className={`w-full md:text-lg text-base py-4  px-4 border rounded-lg ${
            errors.contractType ? "border-red-500" : "border-gray-300"
          }`}
          value={formData.contractType}
          onBlur={() => validateField("contractType")}
          onChange={(e) => handleInputChange("contractType", e.target.value)}
        >
          <option value="" disabled>
            Select the type of contract
          </option>
          <option value="Hourly">Hourly</option>
          <option value="Fixed">Fixed</option>
          <option value="Milestone">Milestone</option>
        </select>
        {errors.contractType && <ErrorMessage message={errors.contractType} />}
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 bg-main-color-500 hover:bg-main-color-300  text-black py-4 px-6 rounded-lg text-lg font-semibold"
      >
        Next
      </button>
    </div>
  );
};

export default StepOne;
