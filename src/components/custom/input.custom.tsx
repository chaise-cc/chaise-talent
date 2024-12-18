/* eslint-disable react/jsx-no-undef */
import { FieldErrors, FieldValues, Path, UseFormReturn } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/custom/PasswordInput";

type FormFieldType<T extends FieldValues> = {
  type: string;
  label: string;
  name: string;
  errors?: FieldErrors<T>;
  form: UseFormReturn<T>;
  placeholder?: string;
};

export const CustomInputField = <T extends FieldValues>({
  type,
  label,
  name,
  form,
  placeholder,
}: FormFieldType<T>) => {
  return (
    <FormField
      control={form.control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start space-y-1">
          <FormLabel className="font-semibold text-base" htmlFor={name}>
            {label}
          </FormLabel>
          <FormControl>
            {type !== "password" ? (
              type !== "bio" ? (
                <Input
                  className="text-base py-6"
                  {...field}
                  type={type || "text"}
                  placeholder={placeholder}
                />
              ) : (
                ""
                // <Textarea
                //   className="text-base"
                //   {...field}
                //   placeholder={placeholder}
                // />
              )
            ) : (
              <PasswordInput
                {...field}
                className="text-base"
                id="password"
                autoComplete="current-password"
              />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};
