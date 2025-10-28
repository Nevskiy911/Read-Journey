import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader, clearAuthHeader } from "../../api/axiosConfig";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post("/users/signup", credentials);
      setAuthHeader(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
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
      const res = await api.post("/users/signin", credentials);
      setAuthHeader(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
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
      await api.post("/users/signout");
      clearAuthHeader();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(token);
      const res = await api.get("/users/current");
      return res.data;
    } catch (error) {
      clearAuthHeader();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Session expired"
      );
    }
  }
);
