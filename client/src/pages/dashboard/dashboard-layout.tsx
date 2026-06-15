import { useMediaQuery } from "@/shared/lib/use-media-query";
import { useState } from "react";
import { AppDrawer } from "./dashboard-drawer";
import { AppHeader } from "./dashboard-header";
import { DashboardMenu } from "./dashboard-menu";
import { appMenu } from "./dashboard-menu.config";
import { AppSidebar } from "./dashboard-sidebar";

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

  const showSidebarLabels = isDesktop && isSidebarExpanded;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppHeader onMenuClick={toggleMenu} />

      <div className="flex flex-1">
        <AppSidebar isExpanded={isSidebarExpanded}>
          <DashboardMenu menu={appMenu} showLabel={showSidebarLabels} />
        </AppSidebar>
        
        <main className="flex-1 p-4">{children}</main>
      </div>

      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DashboardMenu menu={appMenu} showLabel />
      </AppDrawer>
    </div>
  );
}
