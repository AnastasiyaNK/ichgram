import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const followApi = createApi({
  reducerPath: "followApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  tagTypes: ["User", "Follow"],
  endpoints: (builder) => ({
    followUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: "/follow",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["User", "Follow"],
    }),
    unfollowUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: "/unfollow",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["User", "Follow"],
    }),
   
    getFollowStatus: builder.query<{ isFollowing: boolean }, string>({
      query: (userId) => `/follow/status/${userId}`,
      providesTags: ["Follow"],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowStatusQuery,
} = followApi;
