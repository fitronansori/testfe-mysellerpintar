import UserAvatar from "@/components/common/user-avatar";
import { cn } from "@/lib/utils";

import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  pageName: string;
  className?: string;
};

const DasboardHeader = ({ pageName, className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "h-[68px] w-full transition-colors duration-300 z-50 bg-white border-b",
        className
      )}
    >
      <div className="size-full flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <p className="text-xl font-semibold">{pageName}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-[2px] focus:ring-offset-2 focus:ring-primary rounded-full">
            <div className="flex items-center gap-2 cursor-pointer">
              <UserAvatar />
              <p
                className={cn(
                  "hidden md:block font-medium underline text-slate-900"
                )}
              >
                Ansori Dev
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/profile"}>
              <DropdownMenuItem>
                <User className="h-4 w-4" /> Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-4 w-4 text-destructive" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DasboardHeader;
