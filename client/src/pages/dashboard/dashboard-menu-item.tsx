import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type DashboardMenuItemVariant = "sidebar" | "mobile";

export function DashboardMenuItem({
  label,
  href,
  icon,
  active,
  variant,
  showLabel = true,
}: {
  label: string;
  href: string;
  icon: LucideIcon;
  active: boolean;
  variant: DashboardMenuItemVariant;
  showLabel?: boolean;
}) {
  const Icon = icon;

  if (variant === "mobile") {
    return (
      <Link
        to={href}
        aria-label={label}
        className={clsx(
          "flex h-14 flex-1 flex-col items-center justify-center gap-1",
          "transition-colors duration-150 active:opacity-70",
          active ? "text-blue-700" : "text-slate-700",
        )}
      >
        <Icon size={22} strokeWidth={1.75} />
        <span className="text-xs font-medium leading-none">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      to={href}
      title={!showLabel ? label : undefined}
      className={clsx(
        "flex items-center gap-4 rounded-md",
        "transition-colors duration-150",
        "hover:bg-blue-200/25 hover:text-blue-700",
        active ? "bg-blue-200/25 text-blue-700" : "text-slate-700",
        showLabel ? "px-3 py-2" : "p-3",
      )}
    >
      <Icon size={22} strokeWidth={1.75} />
      {showLabel && <span className="text-sm font-medium leading-none">{label}</span>}
    </Link>
  );
}
