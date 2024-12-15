"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import AuthFormBase from "@component/forms/bases/AuthFormBase";
import InputText from "@component/forms/fields/InputText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import fetchApi from "@service/fetchApi";
import { toast } from "react-toastify";

const schemaLocal = z.object({
  email: z
    .string()
    .min(1, "Este campo é obrigatório")
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido"),
});

type SchemaLocal = z.infer<typeof schemaLocal>;

export default function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaLocal>({
    resolver: zodResolver(schemaLocal),
  });

  async function handleRedirectPage(data: any) {
    try {
      delete data.confirmPassword;
      const response: any = await fetchApi("/user/request-reset", data, "POST");
      toast.info(response.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <StyledComponent className="form-container">
      <h2>Esqueceu a sua senha?</h2>
      <p>
        Digite seu e-mail de cadastro abaixo, e enviaremos um link de
        redefinição para o respectivo email
      </p>
      <AuthFormBase
        onSubmit={handleSubmit(handleRedirectPage)}
        buttonText="Enviar"
        isSubmitting={isSubmitting}
      >
        <InputText
          label="E-mail"
          id="email"
          placeholder="Digite seu e-mail"
          {...register("email")}
          error={errors.email?.message}
        />
      </AuthFormBase>
    </StyledComponent>
  );
}

const StyledComponent = styled.section``;
