import instance from "@/lib/axios";
import type { LoginResponse } from "@/models/Auth";

export const AuthService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await instance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },
};
