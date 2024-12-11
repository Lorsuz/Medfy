"use client";

import { useRouter } from "next/navigation";

import medfy_logo from "@image/medfy_logo.svg";
import Image from "next/image";
import { PasswordInput } from "../../styles";
import { MouseEvent } from "react";

import {
  ConfirmPasswordInput,
  CreateNewPasswordContainer,
  CreateNewPasswordContent,
  CreateNewPasswordHeader,
  SaveNewPasswordButton,
} from "./styles";

export default function CreateNewPassword() {
  const router = useRouter();

  function handleRedirectPage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    router.push("/");
  }

  return (
    <CreateNewPasswordContainer>
      <CreateNewPasswordHeader>
        <Image src={medfy_logo} alt="medfy logo" />
        <h1>Crie uma nova senha</h1>
      </CreateNewPasswordHeader>
      <CreateNewPasswordContent>
        <label htmlFor="passwordInput">Digite sua nova senha</label>
        <PasswordInput
          id="passwordInput"
          placeholder="Digite sua senha novamente"
        />
        <label htmlFor="passwordInput">Repita sua senha</label>
        <ConfirmPasswordInput
          id="passwordInput"
          placeholder="Digite sua senha novamente"
        />
        <SaveNewPasswordButton onClick={(event) => handleRedirectPage(event)}>
          Salvar
        </SaveNewPasswordButton>
      </CreateNewPasswordContent>
    </CreateNewPasswordContainer>
  );
}
