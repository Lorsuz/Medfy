"use client";

import { useRouter } from "next/router";
import { RootState } from "@redux/store";
import {useSelector} from 'react-redux'
export default function Layout({ children }: any) {
  const user = useSelector((state:RootState) => state.auth.user);

  // const router = useRouter();
  // if (user.token) {
  //   router.push("/dashboard");
  // }
  return <>{children}</>;
}
