import { api } from "@drexdev/utils/api";

export function useAuth() {
  async function login(email: string, password: string) {
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    login,
  };
}
