
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../utils/types";


export interface AuthResponse {
  user: User;
}



export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include", // важливо для httpOnly cookie
  }),
  endpoints: (builder) => ({
    register: builder.mutation<
      AuthResponse,
      { name: string; email: string; password: string; fullName: string }
    >({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query<User, string>({
      query: (id) => `/user/profile/${id}`,
    }),
    updateProfile: builder.mutation<User, FormData>({
      query: (formData) => ({
        url: "/user/profile",
        method: "PUT",
        body: formData,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetCurrentUserQuery,
} = apiSlice;
