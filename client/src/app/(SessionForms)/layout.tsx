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
	*{
		user-select:none;
	}
  

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
    width: 100%;
    border-radius: 15px;
    grid-column: 2;
    box-shadow: -5px 5px 15px 0 #000000b9, 5px -5px 15px 0 #ffffff42;

    h2 {
      color: var(--theme-color);
      font-weight: 700;
      font-size: 1.7rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    p {
      margin-bottom: 1.5rem;
      text-align: center;
      color: #656565;
    }
  }
	@media (max-width: 500px) {
    padding: 0;
		
		section.form-container{
			border-radius:0;
			padding:100px 5dvw 50px;
			min-height:100vh;
		}
  }
`;
