"use client";

import Image from "next/image";
import styled from "styled-components";
import MedfyLogo from "@image/medfy_logo.svg";
import HomeImage from "@image/home_image.svg";
import React from "react";

export default function LoginOrRegister({ children }: { children: any }) {
  return (
    <StyledComponent>
      <section className="logo">
        <Image src={MedfyLogo} alt="logo image" />
      </section>
      {children}
    </StyledComponent>
  );
}

const StyledComponent = styled.main`
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
  section.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      max-width: 400px;
      filter: drop-shadow(-10px 10px 0px #e8e2f8);

      max-height: 400px;
    }
    @media (max-width: 1100px) {
      display: none;
    }
  }

  section.form-container {
    background: #ffffffdc;
    border: 2px solid #ffffff;
    padding: 30px;
    backdrop-filter: blur(10px);
    max-width: 800px;
    border-radius: 15px;
    grid-column: 2;
    box-shadow: -5px 5px 15px 0 #000000b9, 5px -5px 15px 0 #ffffff42;
    h2 {
      color: var(--theme-color);
      font-weight: 700;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 1.5rem;
			color: #656565;
    }
  }
`;
