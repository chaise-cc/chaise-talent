"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import TopNavigation from "./top-navigation";
import { updateProfile } from "@/app/_actions/updateProfile.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const countryCodes = [
  { code: "+1", label: "United States", flag: "🇺🇸" },
  { code: "+234", label: "Japan", flag: "🇳🇬" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
];

const socialMediaPlatforms = [
  "Facebook",
  "Instagram",
  "Twitter",
  "LinkedIn",
  "TikTok",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProfileUpdatePageClient({ user }: { user: any }) {
  const [bio, setBio] = useState<string>(user.bio || "");
  const [username, setUsername] = useState<string>(user.username || "");
  const [saving, setSaving] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user.phoneNumber?.split(" ")[1] || ""
  );
  const [selectedCode, setSelectedCode] = useState<string>(
    user.phoneNumber?.split(" ")[0] || countryCodes[0].code
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<
    { platform: string; handle: string }[]
  >(user.social_accounts || []);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSave = async () => {
    if (bio.length < 150 || bio.length > 2000) {
      alert("Bio must be between 150 and 2000 characters.");
      return;
    }

    if (selectedPlatforms.length === 0) {
      alert("You must add at least one social media account.");
      return;
    }

    setSaving(true);

    try {
      const response = await updateProfile({
        id: user.id,
        bio,
        username,
        phoneNumber: `${selectedCode} ${phoneNumber}`,
        social_accounts: selectedPlatforms,
      });

      if (response.success) {
        toast.success("Profile updated successfully!");
        router.push("/dashboard");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating your profile.");
    } finally {
      setSaving(false);
    }
  };

  // Track the initial state
  const initialProfile = {
    bio: user.bio || "",
    username: user.username || "",
    phoneNumber: `${user.phoneNumber?.split(" ")[0]} ${
      user.phoneNumber?.split(" ")[1]
    }`,
    socialMediaHandles: user.socialMediaHandles || [],
  };

  // Check if changes were made
  const hasChanges = () => {
    const currentProfile = {
      bio,
      username,
      phoneNumber: `${selectedCode} ${phoneNumber}`,
      socialMediaHandles: selectedPlatforms,
    };
    return JSON.stringify(currentProfile) !== JSON.stringify(initialProfile);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (/^[a-zA-Z0-9_]*$/.test(value)) {
      setUsername(value);
      setIsAvailable(null);
    }
  };

  useEffect(() => {
    const debounceCheck = setTimeout(() => {
      if (username) {
        checkUsernameAvailability(username);
      }
    }, 500);

    return () => clearTimeout(debounceCheck);
  }, [username]);

  const checkUsernameAvailability = async (username: string) => {
    // Bypass check if username hasn't changed
    if (username === user.username) {
      setIsAvailable(true);
      return;
    }

    setIsChecking(true);
    try {
      const response = await fetch(`/api/check-username?username=${username}`);
      const data = await response.json();
      setIsAvailable(data.available);
    } catch (error) {
      console.error("Error checking username availability:", error);
      setIsAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleEditorChange = (content: string) => {
    setBio(content);
  };

  return (
    <div>
      <TopNavigation
        pageTitle="Update Profile"
        pageCrumbs={[
          { text: "Home", link: "/dashboard" },
          { text: "Update Profile", link: "/dashboard/settings" },
        ]}
      />

      <div className="flex flex-col gap-6 max-w-4xl my-8 mx-auto w-full p-8 rounded-xl border bg-white">
        <fieldset>
          <div>
            <Label className="font-semibold">Create Username</Label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="your-username"
                className="border px-3 py-2 rounded-md flex-1 focus:ring focus:ring-blue-500"
              />
              {isChecking ? (
                <Loader2 className="animate-spin text-blue-500" size={20} />
              ) : isAvailable === true ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : isAvailable === false ? (
                <XCircle className="text-red-500" size={20} />
              ) : null}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Your profile URL will look like: <br />
              <strong className="text-gray-800">
                {baseUrl + "/~/" + username}
              </strong>
            </p>
            {isAvailable === false && (
              <p className="text-sm text-red-500 mt-1">
                This username is already taken. Please try another one.
              </p>
            )}
          </div>
        </fieldset>

        <fieldset className="h-full">
          <Label className="font-semibold">Bio</Label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY} // Optional: Add your TinyMCE API Key
            value={bio}
            onEditorChange={handleEditorChange}
            init={{
              height: 300,
              menubar: false,
              branding: false,
              elementpath: false,
              resize: false,
              toolbar:
                "undo redo | formatselect | bold italic underline | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist",
              content_style:
                "body { font-family: Sora, sans-serif; font-size:14px }",
            }}
          />
          <p className="text-sm text-gray-500 mt-1">
            Ensure your bio is between 150 and 2000 characters.
          </p>
        </fieldset>

        <fieldset>
          <div className="flex flex-col">
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Phone Number</Label>
              <div className="flex border items-center rounded-lg overflow-hidden bg-gray-100">
                <select
                  value={selectedCode}
                  onChange={(e) => setSelectedCode(e.target.value)}
                  className="bg-main-color-50 px-4 py-2 text-base font-medium border-none focus:ring-0 focus:outline-none appearance-none"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 px-3 py-2 text-base bg-white outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
        </fieldset>

        <SocialMediaInput
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
        />

        <Button
          onClick={handleSave}
          className="mt-4 px-4 py-6 rounded-lg bg-main-color-500 hover:bg-main-color-300 text-black font-bold"
          disabled={saving || !hasChanges()}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}

const SocialMediaInput = ({
  selectedPlatforms,
  setSelectedPlatforms,
}: {
  selectedPlatforms: { platform: string; handle: string }[];
  setSelectedPlatforms: React.Dispatch<
    React.SetStateAction<{ platform: string; handle: string }[]>
  >;
}) => {
  const availablePlatforms = socialMediaPlatforms.filter(
    (platform) =>
      !selectedPlatforms.some((selected) => selected.platform === platform)
  );

  const addPlatform = () => {
    if (availablePlatforms.length > 0) {
      setSelectedPlatforms([
        ...selectedPlatforms,
        { platform: availablePlatforms[0], handle: "" },
      ]);
    }
  };

  const updateHandle = (index: number, handle: string) => {
    const updated = [...selectedPlatforms];
    updated[index].handle = handle;
    setSelectedPlatforms(updated);
  };

  const removePlatform = (index: number) => {
    const updated = selectedPlatforms.filter((_, i) => i !== index);
    setSelectedPlatforms(updated);
  };

  return (
    <fieldset>
      <Label className="font-semibold">Add Social Media Handles</Label>
      <div className="flex flex-col gap-4 mt-2">
        {selectedPlatforms.map((entry, index) => (
          <div key={index} className="flex items-center gap-4">
            <select
              value={entry.platform}
              onChange={(e) => {
                const updated = [...selectedPlatforms];
                updated[index].platform = e.target.value;
                setSelectedPlatforms(updated);
              }}
              className="flex-1 border px-2 py-2 rounded-md"
              aria-label="Social Media Platform"
            >
              {socialMediaPlatforms.map((platform) => (
                <option
                  key={platform}
                  value={platform}
                  disabled={
                    selectedPlatforms.some(
                      (selected) => selected.platform === platform
                    ) && entry.platform !== platform
                  }
                >
                  {platform}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={entry.handle}
              onChange={(e) => updateHandle(index, e.target.value)}
              placeholder="Username/Handle"
              className="flex-1 border px-2 py-2 rounded-md"
              aria-label="Social Media Handle"
            />
            <Trash2
              className="text-red-500 cursor-pointer"
              size={20}
              onClick={() => removePlatform(index)}
              aria-label="Remove Social Media Entry"
            />
          </div>
        ))}

        {availablePlatforms.length > 0 && (
          <Button
            type="button"
            onClick={addPlatform}
            className="flex items-center leading-none text-sm w-max ml-auto gap-2 bg-main-color-500 hover:bg-main-color-200 text-white"
          >
            <PlusCircle size={18} />
            <span className="leading-none"> Add Social Media</span>
          </Button>
        )}
      </div>
    </fieldset>
  );
};
