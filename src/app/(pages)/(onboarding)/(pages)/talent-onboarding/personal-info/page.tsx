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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
});

const TalentPersonalDetailsScreen = () => {
  const form = useForm<z.infer<typeof TalentPersonalDetailsFormSchema>>({
    resolver: zodResolver(TalentPersonalDetailsFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      country: "",
      state: "",
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl md:text-3xl mb-1 font-semibold">
                Personal Information
              </h1>
              <h1 className="text-xl md:text-2xl mb-2 leading-none font-medium">
                Tell us about yourself
              </h1>
              <p className="text-sm md:text-base">
                We need your personal details, you can edit it before your
                profile goes live.
              </p>
            </div>

            <div className="flex flex-col gap-4 px-4 py-6 md:p-8 md:py-12 rounded-xl border">
              <div className="grid md:grid-cols-2 gap-4 ">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="md:text-base text-base">
                        Firstname
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-base placeholder:text-base md:text-base py-6"
                          placeholder="First name"
                          {...field}
                        />
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

              <div className="grid md:grid-cols-2 gap-4 ">
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
                        Language
                      </FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-full py-6 text-base">
                            <SelectValue placeholder="Preferred language" />
                          </SelectTrigger>
                          <SelectContent className="text-black font-medium !text-base">
                            {languages.map((country, index) => (
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
              </div>

              <Button className="py-6 mx-auto flex mt-8 w-max px-8">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default TalentPersonalDetailsScreen;
