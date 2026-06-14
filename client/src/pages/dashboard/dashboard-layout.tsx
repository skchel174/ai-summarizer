import { useState } from "react";
import { AppDrawer } from "./dashboard-drawer";
import { AppHeader } from "./dashboard-header";
import { DashboardMenu } from "./dashboard-menu";
import { AppSidebar } from "./dashboard-sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleMenu = () => {
    const isDesktop = window.matchMedia("(min-width: 1280px)").matches;

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
        <AppSidebar isExpanded={isSidebarExpanded}>
          <DashboardMenu />
        </AppSidebar>

        <main className="flex-1 p-4">{children}</main>
      </div>

      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DashboardMenu />
      </AppDrawer>
    </div>
  );
}
