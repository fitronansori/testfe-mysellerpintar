"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/common/blog-logo";
import UserAvatar from "@/components/common/user-avatar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
import { Button } from "@/components/ui/button";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const user = false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "h-16 md:h-24 fixed top-0 left-0 w-full transition-colors duration-300 z-50",
        isHome && !isScrolled ? "bg-transparent" : "bg-white border-b",
        className
      )}
    >
      <div className="container size-full flex items-center justify-between">
        <div>
          {isHome && !isScrolled ? <Logo typeLogo="white" /> : <Logo />}
        </div>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus:ring-[2px] focus:ring-offset-2 focus:ring-primary rounded-full">
              <div className="flex items-center gap-2 cursor-pointer">
                <UserAvatar />
                <p
                  className={cn(
                    "hidden md:block font-medium underline",
                    isHome && !isScrolled ? "text-white" : "text-slate-900"
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
        ) : (
          <Button variant={"destructive"} asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
