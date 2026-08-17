import type { OrderType } from "@/shared/api/api.types";

export const SummarizationStatuses = {
  Pending: "pending",
  Processing: "processing",
  Completed: "completed",
  Failed: "failed",
} as const;

export type SummarizationStatus =
  (typeof SummarizationStatuses)[keyof typeof SummarizationStatuses];

export const SummarizationSourceTypes = {
  Youtube: "youtube",
  Pdf: "pdf",
  Web: "web",
  Text: "text",
  Transcription: "transcription",
} as const;

export type SummarizationSourceType =
  (typeof SummarizationSourceTypes)[keyof typeof SummarizationSourceTypes];

export const SummarizationScopes = {
  Recent: "recent",
  Starred: "starred",
} as const;

export type SummarizationScope =
  (typeof SummarizationScopes)[keyof typeof SummarizationScopes];

export type SummarizationSource = {
  name: SummarizationSourceType;
  description: string | null;
};

export type SummarizationSummary = {
  title: string;
  description: string;
};

export type SummarizationTag = {
  id: string;
  name: string;
};

export type SummarizationListItem = {
  id: string;
  title: string;
  source: SummarizationSource;
  status: SummarizationStatus;
  tags: SummarizationTag[];
  summary: SummarizationSummary | null;
  addedAt: string;
  isFavorite: boolean;
};

export type SummarizationListParams = {
  page?: number;
  perPage?: number;
  order?: OrderType;
  search?: string;
  scope?: SummarizationScope;
  sourceType?: SummarizationSourceType;
  status?: SummarizationStatus;
  tagIds?: number[];
};
