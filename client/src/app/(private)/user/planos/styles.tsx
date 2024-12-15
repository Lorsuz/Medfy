"use client";

import styled from "styled-components";

export const MySignatureContainer = styled.div`
  display: flex;
  padding: 3.125rem 3.125rem 0 3.125rem;
  background: #f3f3f3;
`;

export const TitleAndContent = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  flex-direction: column;
  margin-left: 2.5rem;

  h2 {
    font-weight: 500;
  }

  h1 {
    margin: 0.4rem 0 2.5rem 0;
  }
`;

export const LeafletsContainer = styled.section`
  padding-left: 3rem;

  h2 {
    margin-top: 0.5rem;
    margin-bottom: 3.5rem;
    font-size: 1.75rem;
  }
`;
export const ImageAndTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.6rem;

  p {
    font-size: 1.25rem;
  }

  span {
    color: #242424;
    font-weight: 600;
  }
`;
export const ImageAndTextContainerAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--theme-color)0d;
  margin-bottom: 2.6rem;

  p {
    font-size: 1.25rem;
  }

  span {
    color: #242424;
    font-weight: 600;
  }
`;
export const SignaturesAndLeafletsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const SignaturesContainer = styled.section`
  display: flex;
  flex-direction: column;

  border-right: 1px solid var(--theme-color)0d;
  padding-right: 3rem;
`;
export const SignaturesCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  transition: transform 0.6s ease, box-shadow 0.6s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`;
export const InputAndLabel = styled.div`
  display: flex;
  gap: 0.5rem;

  label {
    color: #242424;
    font-weight: 600;
  }

  input[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid var(--theme-color);
    border-radius: 50%;
    background-color: transparent;
    position: relative;
    cursor: pointer;
    outline: none;
  }

  input[type="radio"]:checked::before {
    content: "";
    width: 8px;
    height: 8px;
    background-color: white;
    border: 4px solid var(--theme-color);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const InputAndLabelAndPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--theme-color)0d;
  padding-bottom: 2rem;
`;

export const BenefitsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccessTimeContainer = styled.div`
  display: flex;
  margin-top: 1.7rem;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
`;

export const PaymentCollectionContainer = styled(AccessTimeContainer)``;

export const PaymentRedirectButton = styled.button`
  background: var(--theme-color);
  color: #f9f9f9;
  font-weight: 700;
  padding: 1rem;
  border-radius: 28px;
  border: none;
  margin-top: 2.5rem;

  &:hover {
    cursor: pointer;
  }
`;
