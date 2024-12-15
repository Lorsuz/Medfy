import { SideNav } from "@/components/layout/side-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SideNav />

      <main className="w-full h-screen bg-[#f3f3f3] rounded-l-[50px] py-8 px-[5.5%] overflow-auto">
        {children}
      </main>
    </SidebarProvider>
  );
}
