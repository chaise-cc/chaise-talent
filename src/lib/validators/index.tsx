import { z, ZodType } from "zod";

export type SignUpProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  phone: string;
  country: string;
  state: string;
  username: string;
  gender: string;
  location: string;
  avartarUrl: string;
  isClient: boolean;
  isTalent: boolean;
  getUpdates: boolean;
  acceptTerms: boolean;
};

export type LoginProps = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ResetPasswordProps = {
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordProps = {
  email: string;
};

export type UpdatePasswordsProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ContactUsProps = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};
export type OTPPorps = {
  otp: string;
};

type FormType =
  | "login"
  | "signup"
  | "resetPassword"
  | "forgotPassword"
  | "updatePassWord"
  | "contactUs"
  | "otp";

const loginSchema: z.ZodType<LoginProps> = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(8, "Email is too short")
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Enter a valid email",
    })
    .max(50, "Email is too long")
    .transform((value) => {
      return value.toLowerCase().trim();
    }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .transform((value) => {
      return value.trim();
    }),
  rememberMe: z.boolean(),
});

const signupSchema: z.ZodType<SignUpProps> = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First Name is required" })
      .max(50, { message: "First Name must be less than 50 characters" })
      .transform((value) => {
        return (
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        ).trim();
      }),
    lastName: z
      .string()
      .min(2, { message: "Last Name is required" })
      .max(50, { message: "Last Name must be less than 50 characters" })
      .transform((value) => {
        return (
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        ).trim();
      }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(8, { message: "Email is too short" })
      .max(50, "Email is too long")
      .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Enter a valid email",
      })
      .transform((value) => {
        return value.toLowerCase().trim();
      }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*\-\]\?])[A-Za-z\d.,!@#$%^&*\-\]\?]{6,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .transform((value) => value.trim()),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be more than 6 characters" })
      .transform((value) => {
        return value.trim();
      }),
    bio: z
      .string()
      .min(10, { message: "bio must be at least 10 characters" })
      .max(300, { message: "bio must not be more than 300 characters" }),
    phone: z.string(),
    country: z.string().min(1, { message: "Select a country" }),
    state: z.string(),
    username: z.string(),
    gender: z.enum(["male", "female", " "], {
      errorMap: () => ({ message: "please select your gender." }),
    }),
    location: z.string(),
    avartarUrl: z.string(),
    isClient: z.boolean(),
    isTalent: z.boolean(),
    getUpdates: z.boolean(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Please accept the terms before proceeding",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const forgotPasswordSchema: z.ZodType<ForgotPasswordProps> = z.object({
  email: z
    .string()
    .min(2, { message: "Email is required" })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Enter a valid email",
    })
    .email({ message: "Invalid email address" })
    .transform((value) => {
      return value.toLocaleLowerCase().trim();
    }),
});

const resetPasswordSchema: z.ZodType<ResetPasswordProps> = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .max(50)
      .transform((value) => value.trim()),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .max(50)
      .transform((value) => {
        return value.trim();
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const updatePassWordsSchema: z.ZodType<UpdatePasswordsProps> = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .max(50)
      .transform((value) => value.trim()),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .max(50)
      .transform((value) => value.trim()),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .max(50)
      .transform((value) => {
        return value.trim();
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

const contactUsSchema: z.ZodType<ContactUsProps> = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name is required" })
    .max(50, { message: "First Name must be less than 50 characters" })
    .transform((value) => {
      return (
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      ).trim();
    }),
  lastName: z
    .string()
    .min(2, { message: "Last Name is required" })
    .max(50, { message: "Last Name must be less than 50 characters" })
    .transform((value) => {
      return (
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      ).trim();
    }),
  email: z
    .string()
    .min(2, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Enter a valid email",
    })
    .transform((value) => {
      return value.toLowerCase().trim();
    }),
  message: z
    .string()
    .min(2, { message: "Message is required" })
    .max(100, { message: "Message must be less than 100 characters" }),
});

const otpSchema: ZodType<OTPPorps> = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const zodValidator = (formType: FormType) => {
  switch (formType) {
    case "login":
      return loginSchema;
    case "signup":
      return signupSchema;
    case "forgotPassword":
      return forgotPasswordSchema;
    case "resetPassword":
      return resetPasswordSchema;
    case "updatePassWord":
      return updatePassWordsSchema;
    case "contactUs":
      return contactUsSchema;
    case "otp":
      return otpSchema;
    default:
      return;
  }
};

export type LoginType = z.infer<typeof loginSchema>;
export type SignupType = z.infer<typeof signupSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type UpdatePassowrdType = z.infer<typeof updatePassWordsSchema>;
export type ContactUsType = z.infer<typeof contactUsSchema>;
export type OTPType = z.infer<typeof otpSchema>;
