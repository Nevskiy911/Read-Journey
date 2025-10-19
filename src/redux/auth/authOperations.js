import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader, clearAuthHeader } from "../../api/axiosConfig";
import {
  registerUserApi,
  loginUserApi,
  logoutUserApi,
} from "../../api/authApi";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const data = await registerUserApi(credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration error"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const data = await loginUserApi(credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login error"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutUserApi();
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout error"
      );
    }
  }
);
