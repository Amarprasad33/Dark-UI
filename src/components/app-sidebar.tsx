import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import * as PageTree from "fumadocs-core/page-tree";
import { Logo } from "./landing/logo";

export function AppSidebar({ items }: { items: PageTree.Node[] }) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 pb-[19px] border-b border-sidebar-border">
        <Link
          href="/"
          className="font-bold text-lg translate-y-[2.5px] flex gap-1"
        >
          <Logo width={24} height={24} className="translate-y-[3px]" />
          Dark UI
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {items.map((item, index) => {
          if (item.type === "folder") {
            return (
              <SidebarGroup key={index}>
                <SidebarGroupLabel>{item.name}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.children.map((child: PageTree.Node, idx) => (
                      <SidebarItem key={idx} item={child} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }
          return (
            <SidebarGroup key={index}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarItem item={item} />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}

function SidebarItem({ item }: { item: PageTree.Node }) {
  if (item.type === "page") {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={item.url} className="w-full">
            {item.name}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  if (item.type === "folder") {
    return (
      <SidebarMenuItem>
        <div className="font-medium px-2 py-1.5 text-sm text-sidebar-foreground/70">
          {item.name}
        </div>
        {item.children.map((child: PageTree.Node, idx) => (
          <div key={idx} className="pl-2">
            <SidebarItem item={child} />
          </div>
        ))}
      </SidebarMenuItem>
    );
  }

  return null;
}
