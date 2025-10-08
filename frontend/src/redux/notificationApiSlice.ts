import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { INotification } from "../utils/types";


export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/notifications",
    credentials: "include",
  }),
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    getNotifications: builder.query<INotification[], void>({
      query: () => "/",
      providesTags: ["Notifications"],
    }),

    markAllRead: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/mark-all-read",
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),

    markAsRead: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAllReadMutation,
  useMarkAsReadMutation,
} = notificationApi;
