"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";
import { updateUser } from "@/app/_actions/updateUser.action";
import countries from "@/data/countries.json";
import languagesData from "@/data/languages.json";
import { logout } from "@/app/_actions/auth.action";
import { toast } from "sonner";
import AvatarInput from "./AvatarUpload";
import { Loader2 } from "lucide-react";

const languages = Object.entries(languagesData).map(([code, details]) => ({
  code,
  ...details,
}));

type TalentPersonalInfoProps = {
  user: {
    id: string;
    firstname: string;
    lastname: string;
    gender: string;
    dateOfBirth: string;
    country: string;
    language: string;
    avatar: string | File;
  };
};

export default function PersonalInfoForm({ user }: TalentPersonalInfoProps) {
  const [formData, setFormData] = useState({
    avatarUrl: user.avatar || "",
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    gender: user.gender || "",
    dateOfBirth: user.dateOfBirth || "",
    country: user.country || "",
    language: user.language || "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    formData.avatarUrl as string
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(newPreviewUrl);
      setFormData((prev) => ({ ...prev, avatarUrl: file }));
    }
  };

  const removePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(undefined);
    setFormData((prev) => ({ ...prev, avatarUrl: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateUser(
        user.id,
        formData,
        formData.avatarUrl instanceof File ? formData.avatarUrl : null
      );
      toast.success("Profile updated successfully!");
      await logout();
    } catch (error) {
      console.log(error);

      toast.error("Error updating profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container w-full max-w-5xl pb-16">
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <div className="flex flex-col w-full gap-10">
          <h1 className="text-2xl md:text-3xl mb-1 font-semibold">
            Update your profile
          </h1>
          <p className="text-sm md:text-base">
            Let&apos;s know more about you. These will appear on your profile.
          </p>

          <div className="flex flex-col gap-4 px-4 py-6 md:gap-6 md:p-8 md:py-12 w-full rounded-xl border">
            <AvatarInput
              previewUrl={previewUrl}
              onFileChange={handleAvatarChange}
              onRemove={removePreview}
              fileInputRef={fileInputRef}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className="block font-medium">
                  First Name
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  disabled
                  className="mt-1 py-4 border px-4 text-base rounded-xl w-full"
                />
              </div>

              <div>
                <label htmlFor="lastname" className="block font-medium">
                  Last Name
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  disabled
                  className="mt-1 py-4 border px-4 text-base rounded-xl w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block font-medium">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 py-4 border px-4 text-base rounded-xl w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
                <option value="none">Rather not say</option>
              </select>
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block font-medium">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 py-4 border px-4 text-base rounded-xl w-full"
              />
            </div>

            <div>
              <label htmlFor="country" className="block font-medium">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 py-4 border px-4 text-base rounded-xl w-full"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name.toLowerCase()}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block font-medium">
                Preferred Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="mt-1 py-4 border px-4 text-base rounded-xl w-full"
              >
                <option value="">Select Language</option>
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="py-6 bg-main-color-500 mx-auto text-black hover:bg-main-color-300 mt-4 font-semibold px-8 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  Updating... <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  Update <ArrowRight size={20} color="black" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
