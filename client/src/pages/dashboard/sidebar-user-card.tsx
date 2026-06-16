import clsx from "clsx";

export function SidebarUserCard({
  isExpanded,
  name,
  description,
  apiConfigured,
  onClick,
}: {
  isExpanded: boolean;
  name: string;
  description?: string;
  apiConfigured?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={!isExpanded ? `${name} · ${description}` : undefined}
      onClick={onClick}
      className={clsx(
        "w-full rounded border border-slate-200",
        "text-left text-slate-900 ",
        "transition-colors duration-150",
        "hover:bg-slate-50 active:bg-slate-100 cursor-pointer",
        isExpanded ? "flex items-center gap-3 p-3" : "flex h-12 items-center justify-center",
      )}
    >
      <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
        {name[0]?.toUpperCase()}
        <span
          className={clsx(
            "absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white",
            apiConfigured ? "bg-emerald-500" : "bg-slate-300",
          )}
          aria-hidden="true"
        />
      </div>

      {isExpanded && (
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium leading-5">{name}</div>
          <div className="truncate text-xs leading-4 text-slate-500">{description}</div>
        </div>
      )}
    </button>
  );
}
