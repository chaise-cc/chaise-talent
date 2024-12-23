"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import countries from "@/data/countries.json";
import languageData from "@/data/languages.json";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import AvatarUpload from "./AvatarUpload";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "iconsax-react";

type TalentPersonalInfoProps = {
  user: User;
};

const TalentPersonalDetailsFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  gender: z.string().min(2, {
    message: "Select gender",
  }),
  dateOfBirth: z.string().min(2, {
    message: "Date of Birth must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  language: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
});

export default function PersonalInfoForm({ user }: TalentPersonalInfoProps) {
  const form = useForm<z.infer<typeof TalentPersonalDetailsFormSchema>>({
    resolver: zodResolver(TalentPersonalDetailsFormSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth || "",
      country: user.country || "",
      language: user.preferredLanguage || "",
    },
  });

  function onSubmit(values: z.infer<typeof TalentPersonalDetailsFormSchema>) {
    console.log(values);
    // handleNextStep();
  }

  // Convert the object into an array of languages
  const languages = Object.entries(languageData).map(([code, details]) => ({
    code,
    ...details,
  }));

  return (
    <div className="container w-full py-6 md:py-8 !px-8 max-w-5xl mx-auto">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col w-full gap-10">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl md:text-3xl mb-1 font-semibold">
                Tell us about yourself
              </h1>

              <p className="text-sm md:text-base">
                We need your personal details, you can edit it before your
                profile goes live.
              </p>
            </div>

            <div className="flex flex-col gap-4 px-4 py-6 md:gap-6 md:p-8 md:py-12 w-full rounded-xl border">
              <AvatarUpload />

              <div className="grid md:grid-cols-2 gap-4 ">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="md:text-base text-base">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-base placeholder:text-base md:text-base py-6"
                          placeholder="First name"
                          disabled
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  disabled
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="md:text-base text-base">
                        Last name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-base placeholder:text-base md:text-base py-6"
                          placeholder="Surname"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base text-base">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief intro about you ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4 ">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="md:text-base text-base">
                        Gender
                      </FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger
                            {...field}
                            className="w-full py-6 text-base"
                          >
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent className="text-black font-medium !text-base">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                            <SelectItem value="none">Rather not say</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="md:text-base text-base">
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-base placeholder:text-base md:text-base py-6"
                          placeholder="shadcn"
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="md:text-base text-base">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-full py-6 text-base">
                            <SelectValue placeholder="Country of residence" />
                          </SelectTrigger>
                          <SelectContent className="text-black font-medium !text-base">
                            {countries.map((country, index) => (
                              <SelectItem
                                key={index}
                                value={country.name.toLocaleLowerCase()}
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="md:text-base text-base">
                        Preferred Language
                      </FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-full py-6 text-base">
                            <SelectValue placeholder="Preferred language" />
                          </SelectTrigger>
                          <SelectContent className="text-black font-medium !text-base">
                            {languages.map((language, index) => (
                              <SelectItem
                                key={index}
                                value={language.name.toLocaleLowerCase()}
                              >
                                {language.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full items-center justify-between">
                <Button className="py-6 bg-main-color-50 border-main-color-500 hover:bg-main-color-200  border text-black font-semibold flex mt-8 w-max px-8">
                  Skip
                </Button>
                <Button className="py-6 bg-main-color-500 hover:bg-main-color-100 hover:border-main-color-500 font-semibold text-black border border-transparent flex mt-8 w-max px-8">
                  Next <ArrowRight size={20} color="black" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
