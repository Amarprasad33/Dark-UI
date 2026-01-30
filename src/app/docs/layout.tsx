import { source } from '@/lib/source';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pageTree = source.getPageTree();

  return (
    <SidebarProvider>
      <AppSidebar items={pageTree.children} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="w-px h-4 bg-zinc-800 mx-2" />
          <span className="font-medium">Documentation</span>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-8 max-w-4xl mx-auto w-full">
           {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}