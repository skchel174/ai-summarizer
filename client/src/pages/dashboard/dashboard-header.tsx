import clsx from "clsx";
import { MenuIcon } from "lucide-react";
import logo from "./logo.png";

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-14 px-4 flex items-center border-b border-slate-200">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Toggle app menu"
          onClick={onMenuClick}
          className={clsx(
            "rounded-full p-2 text-gray-700 cursor-pointer",
            "hover:bg-gray-100 active:bg-gray-200/70",
            "transition-colors",
          )}
        >
          <MenuIcon size={22} strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-2">
          <img src={logo} alt="AI Summarizer logo" className="size-7" />
          <span className="text-lg font-bold tracking-tight leading-none">AI&nbsp;Summarizer</span>
        </div>
      </div>
    </header>
  );
}
