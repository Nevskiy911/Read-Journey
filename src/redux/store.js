import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { setupAxiosInterceptors } from "../api/setupAxiosInterceptors";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

setupAxiosInterceptors(store);
