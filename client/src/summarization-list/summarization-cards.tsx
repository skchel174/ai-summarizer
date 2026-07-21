import { SummarizationCardsItem } from "./summarization-cards-item";
import type { SummarizationListItem } from "./summarization-list.types";

type SummarizationCardsProps = {
  items: SummarizationListItem[];
  onFavoriteToggle: (itemId: string) => void;
  onDelete: (itemId: string) => void;
};

export function SummarizationCards({
  items,
  onFavoriteToggle,
  onDelete,
}: SummarizationCardsProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <SummarizationCardsItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
}
