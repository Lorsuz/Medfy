"use client";

import { BiCaretDown } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { getCookie } from "cookies-next/client";
import { authService } from "@drexdev/services/authService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IAuthUser } from "@drexdev/providers/auth-provider";

export const HeaderUser = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<IAuthUser | null>(null);

  useEffect(() => {
    const cookieUser = getCookie("@medfy:user");
    const user = cookieUser ? JSON.parse(cookieUser) : null;
    setUserData(user);
  }, []);

  if (!userData) {
    return null; 
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-right max-md:hidden">
            <span className="text-sm font-semibold leading-5">
              Olá, <b>{userData.name}</b>
            </span>

            <span className="text-xs leading-none text-muted-foreground">
              Estudante
            </span>
          </div>

          <Avatar>
            <AvatarFallback className="bg-muted-foreground text-white">
              {userData.name.charAt(0)}
            </AvatarFallback>
            <AvatarImage
              src={userData.profileImage}
              alt="Logo da MedFy Academy"
            />
          </Avatar>

          <BiCaretDown className="text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={
          "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white/60 backdrop-blur-md"
        }
        side={"bottom"}
        align={"end"}
        sideOffset={4}
      >
        <DropdownMenuLabel>
          <div
            className={"flex items-center gap-2 px-1 py-2 text-left text-sm"}
          >
            <Avatar className={"rounded-md h-8 w-8"}>
              <AvatarImage src={userData.profileImage} />
              <AvatarFallback className={"rounded-md bg-slate-200"}>
                {userData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className={"grid flex-1 text-sm leading-tight"}>
              <span className={"font-semibold truncate"}>{userData.name}</span>
              <span className={"text-xs truncate font-normal"}>
                {userData.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Meu perfil
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              authService.signOut();
              router.replace("/auth/sign-in");
            }}
          >
            <LogOut />
            Sair
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
