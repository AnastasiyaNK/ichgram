import axios from "axios";
import type { User } from "../utils/types";

export const apiInstance = axios.create({
  baseURL: "http://localhost:5173/api",
  withCredentials: true,
});

export interface AuthResponse {
  user: User;
}

export const requestRegister = async (payload: {
  name: string;
  email: string;
  password: string;
  fullName: string;
}): Promise<AuthResponse> => {
  const { data } = await apiInstance.post<AuthResponse>("/auth/register", payload);
  return data;
};
  
export const requestLogin = async (payload: {
    email: string, password: string
}): Promise<AuthResponse> => {
    const { data } = await apiInstance.post<AuthResponse>(
      "/auth/login",
      payload
    );
    return data
   ;
}

export const requestLogout = async (): Promise<{ message: string }> => {
  const { data } = await apiInstance.post<{ message: string }>("/auth/logout");
  return data;
};

export const requestProfile = async (id: string): Promise<User> => {
  const { data } = await apiInstance.get<User>(`/user/profile/${id}`);
  return data;
};