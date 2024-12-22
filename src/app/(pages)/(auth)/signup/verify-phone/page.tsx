import FormHeader from "@/components/custom/FormHeader";
import PhoneNumberInput from "@/components/custom/PhoneNumberInput";

export default function VerifyPhone() {
  return (
    <div className="w-full">
      <FormHeader
        title="Verify Phone Number"
        description="Verify your number to get started"
      />

      <div className="mt-12 w-full">
        <PhoneNumberInput />
      </div>
    </div>
  );
}
