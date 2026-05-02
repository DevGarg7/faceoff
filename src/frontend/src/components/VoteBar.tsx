import { cn } from "@/lib/utils";
import type { VoteTally } from "@/types";
import { motion } from "motion/react";

interface VoteBarProps {
  tally: VoteTally;
  rank: number;
  isWinner: boolean;
  delay?: number;
}

export function VoteBar({ tally, rank, isWinner, delay = 0 }: VoteBarProps) {
  const pct = Math.round(tally.percentage * 100) / 100;
  const faceNum = Number(tally.faceNumber);

  return (
    <div className="space-y-1" data-ocid={`vote_bar.face_${faceNum}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center font-display font-bold text-xs",
              isWinner
                ? "bg-primary text-primary-foreground ring-2 ring-accent"
                : "bg-secondary text-secondary-foreground",
            )}
          >
            {faceNum}
          </span>
          <span className="text-xs font-body text-muted-foreground">
            Face {faceNum}
          </span>
          {isWinner && (
            <span className="text-[10px] font-display font-bold text-accent uppercase tracking-wider">
              👑 Winner
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-display font-bold text-accent">
            {pct.toFixed(1)}%
          </span>
          <span className="text-[10px] text-muted-foreground font-body">
            {Number(tally.count)} votes
          </span>
          {rank === 1 && !isWinner && (
            <span className="text-[10px] font-body text-muted-foreground">
              #{rank}
            </span>
          )}
        </div>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, delay, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            isWinner ? "bg-primary" : "bg-accent/60",
          )}
        />
      </div>
    </div>
  );
}

interface MiniVoteBarProps {
  tallies: VoteTally[];
}

export function MiniVoteBar({ tallies }: MiniVoteBarProps) {
  if (!tallies.length) return null;
  const sorted = [...tallies].sort((a, b) => Number(b.count) - Number(a.count));
  const total = sorted.reduce((s, t) => s + Number(t.count), 0);
  if (total === 0) return null;

  return (
    <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden w-full">
      {sorted.map((t) => {
        const pct = (Number(t.count) / total) * 100;
        return (
          <div
            key={`face-${Number(t.faceNumber)}`}
            className={cn(
              "h-full",
              Number(t.faceNumber) === Number(sorted[0].faceNumber)
                ? "bg-primary"
                : "bg-accent/50",
            )}
            style={{ width: `${pct}%` }}
          />
        );
      })}
    </div>
  );
}
