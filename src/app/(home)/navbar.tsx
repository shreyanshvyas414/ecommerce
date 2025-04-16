"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { NavSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const navItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

const NavItems = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!false);
  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          Navbar
        </span>
      </Link>
      <NavSidebar
        items={navItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {navItems.map((item) => (
          <NavItems
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavItems>
        ))}
      </div>
      <div className="hidden lg:flex">
        <Button
          asChild
          variant={"secondary"}
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
        >
          <Link href={"/sign-in"}>Log in</Link>
        </Button>
        <Button
          asChild
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
        >
          <Link href={"/sign-up"}>Start selling</Link>
        </Button>
      </div>
      <div className="flex lg:hidden items-center justify-center">
        <Button
          className="size-12 border-transparent bg-white"
          variant={"ghost"}
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon className="size-8" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
