"use client";
import { HeaderNavTrigger } from "./header-nav-trigger";
import { HeaderUser } from "./header-user";

export const Header = () => {
  return (
    <header className="w-full flex items-center justify-between h-20 px-[4.5%] md:px-7 sticky top-0 bg-background/50 backdrop-blur-md z-30">
      <HeaderNavTrigger />
      <HeaderUser />
    </header>
  );
};
