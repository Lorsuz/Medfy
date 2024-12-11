"use client";

import React, { useState } from "react";
import { registerSchema } from "@schema/userSchema";
import { Controller, useForm } from "react-hook-form";
import fetchApi from "@/utils/services/fetchApi";
import { zodResolver } from "@hookform/resolvers/zod";
import MaskedInput from "react-text-mask";
import AuthFormBase from "./bases/AuthFormBase";
import z from "zod";
import InputText from "./fields/InputText";
import { toast } from "react-toastify";

type UserRegisterSchema = z.infer<typeof registerSchema>;
const RegisterForm = () => {
  const [datas, setDatas] = useState("ola");

  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
      isSubmitting
    },
  } = useForm<UserRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function handleCreateUser(data: UserRegisterSchema) {
    try {
      const response = await fetchApi("/user/register", data, "POST");
      toast.info(response.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <AuthFormBase
      onSubmit={handleSubmit(handleCreateUser)}
      buttonText="Criar minha conta"
      isSubmitting={isSubmitting}
    >
      <InputText
        label="Nome"
        id="name"
        placeholder="Digite seu nome completo"
        {...register("name")}
        error={errors.name?.message}
      />
      <InputText
        label="E-mail"
        id="email"
        placeholder="Digite seu e-mail"
        {...register("email")}
        error={errors.email?.message}
      />
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <InputText
            label="Telefone"
            id="phone"
            size="1/2"
            {...field}
            error={error?.message || errors.phone?.message}
          >
            <MaskedInput
              {...field}
              mask={[
                "(",
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              placeholder="(__) _ ____-____"
              type="text"
              id="phone"
            />
          </InputText>
        )}
      />
      <Controller
        name="cpf"
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <InputText
            label="CPF"
            id="cpf"
            size="2/3"
            {...field}
            error={error?.message || errors.cpf?.message}
          >
            <MaskedInput
              {...field}
              mask={[
                /\d/,
                /\d/,
                /\d/,
                ".",
                /\d/,
                /\d/,
                /\d/,
                ".",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
              ]}
              placeholder="___.___.___-__"
              type="text"
              id="cpf"
            />
          </InputText>
        )}
      />

      <InputText
        label="Senha"
        id="password"
        type="password"
        placeholder="Digite sua senha"
        {...register("password")}
        error={errors.password?.message}
      />
      <InputText
        label="Confirmar senha"
        id="confirm-password"
        type="password"
        placeholder="Digite sua senha novamente"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
    </AuthFormBase>
  );
};

export default RegisterForm;
