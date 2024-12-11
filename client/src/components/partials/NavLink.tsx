"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

interface NavLinkProps {
  href: string;
  text: string;
  icon?: any;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon = "", text = "" }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <StyledComponent $isActive={isActive}>
      <span className="top"></span>
      <span className="bottom"></span>
      <Link href={href}>
        <div>
          {icon}
          {text}
        </div>
        {isActive && <IoIosArrowForward />}
      </Link>
    </StyledComponent>
  );
};

export default NavLink;

const StyledComponent = styled.li<{ $isActive: boolean }>`
  width: 70%;
  position: relative;
  background: ${({ $isActive }) =>
    $isActive ? "#f3f3f3" : "var(--theme-color)"};
  border-radius: 0 50px 50px 0;
	z-index: ${({ $isActive }) => ($isActive ? "1" : "auto")};
  a {
    display: flex;
    align-items: center;
		justify-content: space-between;
    padding: 15px;
    cursor: pointer;
    gap: 20px;
		font-weight: 800;
    div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    color: ${({ $isActive }) => ($isActive ? "var(--theme-color)" : "#fff")};

    svg {
      font-size: 1.5rem;
      color: ${({ $isActive }) => ($isActive ? "var(--theme-color)" : "#fff")};
    }
  }
  span,
  span::after {
    position: absolute;
    width: 20px;
    aspect-ratio: 1;
    display: block;
    left: 0;
  }
  span {
    background: ${({ $isActive }) =>
      $isActive ? "#f3f3f3" : "var(--theme-color)"};
    &::after {
      content: "";
      background: var(--theme-color);
    }
  }
  .top {
    top: 0;
		transform: translateY(-100%);
    &::after {
      border-radius: 0px 0 0 100%;
      top: 0;
    }
  }
  .bottom {
		bottom: 0;
		transform: translateY(100%);
    &::after {
      border-radius: 100% 0 0 0px;
      bottom: 0;
    }
  }
`;
