import { useMediaQuery } from "@/shared/lib/use-media-query";
import { ClipboardList, User } from "lucide-react";
import { useState } from "react";
import { AppDrawer } from "./dashboard-drawer";
import { AppHeader } from "./dashboard-header";
import { DashboardMenu } from "./dashboard-menu";
import type { AppMenuItem } from "./dashboard-menu.types";
import { DashboardMobileMenu } from "./dashboard-mobile-menu";
import { AppSidebar } from "./dashboard-sidebar";

const appMenu: AppMenuItem[] = [
  {
    label: "Sources",
    href: "/",
    icon: ClipboardList,
  },
];

const mobileMenu: AppMenuItem[] = [
  {
    label: "Sources",
    href: "/",
    icon: ClipboardList,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleMenu = () => {
    if (isDesktop) {
      setIsSidebarExpanded((value) => !value);
      return;
    }

    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppHeader onMenuClick={toggleMenu} />

      <div className="flex flex-1">
        <AppSidebar isExpanded={isDesktop && isSidebarExpanded}>
          <DashboardMenu menu={appMenu} showLabel={isDesktop && isSidebarExpanded} />
        </AppSidebar>

        <main className="flex-1 p-4 pb-20 md:pb-0">{children}</main>
      </div>

      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DashboardMenu menu={appMenu} showLabel />
      </AppDrawer>

      <DashboardMobileMenu menu={mobileMenu} />
    </div>
  );
}
