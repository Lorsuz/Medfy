"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { MouseEvent } from "react";

export default function ForgotPassword() {
  const router = useRouter();

  function handleRedirectPage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    router.push("/passwordResetSend");
  }

  return (
    <StyledComponent>
      <form>
        <h2>Esqueceu a sua senha?</h2>
        <p>
          Digite seu e-mail de cadastro abaixo, e enviaremos um link para
          redefinição.
        </p>
        <label htmlFor="emailInput">E-mail</label>
        <input id="emailInput" placeholder="Digite seu e-mail" />
        <button onClick={(event) => handleRedirectPage(event)}>Enviar</button>
      </form>
    </StyledComponent>
  );
}

const StyledComponent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100vw;
  height: 100vh;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column: 2 / 2;
    height: 100%;
    background: white;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
    padding: 0 6.9375rem;

    label {
      margin-bottom: 0.625rem;
      color: #505050;
      font-weight: 500;
    }
    input {
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #dcdcdc;
      margin-bottom: 4.125rem;

      &::placeholder {
        color: #adadad;
        font-weight: 300;
      }

      button {
        background: var(--theme-color);
        padding: 1rem 0 1rem 0;
        border-radius: 40px;
        color: #ffffff;
        font-weight: 700;
        border: none;

        &:hover {
          cursor: pointer;
        }
      }
    }

    a {
      text-align: end;
      margin-bottom: 2rem;
      font-size: 0.75rem;
    }

    h2 {
      color: var(--theme-color);
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    p {
      margin-bottom: 1.5rem;
    }
  }
`;
