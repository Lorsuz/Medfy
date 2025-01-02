import Image from "next/image";

import { SidebarHeader, useSidebar } from "../ui/sidebar";

export const SideNavHeader = () => {
  const { isMobile, open } = useSidebar();

  return (
    <SidebarHeader>
      <div className="flex items-center justify-center py-3 gap-2">
        <Image
          src="/images/medfy_logo.svg"
          width={50}
          height={50}
          alt="Logo da MedFy Academy"
          className="h-12 w-12"
        />

        {(isMobile || open) && (
          <h1 className="text-lg text-sidebar-foreground font-semibold tracking-tighter">
            MedFy <span className="text-secondary-foreground">Academy</span>
          </h1>
        )}
      </div>
    </SidebarHeader>
  );
};
