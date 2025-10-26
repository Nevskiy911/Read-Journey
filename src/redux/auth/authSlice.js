import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "./authOperations";
import { setAuthHeader } from "../../api/axiosConfig";

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = getUserFromStorage();

const initialState = {
  user: userFromStorage,
  token: tokenFromStorage || null,
  isLoggedIn: !!tokenFromStorage,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initAuth: (state) => {
      const token = localStorage.getItem("token");
      const user = getUserFromStorage();
      if (token && user) {
        state.token = token;
        state.user = user;
        state.isLoggedIn = true;
        setAuthHeader(token);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        const { name, email, token, refreshToken } = action.payload;
        state.user = { name, email };
        state.token = token;
        state.refreshToken = refreshToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        const { name, email, token, refreshToken } = action.payload;
        state.user = { name, email };
        state.token = token;
        state.refreshToken = refreshToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, handleRejected)

      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, handleRejected);
  },
});

export const { initAuth } = authSlice.actions;
export default authSlice.reducer;
