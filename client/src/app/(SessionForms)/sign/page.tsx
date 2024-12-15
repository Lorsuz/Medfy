"use client";

import { useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import styled from "styled-components";
import MedfyLogo from "@image/medfy_logo.svg";
import React from "react";

const AuthActionButton = ({
  action,
  buttonText,
  isActive,
}: {
  action: any;
  buttonText: string;
  isActive: boolean;
}) => {
  return (
    <StyledButton onClick={action} $isActive={isActive}>
      {buttonText}
    </StyledButton>
  );
};
const StyledButton = styled.button<{ $isActive: boolean }>`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 2rem;
  padding: 0.3rem 0;
  flex: 1 1 100%;

  border-bottom: ${({ $isActive }) =>
    $isActive ? "3px solid var(--theme-color)" : "3px solid #5d5d5d33"};
  color: ${({ $isActive }) => ($isActive ? "var(--theme-color)" : "#5d5d5dc2")};
  &:hover {
    cursor: pointer;
  }
`;

export default function LoginOrRegister() {
  const [selectedButton, setSelectedButton] = useState<string>("login");
	
  return (
		<StyledComponent $isActive={selectedButton} className="form-container">
        <header>
          <Image src={MedfyLogo} alt="logo image" />
          <h1>Bem-vindo a Medfy Academy</h1>
        </header>
        <div className="toggle-form">
          <AuthActionButton
            isActive={selectedButton === "login"}
            buttonText="Já tenho conta"
            action={() => setSelectedButton("login")}
          />
          <AuthActionButton
            isActive={selectedButton === "register"}
            buttonText="Criar uma conta"
            action={() => setSelectedButton("register")}
          />
        </div>
        {selectedButton === "login" ? (
          <LoginForm></LoginForm>
        ) : (
          <RegisterForm></RegisterForm>
        )}
    </StyledComponent>
  );
}

const StyledComponent = styled.section<{ $isActive: any }>`
    header {
      display: flex;
      flex-direction: column;
      align-content: center;
      img {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        @media (min-width: 1100px) {
          display: none;
        }
      }
      h1 {
        color: var(--theme-color);
        text-align: center;
        font-size: 1.5rem;
      }
    }
    .toggle-form {
      display: flex;
    }
`;
