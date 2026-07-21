import type {
  SummarizationListItem,
  SummarizationTag,
} from "./summarization-list.types";

const tags = {
  programming: { id: "tag-programming", name: "programming" },
  career: { id: "tag-career", name: "career" },
  productivity: { id: "tag-productivity", name: "productivity" },
  ai: { id: "tag-ai", name: "ai" },
  architecture: { id: "tag-architecture", name: "architecture" },
  softwareDesign: { id: "tag-software-design", name: "software-design" },
  cleanCode: { id: "tag-clean-code", name: "clean-code" },
  databases: { id: "tag-databases", name: "databases" },
  sqlite: { id: "tag-sqlite", name: "sqlite" },
  meetings: { id: "tag-meetings", name: "meetings" },
  leadership: { id: "tag-leadership", name: "leadership" },
  research: { id: "tag-research", name: "research" },
  writing: { id: "tag-writing", name: "writing" },
  testing: { id: "tag-testing", name: "testing" },
  devops: { id: "tag-devops", name: "devops" },
} satisfies Record<string, SummarizationTag>;

export const SUMMARIZATION_LIST_MOCK: SummarizationListItem[] = [
  {
    id: "sum-001",
    title: "The Pragmatic Programmer in 2024",
    source: {
      name: "youtube",
      description: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    },
    status: "completed",
    tags: [tags.programming, tags.career, tags.productivity, tags.ai],
    summary: {
      title: "Short Summary",
      description: "1,124 words",
    },
    addedAt: "2026-07-15T12:30:00Z",
    isFavorite: false,
  },
  {
    id: "sum-002",
    title: "Clean Architecture — Chapter 1",
    source: {
      name: "pdf",
      description: "12.4 MB",
    },
    status: "completed",
    tags: [tags.architecture, tags.softwareDesign, tags.cleanCode],
    summary: {
      title: "Detailed Summary",
      description: "2,840 words",
    },
    addedAt: "2026-07-14T10:00:00Z",
    isFavorite: true,
  },
  {
    id: "sum-003",
    title: "Why SQLite is enough for most apps",
    source: {
      name: "web",
      description: "https://blog.example.com/sqlite-for-most-apps",
    },
    status: "processing",
    tags: [tags.databases, tags.sqlite, tags.architecture],
    summary: null,
    addedAt: "2026-07-12T09:15:00Z",
    isFavorite: false,
  },
  {
    id: "sum-004",
    title: "Product sync — March 12",
    source: {
      name: "transcription",
      description: "45:12",
    },
    status: "failed",
    tags: [tags.meetings, tags.leadership],
    summary: null,
    addedAt: "2026-07-10T16:45:00Z",
    isFavorite: false,
  },
  {
    id: "sum-005",
    title: "Weekly research notes",
    source: {
      name: "text",
      description: "18.2 KB",
    },
    status: "pending",
    tags: [tags.research, tags.writing],
    summary: null,
    addedAt: "2026-07-08T08:00:00Z",
    isFavorite: false,
  },
  {
    id: "sum-006",
    title: "Building reliable AI workflows",
    source: {
      name: "youtube",
      description: "https://youtube.com/watch?v=ai-workflows-demo",
    },
    status: "completed",
    tags: [tags.ai, tags.productivity, tags.programming],
    summary: {
      title: "Key Ideas",
      description: "892 words",
    },
    addedAt: "2026-07-15T10:30:00Z",
    isFavorite: true,
  },
  {
    id: "sum-007",
    title: "Testing strategies for React apps",
    source: {
      name: "web",
      description: "https://dev.example.com/react-testing-guide",
    },
    status: "completed",
    tags: [tags.testing, tags.programming, tags.cleanCode],
    summary: {
      title: "Study Notes",
      description: "1,560 words",
    },
    addedAt: "2026-07-13T11:20:00Z",
    isFavorite: false,
  },
  {
    id: "sum-008",
    title: "Engineering leadership handbook",
    source: {
      name: "pdf",
      description: "8.7 MB",
    },
    status: "processing",
    tags: [tags.leadership, tags.career, tags.devops],
    summary: null,
    addedAt: "2026-07-15T08:30:00Z",
    isFavorite: false,
  },
  {
    id: "sum-009",
    title: "Sprint planning checklist",
    source: {
      name: "text",
      description: "6.1 KB",
    },
    status: "completed",
    tags: [tags.productivity, tags.writing, tags.meetings],
    summary: {
      title: "Action Items",
      description: "214 words",
    },
    addedAt: "2026-07-09T14:00:00Z",
    isFavorite: false,
  },
  {
    id: "sum-010",
    title: "Design review — onboarding flow",
    source: {
      name: "transcription",
      description: "32:08",
    },
    status: "completed",
    tags: [tags.meetings, tags.architecture, tags.softwareDesign],
    summary: {
      title: "Detailed Summary",
      description: "3,102 words",
    },
    addedAt: "2026-07-14T18:00:00Z",
    isFavorite: true,
  },
];
