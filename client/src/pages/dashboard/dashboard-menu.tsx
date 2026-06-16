import { useLocation } from "react-router-dom";
import { DashboardMenuItem } from "./dashboard-menu-item";
import type { AppMenuItem } from "./dashboard-menu.config";
import { isMenuItemActive } from "./dashboard-menu.utils";

export function DashboardMenu({ menu, showLabel }: { menu: AppMenuItem[]; showLabel: boolean }) {
  const location = useLocation();

  return (
    <nav className="py-2 px-3 flex flex-col gap-0.5" aria-label="App navigation">
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
  );
}
