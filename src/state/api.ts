// state/services/authApi.ts
import {
  IForgotPassword,
  IResetPassword,
  IVerifyOTP,
  ILogin,
  IRegister,
} from "@/app/utils/Interface";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../state/features/authSlice";

// Custom type for our extended error handling
interface CustomError {
  status: string | number;
  data?: any;
}

// Custom baseQuery with CORS handling
const baseQueryWithCors = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  mode: "cors",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Set necessary headers for CORS
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    // Add authorization token if available
    const token = (getState() as any).auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    try {
      const result = await baseQueryWithCors(args, api, extraOptions);

      // Handle CORS and network errors with proper type checking
      if (result.error) {
        const error = result.error as FetchBaseQueryError & {
          status: string | number;
        };

        // Check for CORS errors (status 0 typically indicates CORS/network issues)
        if (error.status === 0) {
          return {
            error: {
              status: "CORS_ERROR",
              data: "Cross-Origin Request Blocked. Please check server CORS configuration.",
            } as CustomError,
          };
        }

        // Check for fetch errors (network issues)
        if (error.status === "FETCH_ERROR") {
          return {
            error: {
              status: "NETWORK_ERROR",
              data: "Network error. Please check your connection.",
            } as CustomError,
          };
        }
      }

      return result;
    } catch (error: any) {
      // Handle network/CORS errors from the fetch call itself
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        return {
          error: {
            status: "NETWORK_ERROR",
            data: "Network error. Please check your connection and CORS configuration.",
          } as CustomError,
        };
      }

      // Re-throw other errors
      throw error;
    }
  },
  tagTypes: ["Users"],
  endpoints: (build) => ({
    register: build.mutation<any, IRegister>({
      query: (register) => ({
        url: "/customer/register",
        method: "POST",
        body: register,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),

    login: build.mutation<
      {
        data: any;
        message: string;
        token: string;
      },
      ILogin
    >({
      query: (loginData) => ({
        url: "/customer/login",
        method: "POST",
        body: loginData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            dispatch(
              setCredentials({
                user: data.data,
                token: data.token,
              })
            );
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    forgotPassword: build.mutation<any, IForgotPassword>({
      query: (identity) => ({
        url: "/customer/forgot-password",
        method: "POST",
        body: identity,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),

    resetPassword: build.mutation<any, IResetPassword>({
      query: (data) => ({
        url: "/customer/reset-password",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),

    verifyOtp: build.mutation<any, IVerifyOTP>({
      query: (otp) => ({
        url: "/customer/verify-otp",
        method: "POST",
        body: otp,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),

    logout: build.mutation<any, void>({
      query: () => ({
        url: "/customer/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
} = api;
