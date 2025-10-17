"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  PlusCircle,
  Badge,
  ShieldCheck,
  Settings,
  PocketKnife,
} from "lucide-react";
import { useUI } from "@/contexts/ui-context";
import { useWallet } from "@/contexts/wallet-context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/my-badges", label: "My Badges", icon: Badge },
  { href: "/verify", label: "Verify Badge", icon: ShieldCheck },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { openMintModal } = useUI();
  const { isConnected, address } = useWallet();

  const shortenAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }

  return (
    <Sidebar className="border-r hidden md:flex" collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2" aria-label="Douguken Home">
          <PocketKnife className="w-7 h-7 text-primary" />
          <h1 className="font-bold text-lg text-foreground group-data-[collapsible=icon]:hidden">
            Douguken
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="relative justify-start"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {pathname === item.href && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full"></div>
                  )}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={openMintModal} tooltip="Mint Badge" className="justify-start">
              <PlusCircle className="w-5 h-5" />
              <span>Mint Badge</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/settings" legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === "/settings"}
                tooltip="Settings"
                className="relative justify-start"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
                {pathname === '/settings' && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full"></div>
                )}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        {isConnected && address && (
          <div className="flex items-center gap-3 mt-4 p-2 rounded-lg bg-muted group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{address.substring(2, 4).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium text-foreground">{shortenAddress(address)}</p>
              <p className="text-xs text-muted-foreground">Developer</p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
