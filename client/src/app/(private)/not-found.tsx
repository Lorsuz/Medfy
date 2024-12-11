"use client";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import MedfyLogo from "@image/medfy_logo.svg";

export default function NotFound() {
  return (
    <StyledComponent>
      <section>
        <div className="container">
          <h1>404</h1>
          <h2>Em desenvolvimento...</h2>
          <p>Funcionalidade não encontrada e provavelmente em desenvolvimento!</p>
          <div className="img">
            <Image src={MedfyLogo} alt=""></Image>
          </div>
          <Link href="/user/dashboard">Retornar ao início</Link>
        </div>
      </section>
    </StyledComponent>
  );
}

const StyledComponent = styled.main`
  /* padding: 100px 0; */
	

  .container {
    grid-column: 2/12;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  h1 {
    font-size: 7rem;
    font-weight: 900;
    text-align: center;
    color: var(--theme-color);
    margin: 0;
    font-family: serif;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    text-align: center;
    color: var(--theme-color);
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #a7a7a7;
    text-align: center;
  }
  .img {
    max-width: 200px;
    width: 100%;
    margin: 20px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }

  a {
    font-size: 1.2rem;
    color: var(--theme-color);
    border-radius: 15px 0;
    padding: 10px 50px;
    text-decoration: none;
    transition: background-color 0.3s ease;
    display: block;
    border: 2px solid var(--theme-color);
    font-weight: 600;

    &:hover {
      color: var(--white-color);
      background-color: var(--dark-theme-color);
    }
  }
`;
