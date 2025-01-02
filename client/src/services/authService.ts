import { IAuthUser } from "@drexdev/providers/auth-provider";
import { api } from "@drexdev/utils/api";
import { deleteCookie, setCookie } from "cookies-next/client";

interface SignInResponse {
  accessToken: string;
}

async function signIn(email: string, password: string) {
  signOut();
  
  const response = await api
    .post<SignInResponse>("/user/login", {
      email,
      password,
    })
    .catch((error) => {
      console.log(error);

      if (error.response.status === 401) {
        throw new Error("Usuário ou senha inválidos");
      } else if (error.response.status === 429) {
        throw new Error(
          "Limite de tentativas excedido. Tente novamente mais tarde."
        );
      } else {
        throw new Error("Erro ao fazer login.");
      }
    });

  const { accessToken: accessToken } = response.data;

  return accessToken;
}

async function saveAuthToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  setCookie("@medfy:token", token, {
    maxAge: 60 * 60 * 24 * 30,
  });
}

function signOut() {
  delete api.defaults.headers.common["Authorization"];
  deleteCookie("@medfy:token");
  deleteCookie("@medfy:user");
  deleteCookie("@medfy:lastSave");
}

async function fetchDataUser() {
  const { data: userData } = await api
    .get<IAuthUser>("/user/@me")
    .catch((error) => {
      console.error(error);
      throw new Error("Ocorreu um erro ao buscar os dados do usuário.");
    });

  return userData;
}

export const authService = {
  signIn,
  signOut,
  saveAuthToken,
  fetchDataUser,
};
