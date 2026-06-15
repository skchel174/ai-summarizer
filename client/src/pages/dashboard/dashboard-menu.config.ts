import { ClipboardList, FileText, House, Settings, Tags, type LucideIcon } from "lucide-react";

export type AppMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const appMenu: AppMenuItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: House,
  },
  {
    label: "Sources",
    href: "/sources",
    icon: ClipboardList,
  },
  {
    label: "Summaries",
    href: "/summaries",
    icon: FileText,
  },
  {
    label: "Tags",
    href: "/tags",
    icon: Tags,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
