import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Formidable from "formidable";
import pb from "@/lib/pocketbase"; // Assuming this is your PocketBase instance

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Disable the default body parser, Formidable will handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const form = new Formidable.IncomingForm();

  // Parse the form
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return NextResponse.json(
        { message: "Error parsing the form" },
        { status: 400 }
      );
    }

    const { id } = params; // User's ID from the URL
    const avatarFile = files.avatarUrl ? files.avatarUrl[0] : null;

    if (!avatarFile) {
      return NextResponse.json(
        { message: "No avatar file uploaded" },
        { status: 400 }
      );
    }

    // Ensure required fields are provided
    const requiredFields = [
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "country",
      "language",
    ];
    for (let field of requiredFields) {
      if (!fields[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    try {
      // Upload the avatar image to Cloudinary
      const cloudinaryRes = await cloudinary.uploader.upload(
        avatarFile.filepath,
        {
          folder: "user_avatars", // Optional folder in Cloudinary
        }
      );

      // Update the user data in PocketBase
      const updatedUser = await pb.collection("users").update(id, {
        firstName: fields.firstName,
        lastName: fields.lastName,
        gender: fields.gender,
        dateOfBirth: new Date(fields.dateOfBirth),
        country: fields.country,
        language: fields.language,
        avatarUrl: cloudinaryRes.secure_url, // Save the Cloudinary URL
      });

      return NextResponse.json(
        { message: "User updated successfully", user: updatedUser },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during user update:", error);
      return NextResponse.json(
        { message: "Error updating user or uploading image" },
        { status: 500 }
      );
    }
  });
}
