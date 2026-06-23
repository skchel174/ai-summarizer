import { useMediaQuery } from "@/shared/lib/use-media-query";
import { useState } from "react";
import { AppDrawer } from "./app-drawer";
import { AppHeader } from "./app-header";
import { appMenu, mobileMenu } from "./app-menu";
import { AppSidebar } from "./app-sidebar";
import { AppNavMobile } from "./app-nav-mobile";
import { AppNav } from "./app-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
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
          <AppNav menu={appMenu} showLabel={isDesktop && isSidebarExpanded} />
        </AppSidebar>

        <main className="flex-1 p-4 pb-20 md:pb-0">{children}</main>
      </div>

      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <AppNav menu={appMenu} showLabel />
      </AppDrawer>

      <AppNavMobile menu={mobileMenu} />
    </div>
  );
}
