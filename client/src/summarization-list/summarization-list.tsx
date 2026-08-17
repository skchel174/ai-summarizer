import { useMediaQuery } from "@/shared/lib/use-media-query";
import { SummarizationCards } from "./summarization-cards";
import { SUMMARIZATION_LIST_MOCK } from "./summarization-list.mock";
import { SummarizationTable } from "./summarization-table";
import { useSummarizationParams } from "./use-summarization-params";

export function SummarizationList() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleFavoriteToggle = (itemId: string) => {
    console.log("handleFavoriteToggle", itemId);
  };

  const handleDelete = (itemId: string) => {
    console.log("handleDelete", itemId);
  };

  const { params } = useSummarizationParams();
  console.log("FETCH", params);

  return (
    <div className="mx-auto w-full max-w-350">
      {isDesktop ? (
        <SummarizationTable
          items={SUMMARIZATION_LIST_MOCK}
          onFavoriteToggle={handleFavoriteToggle}
          onDelete={handleDelete}
        />
      ) : (
        <SummarizationCards
          items={SUMMARIZATION_LIST_MOCK}
          onFavoriteToggle={handleFavoriteToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
