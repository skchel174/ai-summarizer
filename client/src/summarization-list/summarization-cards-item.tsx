import { formatRelativeTime } from "@/shared/lib/format-relative-time";
import { Badge } from "@/shared/ui/badge";
import clsx from "clsx";
import { Star, Trash2 } from "lucide-react";
import { SUMMARIZATION_SOURCE_CONFIG } from "./summarization-list.config";
import type { SummarizationListItem } from "./summarization-list.types";
import { SummarizationSourceIcon } from "./summarization-source-icon";
import { SummarizationStatusBadge } from "./summarization-status-badge";

type SummarizationCardsItemProps = {
  item: SummarizationListItem;
  onFavoriteToggle: (itemId: string) => void;
  onDelete: (itemId: string) => void;
};

export function SummarizationCardsItem({
  item,
  onFavoriteToggle,
  onDelete,
}: SummarizationCardsItemProps) {
  const sourceConfig = SUMMARIZATION_SOURCE_CONFIG[item.source.name];

  return (
    <article className="rounded-xl border border-slate-200 bg-white">
      <div className="flex gap-2.5 px-3.5 pt-3.5 sm:gap-3">
        <SummarizationSourceIcon source={item.source.name} />

        <div className="min-w-0 flex-1">
          <h3 className="text-sm leading-snug font-semibold text-slate-900 line-clamp-2">
            {item.title}
          </h3>

          <p className="mt-0.5 truncate text-[11px] text-slate-400">
            <span className="font-medium text-slate-500">
              {sourceConfig.label}
            </span>
            {" · "}
            {formatRelativeTime(item.addedAt)}
          </p>

          <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <SummarizationStatusBadge status={item.status} />
            {item.summary ? (
              <span className="truncate text-[11px] text-slate-500">
                {item.summary.title} · {item.summary.description}
              </span>
            ) : null}
          </div>

          {item.tags.length > 0 ? (
            <div className="mt-2.5 flex min-w-0 flex-wrap items-center gap-1.5">
              {item.tags.map((tag) => (
                <Badge key={tag.id} title={tag.name}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <footer className="mt-2 flex items-center gap-1 border-t border-slate-200 px-3.5 pt-1.5 pb-2">
        <button
          type="button"
          className={clsx(
            "flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2",
            "text-xs font-medium transition-colors",
            item.isFavorite
              ? "text-amber-500 hover:bg-amber-50"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
          )}
          onClick={() => onFavoriteToggle(item.id)}
        >
          <Star
            className={clsx("size-4", item.isFavorite && "fill-current")}
            strokeWidth={1.75}
          />
          Favorite
        </button>

        <button
          type="button"
          className={clsx(
            "flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2",
            "text-xs font-medium text-slate-500 transition-colors",
            "hover:bg-red-50 hover:text-red-600",
          )}
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="size-4" strokeWidth={1.75} />
          Delete
        </button>
      </footer>
    </article>
  );
}
