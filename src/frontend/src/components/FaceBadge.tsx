import { cn } from "@/lib/utils";
import type { FaceMarker } from "@/types";

interface FaceBadgeProps {
  marker: FaceMarker;
  isWinner?: boolean;
  isVoted?: boolean;
  showRing?: boolean;
  size?: "sm" | "md" | "lg";
}

// Color pairs per face — magenta / cyan / amber / green
const FACE_COLORS = [
  {
    text: "text-primary",
    shadow: "drop-shadow-[0_0_12px_oklch(0.68_0.28_310/0.95)]",
  },
  {
    text: "text-accent",
    shadow: "drop-shadow-[0_0_12px_oklch(0.7_0.26_200/0.95)]",
  },
  {
    text: "text-[oklch(0.82_0.22_85)]",
    shadow: "drop-shadow-[0_0_12px_oklch(0.82_0.22_85/0.95)]",
  },
  {
    text: "text-[oklch(0.75_0.22_165)]",
    shadow: "drop-shadow-[0_0_12px_oklch(0.75_0.22_165/0.95)]",
  },
];

export function FaceBadge({
  marker,
  isWinner = false,
  isVoted = false,
  showRing = false,
  size = "md",
}: FaceBadgeProps) {
  const num = Number(marker.faceNumber);
  const colorIdx = (num - 1) % FACE_COLORS.length;
  const color = FACE_COLORS[colorIdx];

  const sizeCls = {
    sm: "text-4xl leading-none",
    md: "text-5xl leading-none",
    lg: "text-7xl leading-none",
  }[size];

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      style={{ left: `${marker.xPercent}%`, top: `${marker.yPercent}%` }}
    >
      {/* Voted / winner ring */}
      {(isVoted || (isWinner && showRing)) && (
        <div
          className={cn(
            "absolute -inset-2 rounded-full border-2 animate-pulse",
            isVoted ? "border-accent" : "border-primary",
          )}
        />
      )}
      <span
        className={cn(
          "font-display font-black",
          sizeCls,
          isVoted
            ? "text-accent drop-shadow-[0_0_14px_oklch(0.7_0.26_200/1)]"
            : isWinner && showRing
              ? "text-primary drop-shadow-[0_0_14px_oklch(0.68_0.28_310/1)]"
              : cn(color?.text ?? "text-primary", color?.shadow ?? ""),
          "[text-shadow:0_2px_8px_rgba(0,0,0,0.95)]",
        )}
        style={{ WebkitTextStroke: "2px rgba(0,0,0,0.7)" }}
      >
        {num}
      </span>
    </div>
  );
}

interface StaticFaceBadgeProps {
  faceNumber: number;
  isVoted?: boolean;
  className?: string;
}

export function StaticFaceBadge({
  faceNumber,
  isVoted = false,
  className,
}: StaticFaceBadgeProps) {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full font-display font-black text-base flex items-center justify-center border-2 shadow-lg",
        isVoted
          ? "bg-accent text-accent-foreground border-accent shadow-[0_0_10px_oklch(0.7_0.26_200/0.6)]"
          : "bg-primary text-primary-foreground border-primary shadow-[0_0_8px_oklch(0.68_0.28_310/0.5)]",
        className,
      )}
    >
      {faceNumber}
    </div>
  );
}
