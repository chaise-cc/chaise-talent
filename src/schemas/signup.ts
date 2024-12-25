import { z } from "zod";

// Define validation schema
const signupSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters" })
    .trim(),
  lastname: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters" })
    .trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export default signupSchema;
