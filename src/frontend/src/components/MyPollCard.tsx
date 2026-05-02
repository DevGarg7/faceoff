import { MiniVoteBar } from "@/components/VoteBar";
import { Badge } from "@/components/ui/badge";
import { usePollResults } from "@/hooks/use-polls";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types";
import type { PollSummary } from "@/types";
import { Clock, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";

function timeLeft(expiresAt: bigint): string {
  const ms = Number(expiresAt) / 1_000_000_000 - Date.now() / 1000;
  if (ms <= 0) return "Ended";
  const h = Math.floor(ms / 3_600);
  if (h > 24) return `${Math.floor(h / 24)}d left`;
  if (h > 0) return `${h}h left`;
  const m = Math.floor((ms % 3_600) / 60);
  return `${m}m left`;
}

interface MyPollCardProps {
  poll: PollSummary;
  index: number;
  onClick: () => void;
}

export function MyPollCard({ poll, index, onClick }: MyPollCardProps) {
  const category = CATEGORY_LABELS.find(
    (c) => c.value === (poll.category as string),
  );
  const ended = Number(poll.expiresAt) / 1_000_000_000 < Date.now() / 1000;
  const { data: tallies } = usePollResults(poll.id);

  const sortedTallies = tallies
    ? [...tallies].sort((a, b) => Number(b.count) - Number(a.count))
    : [];
  const winnerFace =
    ended && sortedTallies.length > 0
      ? Number(sortedTallies[0].faceNumber)
      : null;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="poll-card w-full text-left flex gap-3 p-3 cursor-pointer hover:border-primary/40 transition-smooth"
      data-ocid={`dashboard.poll_card.${index + 1}`}
    >
      {/* Thumbnail */}
      <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
        <img
          src={poll.photoUrl}
          alt="Poll"
          className="w-full h-full object-cover"
        />
        {ended && <div className="absolute inset-0 bg-card/50" />}
        {winnerFace !== null && (
          <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-1 ring-accent">
            <span className="font-display font-black text-[11px] text-primary-foreground">
              {winnerFace}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="font-display font-bold text-sm text-foreground truncate">
              {category?.emoji} {category?.label}
            </span>
            <Badge
              variant="secondary"
              className={cn(
                "text-[9px] font-display font-bold uppercase tracking-wider shrink-0 border",
                ended
                  ? "text-muted-foreground border-border"
                  : "text-primary border-primary/40 bg-primary/10",
              )}
            >
              {ended ? "Ended" : "● Active"}
            </Badge>
          </div>
          {poll.caption && (
            <p className="text-xs text-muted-foreground font-body line-clamp-1">
              {poll.caption}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users size={10} className="text-primary" />
              <span className="text-xs font-display font-bold text-primary">
                {Number(poll.totalVotes).toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-foreground font-body">
                votes
              </span>
            </div>
            <div className="flex items-center gap-1">
              {ended ? (
                winnerFace !== null ? (
                  <>
                    <Trophy size={10} className="text-accent" />
                    <span className="text-[10px] font-body text-accent">
                      Face {winnerFace} won
                    </span>
                  </>
                ) : null
              ) : (
                <>
                  <Clock size={10} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground font-body">
                    {timeLeft(poll.expiresAt)}
                  </span>
                </>
              )}
            </div>
          </div>
          {sortedTallies.length > 0 && <MiniVoteBar tallies={sortedTallies} />}
        </div>
      </div>
    </motion.button>
  );
}
