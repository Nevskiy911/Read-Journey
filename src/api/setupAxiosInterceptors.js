import { clearAuthHeader } from "./axiosConfig";
import { logoutUser } from "../redux/auth/authOperations";
import { api } from "./axiosConfig";

export const setupAxiosInterceptors = (store) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        clearAuthHeader();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        store.dispatch(logoutUser());
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};
