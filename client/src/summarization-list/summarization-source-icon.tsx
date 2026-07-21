import clsx from "clsx";
import { SUMMARIZATION_SOURCE_CONFIG } from "./summarization-list.config";
import type { SummarizationSource } from "./summarization-list.types";

type SummarizationSourceIconProps = {
  source: SummarizationSource["name"];
};

export function SummarizationSourceIcon({
  source,
}: SummarizationSourceIconProps) {
  const sourceConfig = SUMMARIZATION_SOURCE_CONFIG[source];
  const Icon = sourceConfig.icon;

  return (
    <div
      className={clsx(
        "flex size-8 shrink-0 items-center justify-center rounded-md",
        sourceConfig.className,
      )}
    >
      <Icon className="size-3.5" strokeWidth={2} />
    </div>
  );
}
