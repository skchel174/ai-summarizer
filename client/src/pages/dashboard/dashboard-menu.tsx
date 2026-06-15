import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { AppMenuItem } from "./dashboard-menu.config";

function MenuItem({
  label,
  href,
  icon,
  active,
  showLabel,
}: {
  label: string;
  href: string;
  icon: LucideIcon;
  active: boolean;
  showLabel: boolean;
}) {
  const Icon = icon;

  return (
    <Link
      to={href}
      title={!showLabel ? label : undefined}
      className={clsx(
        "flex items-center gap-4 rounded-md",
        "hover:bg-blue-200/25 hover:text-blue-700",
        "transition-colors duration-150",
        active ? "bg-blue-200/25 text-blue-700 " : "text-slate-700",
        showLabel ? "px-3 py-2" : "p-3",
      )}
    >
      <Icon size={22} strokeWidth={1.75} />
      {showLabel && <span className="text-sm font-medium leading-none">{label}</span>}
    </Link>
  );
}

function isMenuItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function DashboardMenu({ menu, showLabel }: { menu: AppMenuItem[]; showLabel: boolean }) {
  const location = useLocation();

  return (
    <nav className="py-2 px-3 flex flex-col gap-0.5" aria-label="App navigation">
      {menu.map((item) => (
        <MenuItem
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
