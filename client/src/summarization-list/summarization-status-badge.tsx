import { Badge } from "@/shared/ui/badge";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { SUMMARIZATION_STATUS_CONFIG } from "./summarization-list.config";
import type { SummarizationStatus } from "./summarization-list.types";

type SummarizationStatusBadgeProps = {
  status: SummarizationStatus;
};

export function SummarizationStatusBadge({
  status,
}: SummarizationStatusBadgeProps) {
  const statusConfig = SUMMARIZATION_STATUS_CONFIG[status];

  return (
    <Badge className={clsx("border-current/20", statusConfig.className)}>
      {status === "processing" ? (
        <Loader2 className="size-3 animate-spin" />
      ) : (
        <span className="size-1.5 rounded-full bg-current" />
      )}
      {statusConfig.label}
    </Badge>
  );
}
