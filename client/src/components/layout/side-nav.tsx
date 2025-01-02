"use client";

import { SideNavProps } from "@drexdev/utils/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
} from "../ui/sidebar";
import { SideNavHeader } from "./side-nav-header";
import { SideNavLinks } from "./side-nav-links";
import { SideNavLogout } from "./side-nav-logout";

export const SideNav: React.FC<SideNavProps> = () => {
  return (
    <Sidebar className="border-none" collapsible="icon" variant="sidebar">
      <SideNavHeader />

      <SidebarContent className="pt-6 overflow-visible flex flex-col items-center">
        <SideNavLinks />
      </SidebarContent>

      <SidebarFooter className="pb-8 px-5">
        <SidebarMenu>
          <SideNavLogout />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
