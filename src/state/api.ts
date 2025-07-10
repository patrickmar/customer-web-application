// state/services/authApi.ts
import {
  IForgotPassword,
  IResetPassword,
  IVerifyOTP,
  ILogin,
  IRegister,
} from "@/app/utils/Interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../state/features/authSlice"; // Adjust path as needed

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    register: build.mutation<any, IRegister>({
      query: (register) => ({
        url: "/customer/register",
        method: "POST",
        body: register,
      }),
    }),

    // In your authApi.ts
    // Update your login mutation to include token in the response type
    login: build.mutation<
      {
        data: any;
        message: string;
        token: string; // Add this
      },
      ILogin
    >({
      query: (loginData) => ({
        url: "/customer/login",
        method: "POST",
        body: loginData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data.data,
              token: data.token, // Include token in credentials
            })
          );
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
      }),
    }),

    resetPassword: build.mutation<any, IResetPassword>({
      query: (data) => ({
        url: "/customer/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: build.mutation<any, IVerifyOTP>({
      query: (otp) => ({
        url: "/customer/verify-otp",
        method: "POST",
        body: otp,
      }),
    }),

    logout: build.mutation<any, void>({
      query: () => ({
        url: "/customer/logout",
        method: "POST",
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
