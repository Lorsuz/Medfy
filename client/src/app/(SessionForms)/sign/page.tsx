"use client";

import { useEffect, useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import styled from "styled-components";
import MedfyLogo from "@image/medfy_logo.svg";
import HomeImage from "@image/home_image.svg";
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
    $isActive ? "3px solid var(--theme-color)" : "3px solid #a3a3a3"};
  color: ${({ $isActive }) => ($isActive ? "var(--theme-color)" : "#a3a3a3")};
  &:hover {
    cursor: pointer;
  }
`;

export default function LoginOrRegister() {
  const [selectedButton, setSelectedButton] = useState<string>("login");
	
  return (
		<StyledComponent $isActive={selectedButton}>
      <section className="logo">
        <Image src={MedfyLogo} alt="logo image" />
      </section>
      <section className="authentication-form">
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
      </section>
    </StyledComponent>
  );
}

const StyledComponent = styled.main<{ $isActive: any }>`
  background: var(--theme-color) url(${HomeImage.src}) fixed center;
  background-size: 400px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
	justify-content: center;
	padding: 5dvw;

  @media (max-width: 1100px) {
    display: flex;
  }
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      max-width: 400px;
			filter: drop-shadow(-10px 10px 0px #E8E2F8);

      max-height: 400px;
    }
    @media (max-width: 1100px) {
      display: none;
    }
  }

  .authentication-form {
    background: #ffffffdc;
		border: 2px solid #ffffff;
    padding: 30px;
		backdrop-filter: blur(10px);
		max-width: 800px;
    border-radius: 15px;
    grid-column: 2;
		box-shadow: -5px 5px 15px 0 #000000b9, 5px -5px 15px 0 #ffffff42;

    header {
      flex: 1 1 100%;
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
  }
`;
