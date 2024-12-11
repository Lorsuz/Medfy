import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  fullName: string;
  email: string;
  university: string | null;
  period: string | null;
  trainingYear: string | null;
  specialty: string | null;
  isAdmin: boolean;
  createdAt: Date | null;
  profileImage: string | null;
}

interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {
    name: "",
    fullName: "",
    email: "",
    university: null,
    period: null,
    trainingYear: null,
    specialty: null,
    isAdmin: false,
    createdAt: null,
    profileImage: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
