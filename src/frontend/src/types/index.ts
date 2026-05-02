// Re-export backend types for use throughout the app
export type {
  PollSummary,
  PollPublic,
  VoteTally,
  FaceMarker,
  ProfilePublic,
} from "@/backend";
export { PollCategory } from "@/backend";

export interface CategoryLabel {
  value: string;
  label: string;
  emoji: string;
}

export const CATEGORY_LABELS: CategoryLabel[] = [
  { value: "mostHandsome", label: "Most Handsome", emoji: "👑" },
  { value: "bestStyle", label: "Best Style", emoji: "✨" },
  { value: "mostPhotogenic", label: "Most Photogenic", emoji: "📸" },
  { value: "mostAttractive", label: "Most Attractive", emoji: "🔥" },
  { value: "bestSmile", label: "Best Smile", emoji: "😁" },
  { value: "mostConfident", label: "Most Confident", emoji: "💪" },
  { value: "mostCharming", label: "Most Charming", emoji: "💫" },
];

export const DURATION_OPTIONS = [
  { value: 1, label: "1 Hour" },
  { value: 24, label: "24 Hours" },
  { value: 72, label: "3 Days" },
  { value: 168, label: "7 Days" },
];
