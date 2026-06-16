import { useLocation } from "react-router-dom";
import { DashboardMenuItem } from "./dashboard-menu-item";
import type { AppMenuItem } from "./dashboard-menu.config";
import { isMenuItemActive } from "./dashboard-menu.utils";

export function DashboardMobileMenu({ menu }: { menu: AppMenuItem[] }) {
  const location = useLocation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center gap-1">
        {menu.map((item) => (
          <DashboardMenuItem
            variant="mobile"
            key={item.label}
            label={item.label}
            href={item.href}
            icon={item.icon}
            active={isMenuItemActive(location.pathname, item.href)}
          />
        ))}
      </div>
    </nav>
  );
}
