import type { SummarizationListItem } from "./summarization-list.types";
import { SummarizationTableRow } from "./summarization-table-row";

const TABLE_COLUMNS = [
  {
    key: "source",
    label: "Source",
    className: "w-[36%]",
  },
  {
    key: "status",
    label: "Status",
    className: "w-[14%]",
  },
  {
    key: "summary",
    label: "Summary",
    className: "w-[18%]",
  },
  {
    key: "tags",
    label: "Tags",
    className: "w-[16%]",
  },
  {
    key: "added",
    label: "Added",
    className: "w-[10%]",
  },
  {
    key: "actions",
    label: "",
    className: "w-[6%]",
  },
] as const;

type SummarizationTableProps = {
  items: SummarizationListItem[];
  onFavoriteToggle: (itemId: string) => void;
  onDelete: (itemId: string) => void;
};

export function SummarizationTable({
  items,
  onFavoriteToggle,
  onDelete,
}: SummarizationTableProps) {
  return (
    <div className="@container overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full table-fixed text-left">
        <thead>
          <tr className="border-b border-slate-200">
            {TABLE_COLUMNS.map((column) => (
              <th
                key={column.key}
                className={`px-2 py-2 text-sm font-bold tracking-wide text-slate-900 @min-[1100px]:px-3 ${column.className}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <SummarizationTableRow
              key={item.id}
              item={item}
              onDelete={onDelete}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
