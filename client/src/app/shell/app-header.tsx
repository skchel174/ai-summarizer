import clsx from "clsx";
import { MenuIcon } from "lucide-react";
import logo from "./logo.png";

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex h-14 items-center border-b border-slate-200 px-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Toggle app menu"
          onClick={onMenuClick}
          className={clsx(
            "hidden rounded-full p-2 text-gray-700 cursor-pointer md:inline-flex",
            "hover:bg-gray-100 active:bg-gray-200/70",
            "transition-colors",
          )}
        >
          <MenuIcon size={22} strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-2">
          <img src={logo} alt="AI Summarizer logo" className="size-7" />
          <span className="text-lg font-bold leading-none tracking-tight">AI&nbsp;Summarizer</span>
        </div>
      </div>
    </header>
  );
}
