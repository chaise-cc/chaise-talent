import FormHeader from "@/components/custom/FormHeader";
import PhoneNumberInput from "@/components/custom/PhoneNumberInput";
import Link from "next/link";

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

      <Link href={"/"} className="text-sm flex mx-auto w-max underline">
        Go to website
      </Link>
    </div>
  );
}
