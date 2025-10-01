// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const followApi = createApi({
//   reducerPath: "followApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:3000/api",
//     credentials: "include",
//     tagTypes: ["User"]
//   }),
//   endpoints: (builder) => ({
//     followUser: builder.mutation<void, string>({
//       query: (userId) => ({ url: "/follow", method: "POST", body: { userId } }),
//       invalidatesTags: [{ type: "User" }],
//     }),
//     unfollowUser: builder.mutation<void, string>({
//       query: (userId) => ({
//         url: "/unfollow",
//         method: "POST",
//         body: { userId },
//       }),
//       invalidatesTags: [{ type: "User" }],
//     }),
//   }),
// });

// export const { useFollowUserMutation, useUnfollowUserMutation } = followApi;
