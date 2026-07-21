import type { LucideIcon } from "lucide-react";
import { AudioLines, FileText, Link2, Video } from "lucide-react";
import type {
  SummarizationSource,
  SummarizationStatus,
} from "./summarization-list.types";

export type SummarizationSourcePresentation = {
  label: string;
  icon: LucideIcon;
  className: string;
};

export type SummarizationStatusPresentation = {
  label: string;
  className: string;
};

export const SUMMARIZATION_SOURCE_CONFIG = {
  youtube: {
    label: "YouTube",
    icon: Video,
    className: "bg-red-50 text-red-500",
  },
  pdf: {
    label: "PDF",
    icon: FileText,
    className: "bg-red-50 text-red-500",
  },
  web: {
    label: "Web",
    icon: Link2,
    className: "bg-emerald-50 text-emerald-600",
  },
  text: {
    label: "Text",
    icon: FileText,
    className: "bg-orange-50 text-orange-500",
  },
  transcription: {
    label: "Transcription",
    icon: AudioLines,
    className: "bg-blue-50 text-blue-500",
  },
} satisfies Record<
  SummarizationSource["name"],
  SummarizationSourcePresentation
>;

export const SUMMARIZATION_STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "bg-slate-100 text-slate-600",
  },
  processing: {
    label: "Processing",
    className: "bg-blue-50 text-blue-700",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700",
  },
  failed: {
    label: "Failed",
    className: "bg-red-50 text-red-600",
  },
} satisfies Record<
  SummarizationStatus,
  SummarizationStatusPresentation
>;
