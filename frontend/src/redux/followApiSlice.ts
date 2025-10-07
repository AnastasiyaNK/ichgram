import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const followApi = createApi({
  reducerPath: "followApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/follow", 
    credentials: "include",
  }),
  tagTypes: ["User", "Follow"],
  endpoints: (builder) => ({
    followUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: "/",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: (_result, _error, userId) => [
        { type: "Follow", id: userId },
        "User",
      ],
    }),

    unfollowUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: "/unfollow",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: (_result, _error, userId) => [
        { type: "Follow", id: userId },
        "User",
      ],
    }),

    getFollowStatus: builder.query<{ isFollowing: boolean }, string>({
      query: (userId) => `/status/${userId}`,
      providesTags: (_result, _error, userId) => [
        { type: "Follow", id: userId },
      ],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowStatusQuery,
} = followApi;
