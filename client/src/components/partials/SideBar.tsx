"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { logout } from "@redux/authSlice";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

import { usePathname } from "next/navigation";

import { IoIosArrowForward } from "react-icons/io";
import { FiBookOpen } from "react-icons/fi";
import { LiaCreditCard } from "react-icons/lia";
import { BiBarChartAlt2 } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { RootState } from "@redux/store";
import { useSelector, useDispatch } from "react-redux";
import MedfyLogo from "@image/medfy_logo.svg";
import styled from "styled-components";
import NavLink from "./NavLink";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

const SideBar = () => {
  const [hideBar, setHideBar] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  function handleLogOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("@user:user-1.0.0");
    }
    dispatch(logout());
    router.push("/");
  }

  return (
    <StyledComponent>
      <header className="logo">
        <Image src={MedfyLogo} alt="logo img"></Image>
        <h1>MedFy Academy</h1>
      </header>
      <div className="profile">
        <div className="info">
          <Image
            src={
              user.profileImage ||
              "https://ui-avatars.com/api/?background=008025&color=ffffff&name=PR&size=100"
            }
            width={100}
            height={100}
            alt="profile image"
          />
          <div className="desc">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <button
          className="toggle-aside"
          onClick={() => setHideBar((prev) => !prev)}
        >
          {hideBar ? (
            <TbLayoutSidebarLeftCollapse />
          ) : (
            <TbLayoutSidebarLeftExpand />
          )}
        </button>
      </div>
      <nav>
        <ul>
          {user.isAdmin ? (
            <>
              <NavLink
                href="/admin/dashboard"
                text="Dashboard"
                icon={<BiBarChartAlt2 />}
              />
              <NavLink
                href="/admin/questions"
                text="Questões"
                icon={<FiBookOpen />}
              />
              <NavLink
                href="/admin/plans"
                text="Planos"
                icon={<LiaCreditCard />}
              />
              <NavLink
                href="/admin/users"
                text="Usuários"
                icon={<LiaCreditCard />}
              />
              <NavLink
                href="/admin/reports"
                text="Reportes"
                icon={<LiaCreditCard />}
              />
              <NavLink
                href="/admin/reports"
                text="Reportes"
                icon={<LiaCreditCard />}
              />
            </>
          ) : (
            <>
              <NavLink
                href="/user/dashboard"
                text="Dashboard"
                icon={<BiBarChartAlt2 />}
              />
							<NavLink
                href="/user/profile"
                text="Perfil"
                icon={<BiBarChartAlt2 />}
              />
              <NavLink
                href="/user/questions"
                text="Questões"
                icon={<FiBookOpen />}
              />
              <NavLink
                href="/user/assinaturas"
                text="Assinaturas"
                icon={<LiaCreditCard />}
              />
            </>
          )}
        </ul>
      </nav>
      <footer className="logout">
        <button onClick={handleLogOut}>
          <LuLogOut
            size={20}
            color="#FFFFFF"
            style={{
              transform: "rotate(180deg)",
            }}
          />
          <span>Sair</span>
        </button>
      </footer>
    </StyledComponent>
  );
};
export default SideBar;

const StyledComponent = styled.aside`
  top: 10px;
  height: calc(100dvh - 20px);
  position: sticky;
  background: var(--theme-color);
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;	
  bottom: 10px;
  left: 10px;
  header {
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 0 20px 20px;
    img {
      width: 70px;
      height: 70px;
    }

    h1 {
      color: white;
      font-size: 1.4rem;
    }
  }
  .profile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px 20px;	
		border-top: 1px solid #cccccc6b;
		border-bottom: 1px solid #cccccc6b;
		padding: 10px 0;
    .info {
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
      .desc {
        h2 {
          color: white;
          font-size: 1.3rem;
        }
        p {
          color: #d9d9d9;
          font-size: 0.7rem;
        }
      }
    }
    button {
      color: white;
      font-size: 1.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			
    }
  }
  nav {
    margin: 20px 0;
    flex: 1;
    ul {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
  footer {
    justify-self: end;
		margin: 0 20px;
    button {
			border: 2px solid white;
			display: flex;
			width: 100%;
			gap:10px;
			justify-content: center;
			border-radius: 10px;
			padding: 10px 20px;
			/* width: 100%; */
      span,
      svg {
        color: #fff;
      }
			span{
				font-size: 1.2rem;
				display: block;
				flex:1;
			}
      &:hover {
        background: #ffffff;
        span,
        svg * {
          color: var(--theme-color);
        }
      }
    }
  }
`;
