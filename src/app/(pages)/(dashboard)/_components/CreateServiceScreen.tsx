import CreateServiceStepone from "./createService/Stepone";
import CreateServiceStepThree from "./createService/StepThree";
import CreateServiceStepTwo from "./createService/StepTwo";

export default function CreateServiceScreen() {
  return (
    <div className="flex flex-col text-gray-700 gap-6 max-w-4xl my-8 mx-auto w-full p-8 rounded-xl border bg-white">
      {/*  */}

      <CreateServiceStepone />

      <CreateServiceStepTwo />

      <CreateServiceStepThree />
    </div>
  );
}
