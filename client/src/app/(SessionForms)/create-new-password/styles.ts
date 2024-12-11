"use client";

import styled from "styled-components";

export const CreateNewPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  margin-top: 2.25rem;
  align-items: center;
`;

export const CreateNewPasswordHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    color: var(--theme-color);
    font-size: 1.25rem;
    margin-top: 2rem;
  }
`;

export const CreateNewPasswordContent = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 32.625rem;
  border-radius: 18px;
  padding: 1rem;
  margin-top: 1.5rem;

  box-shadow: 3px 2px rgba(0, 0, 0, 0.03);

  label {
    margin-bottom: 0.625rem;
    color: #505050;
    font-weight: 500;
  }
`;

export const PasswordInput = styled.input`
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background: #f3f3f3;
  margin-bottom: 1.5rem;

  font-size: 0.75rem;
`;
export const ConfirmPasswordInput = styled( PasswordInput )``;

export const SaveNewPasswordButton = styled.button`
  background: var(--theme-color);
  padding: 1rem 0 1rem 0;
  border-radius: 40px;
  color: #ffffff;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
