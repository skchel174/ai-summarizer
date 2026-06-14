import clsx from "clsx";

export function AppDrawer({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-40",
        "xl:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label="Close app menu"
        onClick={onClose}
        className={clsx(
          "absolute inset-0 bg-slate-900/30 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        className={clsx(
          "absolute left-0 top-0 h-full w-64",
          "border-r border-slate-200 bg-white shadow-xl",
          "transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {children}
      </aside>
    </div>
  );
}
