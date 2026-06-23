import { useLocation } from "react-router-dom";
import { isMenuItemActive, type AppMenuItem } from "./app-menu";
import { AppNavItem } from "./app-nav-item";

export function AppNavMobile({ menu }: { menu: AppMenuItem[] }) {
  const location = useLocation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center gap-1">
        {menu.map((item) => (
          <AppNavItem
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
