import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authSlice";
import { apiSlice } from "./apiSlice";
import { postApiSlice } from "./postSlice";
import { followApi } from "./followApiSlice";
import { notificationApi } from "./notificationApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [postApiSlice.reducerPath]: postApiSlice.reducer,
    [followApi.reducerPath]: followApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(postApiSlice.middleware)
      .concat(followApi.middleware)
  .concat(notificationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
