import { ILink } from "@drexdev/utils/types";

import { SidebarGroup, SidebarMenu, useSidebar } from "../ui/sidebar";
import { useEffect, useState } from "react";
import { Home, ListTodo, UserCircle2 } from "lucide-react";
import { cn } from "@drexdev/lib/utils";
import { SideNavLink } from "./side-nav-link";
import { IAuthUser } from "@drexdev/providers/auth-provider";
import { getCookie } from "cookies-next/client";
import { redirect } from "next/navigation";

export const SideNavLinks = () => {
  const { open, isMobile } = useSidebar();

  const [userData, setUserData] = useState<IAuthUser | null>(null);
  const [linkSelected, setLinkSelected] = useState<string>("/app");

  useEffect(() => {
    const cookieUser = getCookie("@medfy:user");
    const user = cookieUser ? JSON.parse(cookieUser) : null;
    console.log(user);
    setUserData(user);
  }, []);

  if (!userData) {
    return null;
  }

  // Define os links padrão
  const links: ILink[] = [
    { title: "Painel do Aluno", href: "/app", icon: Home },
    { title: "Meu Perfil", href: "/app/perfil", icon: UserCircle2 },
    { title: "Questões", href: "/app/questoes", icon: ListTodo },
  ];

  // Adiciona o link de admin se o usuário for admin
  if (userData.isAdmin) {
    links.push({ title: "Painel Admin", href: "/app/admin", icon: Home });
  }

  const isSidebarOpen = open || isMobile;

  return (
    <SidebarGroup className={cn("p-0", isSidebarOpen && "pl-4")}>
      <SidebarMenu>
        {links.map((link) => (
          <SideNavLink
            key={link.href}
            selected={linkSelected === link.href}
            select={() => {
              setLinkSelected(link.href);
              redirect(link.href);
            }}
            {...link}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
