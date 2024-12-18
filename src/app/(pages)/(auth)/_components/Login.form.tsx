"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { UserLogin, userLoginSchema } from "@/lib/zod/user.zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PasswordInput } from "../../../../components/custom/PasswordInput";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  //   const loginMutation = useLogin();

  const form = useForm<UserLogin>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: UserLogin) {
    console.log(data, "data");
    router.push("/dashboard");
    // try {
    //   await loginMutation.mutateAsync(data, {
    //     onSuccess: (response) => {
    //       toast.success("Login successful!");
    //       router.push("/dashboard");
    //     },
    //     onError: (error: Error) => {
    //       toast.error(`Login failed: ${error.message}`);
    //     },
    //   });
    // } catch (err: any) {
    //   toast.error("Unexpected error occurred, please try again.");
    // }
  }

  function onError(errors: FieldErrors<UserLogin>) {
    for (const [field, error] of Object.entries(errors)) {
      toast.error(`Error in ${field}: ${error?.message}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6 max-w-lg mx-auto w-full py-4"
      >
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-y-1">
              <FormLabel className="font-semibold text-base" htmlFor="email">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  className="text-base"
                  {...field}
                  type="email"
                  placeholder="Email address"
                  required
                  minLength={6}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-y-1">
              <FormLabel className="font-semibold text-base" htmlFor="password">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  className="text-base"
                  id="password"
                  autoComplete="current-password"
                  required
                  minLength={6}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex mt-2 justify-between items-center">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-4 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="leading-none">
                  <FormLabel>Keep me logged in</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <a href="/recover-account" className="font-bold text-sm underline">
            Recover password
          </a>
        </div>

        <Button
          type="submit"
          className="text-base w-full text-gray-700 bg-main-color-500"
          //   disabled={loginMutation.isLoading}
        >
          Login {/* {loginMutation.isLoading ? "Logging in..." : "Login"} */}
        </Button>
      </form>
    </Form>
  );
}
