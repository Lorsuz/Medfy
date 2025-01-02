import { Header } from "@drexdev/components/layout/header";
import { SideNav } from "@drexdev/components/layout/side-nav";
import { SidebarProvider } from "@drexdev/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SideNav />
      <main className="relative flex min-h-screen flex-1 flex-col bg-[hsl(var(--sidebar-background))] z-20">
        <div className="relative bg-background md:rounded-l-[30px] overflow-auto h-screen py-0">
          <Header />

          <div className="px-[4.5%] mx-auto w-full max-w-[1550px]">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
