import clsx from "clsx";

export function AppSidebar({
  isExpanded,
  children,
}: {
  isExpanded: boolean;
  children: React.ReactNode;
}) {
  return (
    <aside
      className={clsx(
        "hidden lg:block",
        "min-h-[calc(100vh-56px)] shrink-0 overflow-hidden",
        "border-r border-slate-200 bg-blue-50/20",
        "transition-[width] duration-200 ease-in-out",
        "lg:w-16",
        isExpanded ? "xl:w-64" : "xl:w-16",
      )}
    >
      {children}
    </aside>
  );
}
