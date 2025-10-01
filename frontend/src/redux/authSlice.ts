
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../utils/types";



interface AuthState {
  user: User | null;
  isInitialized: boolean; 
}

const initialState: AuthState = {
  user: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      setCredentials: (state, action: PayloadAction<User>) => {
          console.log("authSlice - Setting user:", action.payload);
      state.user = action.payload;
    },
      logout: (state) => {
        console.log("authSlice - Logging out");
      state.user = null;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setCredentials, logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;
