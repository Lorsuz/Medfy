"use client";

import { authService } from "@drexdev/services/authService";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";

export interface IAuthUser {
  id: string;
  email: string;
  name: string;
  profileImage: string;
  cpf: string;
  role: string;
  university: string;
  period: string;
  trainingYear: string;
  specialty: string;
  meetBy: string;
  verified: 1 | 0;
  createdAt: string;
  updatedAt: string;
  phone: string;
  isAdmin: boolean;
}

interface IAuthContext {
  user: IAuthUser;
  logout(): void;
}

interface INotAuthContext {
  user: undefined;
  login(email: string, password: string): Promise<IAuthUser | undefined>;
}

type AuthContextType = IAuthContext | INotAuthContext;

export const AuthContext = createContext({} as AuthContextType);

export function useAuth<
  authenticated extends boolean
>(): authenticated extends true ? IAuthContext : INotAuthContext {
  const context = useContext(AuthContext) as authenticated extends true
    ? IAuthContext
    : INotAuthContext;

  return context;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IAuthUser | undefined>();

  useEffect(() => {
    const token = getCookie("@medfy:token");

    if (token) {
      authService.saveAuthToken(token);
      authService.fetchDataUser().then((userData) => setUser(userData));
    }
  }, [setUser]);

  async function login(email: string, password: string) {
    const accessToken = await authService
      .signIn(email, password)
      .catch((error) => {
        throw error;
      });

    await authService.saveAuthToken(accessToken);
    const userData = await authService.fetchDataUser();

    setUser(userData);

    return userData;
  }

  function logout() {
    authService.signOut();
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
