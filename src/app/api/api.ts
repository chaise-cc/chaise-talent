import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";

const client = axios.create({
  baseURL: "https://chaise-api.onrender.com/api/",
});

const navigateToLogin = (): void => {
  if (typeof window !== "undefined") {
    const cookie = new Cookies();
    cookie.remove("accessToken");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    router.push("/login");
  }
};

const shownErrors = new Set<string>();

interface ErrorResponse {
  message?: string;
  error?: string;
}

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const cookies = new Cookies();
    const accessToken =
      typeof window !== "undefined" ? cookies.get("accessToken") || "" : "";

    if (accessToken) {
      config.headers = {
        ...config.headers,
        "poc-client-token": accessToken,
      };
    }

    const response: AxiosResponse<T> = await client(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<ErrorResponse>;
      const status = response?.status;
      const message = response?.data?.message || "Network Error";

      const errorKey = `${status}-${message}`;
      if (!shownErrors.has(errorKey)) {
        shownErrors.add(errorKey);

        if (status === 401 || status === 403) {
          navigateToLogin();
        } else if (status && status >= 400 && status < 500) {
          toast.error(
            "There was an issue with your request. Please check and try again."
          );
        } else if (status && status >= 500) {
          toast.error(
            "Oops! Something went wrong on our end. Please try again later."
          );
        } else {
          toast.error(message);
        }
      }
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
    throw error;
  }
};
