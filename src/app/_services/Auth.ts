import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { request } from "@/app/api/api";

// Define response types
interface RegisterResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    accountType: string;
  };
  message: string;
}

interface LoginResponse {
  token: string; // Assuming login returns a token
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    accountType: string;
  };
}

// Define input types
interface RegisterInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  accountType: string;
  getUpdates: boolean;
  acceptTerms: boolean;
}

interface VerifyEmailInput {
  email: string;
  otp: number;
}

interface LoginInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Use mutations
export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterInput>(
    async (data: RegisterInput) => {
      return request<RegisterResponse>({
        url: "auth/register",
        method: "POST",
        data,
      });
    },
    {
      onSuccess: () => {
        toast.success("User Registered!");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Registration failed");
      },
    }
  );
};

export const useVerifyEmail = () => {
  return useMutation<RegisterResponse, Error, VerifyEmailInput>(
    async (data: VerifyEmailInput) => {
      return request<RegisterResponse>({
        url: "auth/verify-otp",
        method: "POST",
        data,
      });
    },
    {
      onSuccess: () => {
        toast.success("Email Verified!");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Verification failed");
      },
    }
  );
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>(
    async (data: LoginInput) => {
      return request<LoginResponse>({
        url: "auth/login",
        method: "POST",
        data,
      });
    },
    {
      onSuccess: () => {
        toast.success("User Logged In!");
      },
      onError: (error: Error) => {
        console.log(error.message, "error.message ");

        toast.error(error.message || "Login failed");
      },
    }
  );
};
