import type { LucideIcon } from "lucide-react";
import { ClipboardList, User } from "lucide-react";

export type AppMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const appMenu: AppMenuItem[] = [
  {
    label: "Sources",
    href: "/",
    icon: ClipboardList,
  },
];

export const mobileMenu: AppMenuItem[] = [
  ...appMenu,
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function isMenuItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}
