// state/features/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, IUser } from "@/app/utils/Interface";
import { get } from "@/app/utils/storage";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  data: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCredentials: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
});

export const {
  setCredentials,
  logout,
  reset,
  setIsAuthenticated,
  setLoading,
  setUser,
} = authSlice.actions;
export default authSlice.reducer;
