"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { use } from "react";
import fetchApi from "@service/fetchApi";
import AuthFormBase from "@component/forms/bases/AuthFormBase";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputText from "@component/forms/fields/InputText";
import { toast } from "react-toastify";

const schemaLocal = z
  .object({
    password: z
      .string()
      .min(1, "Este campo é obrigatório")
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .refine(
        (password) => /[a-z]/.test(password),
        "A senha deve conter pelo menos uma letra minúscula."
      )
      .refine(
        (password) => /[A-Z]/.test(password),
        "A senha deve conter pelo menos uma letra maiúscula."
      )
      .refine(
        (password) => /\d/.test(password),
        "A senha deve conter pelo menos um número."
      )
      .refine(
        (password) => /[@$!#%*?&]/.test(password),
        "A senha deve conter pelo menos um caractere especial."
      ),
    confirmPassword: z
      .string()
      .min(6, "A confirmação de senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
type SchemaLocal = z.infer<typeof schemaLocal>;

export default function page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const token = decodeURIComponent(resolvedParams.token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaLocal>({
    resolver: zodResolver(schemaLocal),
  });

  useEffect(() => {}, []);

  async function handleRedirectPage(data: any) {
    try {
      delete data.confirmPassword;
      data = { ...data, token };
      const response: any = await fetchApi("/user/reset-password", data, "POST");
			console.log("response: ",'message' in response)
			if(response ) {
				router.push("/sign");
				toast.success(response.message)
			}
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <StyledComponent className="form-container">
      <h2>Crie uma nova senha</h2>
      <AuthFormBase
        onSubmit={handleSubmit(handleRedirectPage)}
        buttonText="Salvar"
        isSubmitting={isSubmitting}
      >
        <InputText
          label="Nova senha"
          id="password"
          type="password"
          placeholder="Digite sua nova senha"
          {...register("password")}
          error={errors.password?.message}
        />
        <InputText
          label="Confirmar nova senha"
          id="confirm-password"
          type="password"
          placeholder="Digite sua senha novamente"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </AuthFormBase>
    </StyledComponent>
  );
}

const StyledComponent = styled.section``;
