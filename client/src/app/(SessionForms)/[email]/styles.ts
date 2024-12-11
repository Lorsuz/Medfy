"use client";

import styled from "styled-components";

export const PasswordResetSendPasswordContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: var(--theme-color);
  width: 100vw;
  height: 100vh;

  h1 {
    font-size: 1.25rem;
    margin-top: 1.6rem;
    color: #575757;
  }

  p {
    text-align: center;
    color: #838383;
    margin-top: 1.5rem;
    max-width: 28.375rem;
    font-size: 0.875rem;
  }
`;

export const PasswordResetSendPasswordContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  grid-column: 2 / 3;
  padding: 0 6.9375rem;

  img {
    align-self: center;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.25rem;
    color: var(--theme-color);
    font-weight: 700;
    margin-top: 1rem;
  }

  p {
    text-align: start;
    color: #242424;
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

export const ReSendEmailAndNoticeWaitContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 2.5rem 0 1rem 0;
    font-size: 0.8125rem;
    color: #5c5c5c;
    font-weight: 300;
  }
`;
export const ReSendEmailButton = styled.button`
  background: var(--theme-color);
  min-width: 30.625rem;
  padding: 1rem 0 1rem 0;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.25rem;
  color: #ffffff;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
