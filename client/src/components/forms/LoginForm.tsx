"use client";

import React, { useEffect, useState } from "react";
import AuthFormBase from "./bases/AuthFormBase";
import { loginSchema } from "@schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import fetchApi from "@/utils/services/fetchApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@redux/authSlice";
import { RootState } from "@redux/store";
import InputText from "./fields/InputText";
import Link from "next/link";
type UserLoginSchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const dispatch = useDispatch();

  async function handleAuthenticateUser(data: UserLoginSchema) {
    try {
      const response = await fetchApi("/user/login", data, "POST");
			console.log(response);
			
      if (response) {
				toast.success("login efetuado com sucesso");
        setIsLogged(true);
        dispatch(login(response));
        response.isAdmin
          ? router.push("/admin/dashboard")
          : router.push("/user/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <AuthFormBase
      onSubmit={handleSubmit(handleAuthenticateUser)}
      buttonText="Entrar"
      isSubmitting={isSubmitting || isLogged}
    >
      <InputText
        label="Email"
        id="email"
        placeholder="Digite seu email"
        {...register("email")}
        error={errors.email?.message}
      />
      <InputText
        label="Senha"
        id="password"
        type="password"
        placeholder="Digite sua senha"
        {...register("password")}
        error={errors.password?.message}
      />

      <Link href="/forgot-password">Esqueci minha senha</Link>
    </AuthFormBase>
  );
};

export default LoginForm;
