import { formatRelativeTime } from "@/shared/lib/format-relative-time";
import { Badge } from "@/shared/ui/badge";
import clsx from "clsx";
import { Star, Trash2 } from "lucide-react";
import { SUMMARIZATION_SOURCE_CONFIG } from "./summarization-list.config";
import type { SummarizationListItem } from "./summarization-list.types";
import { SummarizationSourceIcon } from "./summarization-source-icon";
import { SummarizationStatusBadge } from "./summarization-status-badge";

type SummarizationTableRowProps = {
  item: SummarizationListItem;
  onDelete: (itemId: string) => void;
  onFavoriteToggle: (itemId: string) => void;
};

export function SummarizationTableRow({
  item,
  onDelete,
  onFavoriteToggle,
}: SummarizationTableRowProps) {
  const sourceConfig = SUMMARIZATION_SOURCE_CONFIG[item.source.name];
  const sourceDescription = item.source.description;

  const [firstTag, ...hiddenTags] = item.tags;

  return (
    <tr className="group border-b border-slate-200/80 last:border-b-0 hover:bg-slate-50/60">
      {/* Source */}
      <td className="px-2 py-2 @min-[1100px]:px-3 @min-[1100px]:py-2.5">
        <div className="flex min-w-0 items-center gap-2 @min-[1100px]:gap-2.5">
          <SummarizationSourceIcon source={item.source.name} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {item.title}
            </p>
            <p className="truncate text-[11px] text-slate-400 @min-[1100px]:text-xs">
              <span className="font-medium text-slate-500">
                {sourceConfig.label}
              </span>
              {sourceDescription ? ` · ${sourceDescription}` : null}
            </p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-2 py-2 @min-[1100px]:px-3 @min-[1100px]:py-2.5">
        <SummarizationStatusBadge status={item.status} />
      </td>

      {/* Summary */}
      <td className="px-2 py-2 @min-[1100px]:px-3 @min-[1100px]:py-2.5">
        {item.summary ? (
          <div>
            <p className="truncate text-sm font-semibold text-slate-900">
              {item.summary.title}
            </p>
            <p className="truncate text-[11px] text-slate-500 @min-[1100px]:text-xs">
              {item.summary.description}
            </p>
          </div>
        ) : (
          <span className="text-lg text-slate-400">-</span>
        )}
      </td>

      {/* Tags */}
      <td className="px-2 py-2 @min-[1100px]:px-3 @min-[1100px]:py-2.5">
        <div className="flex min-w-0 items-center gap-1.5">
          {firstTag ? (
            <Badge title={firstTag.name}>{firstTag.name}</Badge>
          ) : null}
          {hiddenTags.length > 0 ? (
            <Badge
              title={hiddenTags.map((tag) => tag.name).join(", ")}
              className="text-slate-500"
            >
              +{hiddenTags.length}
            </Badge>
          ) : null}
        </div>
      </td>

      {/* Added — narrower in compact */}
      <td className="px-1.5 py-2 @min-[1100px]:px-3 @min-[1100px]:py-2.5">
        <span className="block truncate text-[11px] whitespace-nowrap text-slate-500 @min-[1100px]:text-xs">
          {formatRelativeTime(item.addedAt)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-1.5 py-2 @min-[1100px]:px-3 @min-[1100px]:py-2.5">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            aria-label={
              item.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className={clsx(
              "cursor-pointer rounded-md p-1 transition-colors",
              "text-slate-400 hover:bg-slate-100 hover:text-slate-600",
            )}
            onClick={() => onFavoriteToggle(item.id)}
          >
            <Star
              className={clsx(
                "size-4",
                item.isFavorite && "fill-amber-400 text-amber-400",
              )}
              strokeWidth={1.75}
            />
          </button>
          <button
            type="button"
            aria-label="Delete"
            className="cursor-pointer rounded-md p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </td>
    </tr>
  );
}
