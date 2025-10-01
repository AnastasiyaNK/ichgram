
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPost } from "../utils/types";
import type { IComment } from "../utils/types";

export const postApiSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  tagTypes: ["Posts", "Comments"],
  endpoints: (builder) => ({
    // Отримати всі пости
    getPosts: builder.query<IPost[], void>({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    getUserPosts: builder.query<IPost[], string>({
      query: (userId) => `/posts/user/${userId}`, // бек має повертати тільки пости цього користувача
    }),
    // Створити пост
    createPost: builder.mutation<IPost, FormData>({
      query: (formData) => ({
        url: "/posts",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Posts"],
    }),
    // Лайк/дизлайк поста
    likePost: builder.mutation<IPost, string>({
      query: (postId) => ({
        url: `/posts/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Posts"],
    }),
    // Коментарі по посту
    getComments: builder.query<IComment[], string>({
      // postId
      query: (postId) => `/comments/${postId}`,
      providesTags: (result, _error, postId) =>
        result
          ? [
              ...result.map((c) => ({ type: "Comments" as const, id: c._id })),
              { type: "Comments", id: postId },
            ]
          : [],
    }),
    // Додати коментар
    addComment: builder.mutation<IComment, { postId: string; text: string }>({
      query: ({ postId, text }) => ({
        url: `/comments/${postId}`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUserPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
} = postApiSlice;
