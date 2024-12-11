"use client";

import styled from "styled-components";
import React from "react";

const AuthFormBase = ({
  children,
  onSubmit = () => {},
  buttonText,
  isSubmitting = false,
}: {
  children: React.ReactNode;
  onSubmit: any;
  buttonText: string;
  isSubmitting?: boolean;
}) => {
  return (
    <StyledComponent onSubmit={onSubmit} $isSubmitting={isSubmitting}>
      {children}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Carregando..." : buttonText}
      </button>
    </StyledComponent>
  );
};

export default AuthFormBase;

const StyledComponent = styled.form<{ $isSubmitting: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;
  gap: 1rem;
  > a {
    display: block;
    width: 100%;
    text-align: right;
    grid-column: 1/3;
    color: var(--theme-color);
    font-weight: 700;
    &:hover {
      text-decoration: underline;
    }
  }
  > button {
    background: ${({ $isSubmitting }) => ($isSubmitting ? "#220072" : "var(--theme-color)")};
    padding: 1rem 0;
    grid-column: 1/3;
    border-radius: 10px;
    color: #ffffff;
    font-weight: 700;

    &:hover {
      cursor: pointer;
      letter-spacing: 1px;
    }
  }
`;
