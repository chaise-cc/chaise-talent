"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have custom styled components
import { ArrowRight } from "iconsax-react";
import { updateUser } from "@/app/_actions/updateUser.action";
import countries from "@/data/countries.json";
import languagesData from "@/data/languages.json";
import Image from "next/image";
import { logout } from "@/app/_actions/auth.action";
import { toast } from "sonner";

const languages = Object.entries(languagesData).map(([code, details]) => ({
  code,
  ...details,
}));

type TalentPersonalInfoProps = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    country: string;
    language: string;
    avatar: string | File;
  };
};

export default function PersonalInfoForm({ user }: TalentPersonalInfoProps) {
  const [formData, setFormData] = useState({
    avatarUrl: user.avatar || "", // Assuming this is a URL or null if not provided
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    gender: user.gender || "",
    dateOfBirth: user.dateOfBirth || "",
    country: user.country || "",
    language: user.language || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleLogout = async () => {
    await logout();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      setFormData((prev) => ({ ...prev, avatarUrl: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the server action directly with the file object
      await updateUser(
        user.id,
        formData,
        formData.avatarUrl instanceof File ? formData.avatarUrl : null // Ensure avatarUrl is a File when submitting
      );
      setSubmitMessage("Profile updated successfully!");
      toast.success("Profile updated successfully!");
      handleLogout();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitMessage("Error updating profile. Please try again.");
      toast.error("Error updating profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <div className="flex flex-col w-full gap-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl mb-1 font-semibold">
              Update your profile
            </h1>
            <p className="text-sm md:text-base">
              Update your personal details. These will appear on your profile.
            </p>
          </div>

          <div className="flex flex-col gap-4 px-4 py-6 md:gap-6 md:p-8 md:py-12 w-full rounded-xl border">
            <div>
              <label htmlFor="avatarUrl" className="block text-sm font-medium">
                Avatar
              </label>
              <input
                type="file"
                id="avatarUrl"
                name="avatarUrl"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-1"
              />
              {/* Optionally, show the current avatar as an image if it exists */}
              {formData.avatarUrl && typeof formData.avatarUrl === "string" && (
                <Image
                  src={formData.avatarUrl}
                  alt="Current Avatar"
                  height={100}
                  width={100}
                  quality={100}
                  className="mt-4 w-20 h-20 rounded-full"
                />
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
                <option value="none">Rather not say</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium"
              >
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option
                    key={country.name}
                    value={country.name.toLocaleLowerCase()}
                  >
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium">
                Preferred Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="mt-1"
              >
                <option value="">Select Language</option>
                {languages.map((language) => (
                  <option
                    key={language.name.toLocaleLowerCase()}
                    value={language.name.toLocaleLowerCase()}
                  >
                    {language.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-full items-center justify-between">
              <Button
                type="submit"
                className="py-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Next"} <ArrowRight size={20} />
              </Button>
            </div>

            {submitMessage && (
              <div className="mt-4 text-center">
                <p
                  className={
                    submitMessage.includes("success")
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {submitMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
