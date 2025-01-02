import React from "react";

import { cn } from "@drexdev/lib/utils";
import { SideNavLinkProps } from "@drexdev/utils/types";

import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";

export const SideNavLink: React.FC<SideNavLinkProps> = ({
  title,
  icon: Icon,
  selected,
  select,
}) => {
  const { isMobile, open } = useSidebar();

  const selectedClasses = selected
    ? "py-6 px-5 text-primary font-semibold bg-background overflow-visible"
    : "py-5 px-5 text-white hover:bg-transparent hover:text-white active:bg-transparent active:text-white";

  const buttonClasses =
    !open && !isMobile
      ? "rounded-full flex items-center justify-center !w-48 !h-48 duration-500"
      : "rounded-l-3xl duration-75";

  return (
    <SidebarMenuItem
      className={cn(
        "relative rounded-l-3xl",
        selected && open && "bg-background"
      )}
      onClick={select}
    >
      {/* Mostra as bordas arredondadas quando o menu estiver aberto, mas nao estiver no mobile */}
      {!isMobile && selected && open && (
        <>
          <div
            className={cn(
              "bg-background absolute -top-7 right-0 before:rounded-br-3xl size-7",
              "before:content-[''] before:size-7 before:bg-[hsl(var(--sidebar-background))] before:bottom-0 before:absolute"
            )}
          />
          <div
            className={cn(
              "bg-background absolute -bottom-7 right-0 before:rounded-tr-3xl size-7",
              "before:content-[''] before:size-7 before:bg-[hsl(var(--sidebar-background))] before:bottom-0 before:absolute"
            )}
          />
        </>
      )}

      <SidebarMenuButton
        className={cn("rounded-none mx-auto", buttonClasses, selectedClasses)}
      >
        <Icon className="!w-5 !h-5" />
        {(open || isMobile) && <p className="text-base">{title}</p>}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
