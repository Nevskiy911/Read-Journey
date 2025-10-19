import { api } from "./axiosConfig";

export const registerUserApi = async (credentials) => {
  const { data } = await api.post("/users/signup", credentials);
  return data;
};

export const loginUserApi = async (credentials) => {
  const { data } = await api.post("/users/signin", credentials);
  return data;
};

export const logoutUserApi = async () => {
  await api.post("/users/signout");
};
