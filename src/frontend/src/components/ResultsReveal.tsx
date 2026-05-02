import { cn } from "@/lib/utils";
import type { VoteTally } from "@/types";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";

const FACE_COLORS = [
  {
    ring: "border-primary",
    fill: "bg-primary/25",
    badge: "bg-primary text-primary-foreground",
    label: "text-primary",
    pct: "text-primary",
  },
  {
    ring: "border-accent",
    fill: "bg-accent/25",
    badge: "bg-accent text-accent-foreground",
    label: "text-accent",
    pct: "text-accent",
  },
  {
    ring: "border-[oklch(0.72_0.2_85)]",
    fill: "bg-[oklch(0.72_0.2_85/0.2)]",
    badge: "bg-[oklch(0.72_0.2_85)] text-[oklch(0.1_0.01_85)]",
    label: "text-[oklch(0.82_0.22_85)]",
    pct: "text-[oklch(0.82_0.22_85)]",
  },
  {
    ring: "border-[oklch(0.65_0.2_165)]",
    fill: "bg-[oklch(0.65_0.2_165/0.2)]",
    badge: "bg-[oklch(0.65_0.2_165)] text-[oklch(0.95_0.01_165)]",
    label: "text-[oklch(0.75_0.22_165)]",
    pct: "text-[oklch(0.75_0.22_165)]",
  },
];

interface ResultsRevealProps {
  tallies: Array<VoteTally>;
  votedFace: number | null;
  totalVotes: bigint;
}

export function ResultsReveal({
  tallies,
  votedFace,
  totalVotes,
}: ResultsRevealProps) {
  const sorted = [...tallies].sort((a, b) => Number(b.count) - Number(a.count));
  const winner = sorted[0];
  const total = Number(totalVotes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="w-full space-y-2"
      data-ocid="feed.results_panel"
    >
      {sorted.map((tally, idx) => {
        const faceNum = Number(tally.faceNumber);
        const pct = total === 0 ? 0 : (Number(tally.count) / total) * 100;
        const isVoted = votedFace === faceNum;
        const isWinner = winner && Number(winner.faceNumber) === faceNum;
        const colorIdx = (faceNum - 1) % FACE_COLORS.length;
        const color = FACE_COLORS[colorIdx];

        return (
          <motion.div
            key={`result-face-${faceNum}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.28 }}
            className={cn(
              "relative rounded-xl overflow-hidden border",
              isVoted
                ? cn(
                    color?.ring ?? "border-primary",
                    "border-2 shadow-[0_0_10px_oklch(0.7_0.26_200/0.4)]",
                  )
                : "border-border/50",
            )}
            data-ocid={`feed.result_bar.${faceNum}`}
          >
            {/* Animated fill bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{
                delay: idx * 0.07 + 0.08,
                duration: 0.55,
                ease: "easeOut",
              }}
              className={cn(
                "absolute inset-0",
                isVoted
                  ? (color?.fill ?? "bg-primary/20")
                  : isWinner
                    ? "bg-primary/15"
                    : "bg-muted/40",
              )}
            />

            {/* Content row */}
            <div className="relative z-10 flex items-center gap-2 px-3 py-2">
              <div
                className={cn(
                  "w-7 h-7 rounded-full font-display font-black text-xs flex items-center justify-center flex-shrink-0",
                  isVoted
                    ? (color?.badge ?? "bg-primary text-primary-foreground")
                    : isWinner
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {faceNum}
              </div>

              <div className="flex-1 min-w-0">
                <span
                  className={cn(
                    "font-body font-semibold text-xs",
                    isVoted
                      ? (color?.label ?? "text-primary")
                      : isWinner
                        ? "text-primary"
                        : "text-muted-foreground",
                  )}
                >
                  Face {faceNum}
                  {isVoted && " · Your pick"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {isWinner && idx === 0 && (
                  <Trophy size={12} className="text-primary" />
                )}
                <span
                  className={cn(
                    "font-display font-black text-sm",
                    isVoted
                      ? (color?.pct ?? "text-primary")
                      : isWinner
                        ? "text-primary"
                        : "text-foreground",
                  )}
                >
                  {Math.round(pct)}%
                </span>
                <span className="text-muted-foreground text-[10px]">
                  {Number(tally.count).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}

      <p className="text-center text-[10px] text-muted-foreground">
        {total.toLocaleString()} vote{total !== 1 ? "s" : ""}
      </p>
    </motion.div>
  );
}
