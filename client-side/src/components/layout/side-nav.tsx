import React from "react";
import { Sidebar } from "../ui/sidebar";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SideNavProps {}

export const SideNav: React.FC<SideNavProps> = () => {
  return (
    <Sidebar
      className="border-none"
      variant="sidebar"
      collapsible="icon"
    >
      
    </Sidebar>
  );
};
