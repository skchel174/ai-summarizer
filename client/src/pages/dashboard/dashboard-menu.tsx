import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { DashboardMenuItem } from "./dashboard-menu-item";
import type { AppMenuItem } from "./dashboard-menu.types";
import { isMenuItemActive } from "./dashboard-menu.utils";
import { SidebarUserCard } from "./sidebar-user-card";

export function DashboardMenu({ menu, showLabel }: { menu: AppMenuItem[]; showLabel: boolean }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      <nav className="py-2 px-3 flex flex-col gap-0.5 flex-1" aria-label="App navigation">
        {menu.map((item) => (
          <DashboardMenuItem
            variant="sidebar"
            key={item.label}
            label={item.label}
            href={item.href}
            icon={item.icon}
            active={isMenuItemActive(location.pathname, item.href)}
            showLabel={showLabel}
          />
        ))}
      </nav>

      <div className={clsx(showLabel ? "p-3" : "p-2")}>
        <SidebarUserCard
          isExpanded={showLabel}
          name="User"
          description="API key not configured"
          apiConfigured={false}
        />
      </div>
    </div>
  );
}
