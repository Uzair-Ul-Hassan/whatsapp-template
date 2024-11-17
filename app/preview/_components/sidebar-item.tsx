"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Template } from "@/types";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface SidebarItemProps {
  item: Template;
}

export const SidebarItem = ({ item }: SidebarItemProps) => {
  const { toggleSidebar, isMobile } = useSidebar();
  const pathname = usePathname();
  const url = `/preview/${item._id}`;
  const isActive = pathname === url;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        onClick={() => isMobile && toggleSidebar()}
        className={cn(
          "text-muted-foreground",
          isActive && "text-black bg-gray-200 hover:bg-gray-200"
        )}
      >
        <Link href={url}>
          <span>{item.name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
