/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import pb from "@/lib/pocketbase";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function updateUser(
  id: string,
  fields: {
    firstname: string;
    lastname: string;
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
    "firstname",
    "lastname",
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

    return updatedUser;
  } catch (error) {
    console.error("Error during user update or upload:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}
