/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import Link from "next/link";
// import { useVerifyEmail } from "@/app/services/Auth";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const VerifyEmailForm = () => {
  /*
    idea
    1.  In my opinion this page should be a dynamic page as to allow otp code verification directly from link sent to email
    i.e the famous 'click the link below to varify' option.
    
    2. There should be a resend otp option button *
  */

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  // const url = searchParams.get("/on");

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   router.push("/onboarding/talent/get-started");

  //   setTimeout(() => {
  //     toast.success("OTP Verified", {
  //       position: "top-right",
  //     });
  //     closeModal();
  //   }, 2000);
  // }
  //   const verifyEmailMutation = useVerifyEmail();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // if (!email) {
    //   toast.error("Email is missing in the URL.");
    //   return;
    // }

    alert("email success");

    //     verifyEmailMutation.mutate(
    //       { email, otp: Number(data.pin) },
    //       {
    //         onSuccess: () => {
    //           toast.success("OTP Verified");
    //           closeModal();
    //           router.push("/onboarding/talent/get-started");
    //         },
    //         onError: (error) => {
    //           toast.error(error.message || "Failed to verify OTP");
    //         },
    //       }
    //     );
    //   }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-12 mt-12"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="w-full text-xl flex flex-col items-center justify-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field} className="l">
                    <InputOTPGroup autoFocus className="font-medium space-x-2">
                      <InputOTPSlot
                        className="!text-5xl md:text-6xl h-14 md:h-18 w-14 md:w-18 border"
                        index={0}
                      />
                      <InputOTPSlot
                        className="!text-5xl md:text-6xl h-14 md:h-18 w-14 md:w-18 border"
                        index={1}
                      />
                      <InputOTPSlot
                        className="!text-5xl md:text-6xl h-14 md:h-18 w-14 md:w-18 border"
                        index={2}
                      />
                      <InputOTPSlot
                        className="!text-5xl md:text-6xl h-14 md:h-18 w-14 md:w-18 border"
                        index={3}
                      />
                      <InputOTPSlot
                        className="!text-5xl md:text-6xl h-14 md:h-18 w-14 md:w-18 border"
                        index={4}
                      />
                      <InputOTPSlot
                        className="!text-5xl md:text-6xl h-14 md:h-18 w-14 md:w-18 border"
                        index={5}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-max leading-none gap-3 items-center mx-auto bg-main-color-500 hover:bg-main-color-100 border border-transparent hover:border-main-color-500 text-black font-bold py-5 text-sm px-6 flex"
          >
            <span className="leading-none"> Verify Email</span>
            <Mail size={21} color="black" />
          </Button>

          <Link
            href={"/"}
            className="flex text-sm font-medium underline w-max mx-auto"
          >
            Resend OTP
          </Link>
        </form>
      </Form>
    </>
  );
};

export default VerifyEmailForm;
