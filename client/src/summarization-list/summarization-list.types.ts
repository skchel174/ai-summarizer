export type SummarizationStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export type SummarizationSource = {
  name: "youtube" | "pdf" | "web" | "text" | "transcription";
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
