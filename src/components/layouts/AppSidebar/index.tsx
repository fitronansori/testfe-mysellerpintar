"use client";

import { LogOut, Newspaper, Tag } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  //   SidebarGroup,
  //   SidebarGroupContent,
  SidebarHeader,
  //   SidebarMenu,
  //   SidebarMenuButton,
  //   SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/components/common/blog-logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Articles",
    url: "/dashboard",
    icon: Newspaper,
  },
  {
    title: "Category",
    url: "/dashboard/category",
    icon: Tag,
  },
  {
    title: "Logout",
    url: "logout",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-primary py-6">
      <SidebarHeader>
        <Logo typeLogo="white" className="p-2" />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                "p-2 flex items-center gap-2 text-white rounded-[6px] hover:bg-blue-400 hover:text-white font-medium",
                pathname === item.url && "bg-blue-400"
              )}
            >
              <item.icon className="size-5" />
              {item.title}
            </Link>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
