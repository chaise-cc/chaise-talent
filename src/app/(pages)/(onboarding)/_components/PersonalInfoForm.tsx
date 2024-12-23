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
import AvatarUpload from "./AvatarUpload";
import { ArrowRight } from "iconsax-react";

import { User } from "@/types";

type TalentPersonalInfoProps = {
  user: User;
};

// Validation schema using zod
const TalentPersonalDetailsFormSchema = z.object({
  avatarUrl: z.string().min(2, { message: "You need to upload a photo." }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  gender: z.string().min(2, { message: "Select a valid gender." }),
  dateOfBirth: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Please provide a valid date in YYYY-MM-DD format."
    ),
  country: z.string().min(2, { message: "Please select a country." }),
  language: z
    .string()
    .min(2, { message: "Please select a preferred language." }),
});

export default function PersonalInfoForm({ user }: TalentPersonalInfoProps) {
  const form = useForm<z.infer<typeof TalentPersonalDetailsFormSchema>>({
    resolver: zodResolver(TalentPersonalDetailsFormSchema),
    defaultValues: {
      avatarUrl: user.avatar || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth || "",
      country: user.country || "",
      language: user.preferredLanguage || "",
    },
  });

  function onSubmit(values: z.infer<typeof TalentPersonalDetailsFormSchema>) {
    console.log("Form Values:", values);

    // Proceed to the next step
  }

  const languages = Object.entries(languageData).map(([code, details]) => ({
    code,
    ...details,
  }));

  return (
    <div className="container w-full py-6 md:py-8 px-8 max-w-5xl mx-auto">
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
                We need your personal details. You can edit them before your
                profile goes live.
              </p>
            </div>

            <div className="flex flex-col gap-4 px-4 py-6 md:gap-6 md:p-8 md:py-12 w-full rounded-xl border">
              <AvatarUpload avatarUrl={user.avatar} />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
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
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
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
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Country of residence" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem
                              key={country.name}
                              value={country.name.toLowerCase()}
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
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Language</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder="Preferred language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem
                              key={language.code}
                              value={language.name.toLowerCase()}
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

              <div className="flex w-full items-center justify-between">
                <Button className="py-6 bg-gray-200 hover:bg-gray-300 text-black font-semibold px-8">
                  Skip
                </Button>
                <Button
                  type="submit"
                  className="py-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 flex items-center gap-2"
                >
                  Next <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
