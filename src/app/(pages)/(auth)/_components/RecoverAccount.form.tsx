"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { ForgotPasswordType, zodValidator } from "@/lib/validators";
import { CustomInputField } from "@/components/custom/input.custom";
import { ArrowRight } from "iconsax-react";

const RecoverAccountForm = () => {
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(zodValidator("forgotPassword")!),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordType) {
    // handle every other thing in the mutation function.
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-lg w-full py-4 mt-8"
      >
        <CustomInputField
          name="email"
          label="Email"
          placeholder="Email address"
          type="email"
          form={form}
        />

        <Button
          type="submit"
          className="w-max mx-auto flex py-6 text-sm font-semibold  bg-main-color-500 border  hover:bg-transparent border-transparent transition hover:border-main-color-500  text-gray-900"
        >
          Recover my account <ArrowRight size={20} color="black" />
        </Button>
      </form>
    </Form>
  );
};

export default RecoverAccountForm;
