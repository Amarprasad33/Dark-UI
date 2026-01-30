import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { source } from "@/lib/source";

export default function ComponentsShowLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pageTree = source.getPageTree();
  return (
    <SidebarProvider>
      <AppSidebar items={pageTree.children} />
      <section className="w-full">
        <div className="appbar border-b border-zinc-700 py-1 px-4 flex w-full">
          <SidebarTrigger />
        </div>
        {children}
      </section>
    </SidebarProvider>
  );
}
