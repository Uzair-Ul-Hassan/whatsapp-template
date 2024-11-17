import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarItem } from "./sidebar-item";
import { Template } from "@/types";

export const AppSidebar = async () => {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.PROD_HOST
        : "http://localhost:3000"
    }/api/whatsapp-template`,
    { cache: "no-store" }
  );
  const templates: Template[] = await res.json();

  return (
    <Sidebar className="pt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Templates</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {templates.map((item) => (
                <SidebarItem key={item._id} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
