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
        "hidden flex-col md:flex md:w-18",
        "min-h-[calc(100vh-56px)] shrink-0 overflow-hidden",
        "border-r border-slate-200 bg-blue-50/20",
        isExpanded ? "xl:w-64" : "xl:w-18",
      )}
    >
      {children}
    </aside>
  );
}
