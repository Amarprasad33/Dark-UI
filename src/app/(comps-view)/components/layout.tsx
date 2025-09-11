import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ComponentsShowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="w-full">
        <div className="appbar border-b border-zinc-700 py-1 px-4 flex w-full">
          <SidebarTrigger />
        </div>
        {children}
      </section>
    </SidebarProvider>
  );
}
