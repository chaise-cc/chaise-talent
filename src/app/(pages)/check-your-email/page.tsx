// File: src/app/(pages)/check-your-email/page.tsx

import { Modal } from "@/components/custom/Modal";

export default async function CheckYourEmailPage() {
  return (
    <Modal className="md:max-w-lg h-max w-full p-8">
      <div className="p-8 space-y-4 flex flex-col justify-center">
        <h1 className="text-2xl font-bold">Check Your Email</h1>
        <p>
          Please check your inbox and click the link to verify your account.
        </p>
      </div>
    </Modal>
  );
}
