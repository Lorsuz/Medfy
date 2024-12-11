"use client";
import { useRouter } from "next/navigation";
import { RootState } from "@redux/store";
import { useSelector } from "react-redux";
import SideBar from "@partial/SideBar";
import styled from "styled-components";
export default function Layout({ children }: any) {
  const user = useSelector((state: RootState) => state.auth.user);

  const router = useRouter();
  // if (user && !user.token) {
  //   router.push("/");
  // }
  return (
    <>
      <SideBar></SideBar>
      {children}
    </>
  );
}
