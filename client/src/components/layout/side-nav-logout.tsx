import { RiLogoutCircleLine } from "react-icons/ri";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { cn } from "@drexdev/lib/utils";

/*
 * Botao de logout.
 */
export const SideNavLogout = () => {
  const { isMobile, open } = useSidebar();

  return (
    <SidebarMenuItem className="relative">
      <SidebarMenuButton
        className={cn(
          "w-full bg-transparent flex items-center justify-center py-5 transition-all font-medium",
          isMobile || open ? "border-2 rounded-full" : "border-0"
        )}
      >
        <RiLogoutCircleLine />
        {(isMobile || open) && <span className="ml-2">Sair</span>}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
