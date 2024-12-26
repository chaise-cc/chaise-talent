/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import pb from "@/lib/pocketbase";
import { createSession } from "@/lib/session";
import { User } from "@/types";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function updateUser(
  id: string,
  fields: {
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    country: string;
    language: string;
  },
  avatarFile: File | null
) {
  if (!avatarFile) throw new Error("No avatar file uploaded");

  // Validate required fields
  const requiredFields = [
    "firstName",
    "lastName",
    "gender",
    "dateOfBirth",
    "country",
    "language",
  ];
  for (const field of requiredFields) {
    if (!fields[field as keyof typeof fields])
      throw new Error(`${field} is required`);
  }

  const arrayBuffer = await avatarFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const stream = Readable.from(buffer);

  try {
    // Upload the file directly as a stream to Cloudinary
    const cloudinaryRes = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "user_avatars" },
        (error, result) => {
          if (error) return reject(new Error("Cloudinary upload failed"));
          if (!result?.secure_url)
            return reject(
              new Error("Cloudinary upload failed: Missing secure_url")
            );
          resolve(result);
        }
      );

      stream.pipe(uploadStream);
    });

    const updatedUser = await pb.collection("users").update(id, {
      ...fields,
      dateOfBirth: new Date(fields.dateOfBirth),
      avatar: cloudinaryRes?.secure_url,
      accounts: [{ isOnboarded: true, type: "talent" }],
    });

    // Explicitly map the fields to match the User type
    const updatedSession: User = {
      id: updatedUser.id,
      firstName: updatedUser.firstName || fields.firstName,
      lastName: updatedUser.lastName || fields.lastName,
      gender: updatedUser.gender || fields.gender,
      email: updatedUser.email, // Ensure email exists in `updatedUser`
      dateOfBirth: updatedUser.dateOfBirth || fields.dateOfBirth,
      phoneNumber: updatedUser.phoneNumber || "",
      language: updatedUser.language || fields.language,
      country: updatedUser.country || fields.country,
      avatar: updatedUser.avatar || cloudinaryRes?.secure_url,
      accounts: updatedUser.accounts || [{ isOnboarded: true, type: "talent" }],
      emailIsVerified: updatedUser.emailIsVerified,
    };
    // Update the session cookie
    await createSession(updatedSession, updatedSession.accounts[0].type);

    return updatedUser;
  } catch (error) {
    console.error("Error during user update or upload:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}
