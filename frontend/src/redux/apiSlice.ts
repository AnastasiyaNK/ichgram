
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../utils/types";

export interface AuthResponse {
  user: User;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
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
      query: (userId) => `/user/profile/${userId}`,
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
    getSearchUsers: builder.query<User[], string>({
      query: (q) => `/search/users?q=${encodeURIComponent(q)}`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetCurrentUserQuery,
  useGetSearchUsersQuery
  
} = apiSlice;
