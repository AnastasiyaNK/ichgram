import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPost, IComment } from "../utils/types";

export const postApiSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  tagTypes: ["Posts", "Comments"],
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),

    getUserPosts: builder.query<IPost[], string>({
      query: (userId) => `/posts/user/${userId}`,
      providesTags: (result, _error, userId) =>
        result
          ? [
              ...result.map((post) => ({
                type: "Posts" as const,
                id: post._id,
              })),
              { type: "Posts", id: `user-${userId}` },
            ]
          : [{ type: "Posts", id: `user-${userId}` }],
    }),

    createPost: builder.mutation<IPost, FormData>({
      query: (formData) => ({
        url: "/posts",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Posts"],
    }),

    likePost: builder.mutation<IPost, string>({
      query: (postId) => ({
        url: `/likes/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, postId) => [
        { type: "Posts", id: postId },
      ],
    }),

    unlikePost: builder.mutation<IPost, string>({
      query: (postId) => ({
        url: `/likes/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, postId) => [
        { type: "Posts", id: postId },
      ],
    }),

    getComments: builder.query<IComment[], string>({
      query: (postId) => `/comments/${postId}`,
      providesTags: (result, _error, postId) =>
        result
          ? [
              ...result.map((c) => ({ type: "Comments" as const, id: c._id })),
              { type: "Comments", id: postId },
            ]
          : [{ type: "Comments", id: postId }],
    }),

    addComment: builder.mutation<IComment, { postId: string; text: string }>({
      query: ({ postId, text }) => ({
        url: `/comments`,
        method: "POST",
        body: { postId, text },
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
    getExplorePosts: builder.query<IPost[], void>({
      query: () => "/explore",
      providesTags: ["Posts"],
    }),
   
    deletePost: builder.mutation<{ success: boolean }, string>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

   
    updatePost: builder.mutation<IPost, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Posts", id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUserPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useGetExplorePostsQuery,
  useDeletePostMutation,
 useUpdatePostMutation
  
} = postApiSlice;

