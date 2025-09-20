import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarContent,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

const sidebarMenuItems = [
  { label: "Tubelight Accodtion", href: "/components/tubelight-accordion" },
  { label: "Luminated Checkbox", href: "/components/luminated-checkbox" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {sidebarMenuItems.map((item) => (
                  <SidebarMenuButton
                    key={item.label}
                    className="cursor-pointer"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </SidebarMenuButton>
                ))}

                {/* <SidebarMenuButton>Flashlight Tabs</SidebarMenuButton>
                <SidebarMenuButton>Flashlight Checkbox</SidebarMenuButton> */}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
