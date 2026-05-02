import { FaceBadge } from "@/components/FaceBadge";
import { ResultsReveal } from "@/components/ResultsReveal";
import { VoteButtons } from "@/components/VoteButtons";
import { useHasVoted } from "@/hooks/use-polls";
import { cn } from "@/lib/utils";
import type { PollPublic, VoteTally } from "@/types";
import { CATEGORY_LABELS } from "@/types";
import { ChevronUp, Clock } from "lucide-react";
import { useRef, useState } from "react";

function formatTimeLeft(expiresAt: bigint): string {
  const now = Date.now();
  const expiresMs = Number(expiresAt / 1_000_000n);
  const diff = expiresMs - now;
  if (diff <= 0) return "Ended";
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) {
    const mins = Math.floor(diff / 60_000);
    return `${mins}m left`;
  }
  if (hours < 24) return `${hours}h left`;
  const days = Math.floor(hours / 24);
  return `${days}d left`;
}

interface PollCardProps {
  poll: PollPublic;
  index: number;
}

export function PollCard({ poll, index }: PollCardProps) {
  const { data: hasVoted, isLoading: votedLoading } = useHasVoted(poll.id);
  const [localVotedFace, setLocalVotedFace] = useState<number | null>(null);
  const [localTallies, setLocalTallies] = useState<Array<VoteTally> | null>(
    null,
  );

  const prevPollIdRef = useRef(poll.id);
  if (prevPollIdRef.current !== poll.id) {
    prevPollIdRef.current = poll.id;
    setLocalVotedFace(null);
    setLocalTallies(null);
  }

  const showResults = hasVoted || localVotedFace !== null;
  const tallies = localTallies ?? poll.votes;
  const totalVotes = localTallies
    ? localTallies.reduce((s, t) => s + t.count, 0n)
    : poll.totalVotes;

  const categoryInfo = CATEGORY_LABELS.find(
    (c) => c.value === (poll.category as unknown as string),
  );

  const timeLeft = formatTimeLeft(poll.expiresAt);
  const isEnded = timeLeft === "Ended";

  const winnerFaceNum =
    tallies.length > 0
      ? Number(
          [...tallies].sort((a, b) => Number(b.count) - Number(a.count))[0]
            ?.faceNumber,
        )
      : -1;

  function handleVoted(
    faceNumber: number,
    newTallies: Array<{
      faceNumber: bigint;
      count: bigint;
      percentage: number;
    }>,
  ) {
    setLocalVotedFace(faceNumber);
    setLocalTallies(newTallies);
  }

  return (
    <div
      className="relative w-full h-full flex flex-col"
      data-ocid={`feed.poll_card.${index + 1}`}
    >
      {/* Photo area fills available space */}
      <div className="relative flex-1 overflow-hidden bg-card">
        <img
          src={poll.photoUrl}
          alt={`Poll ${poll.id}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient top */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        {/* Gradient bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-display font-bold bg-black/70 text-foreground border border-white/10 backdrop-blur-sm">
            {categoryInfo?.emoji ?? "🏆"} {categoryInfo?.label ?? "Poll"}
          </span>
        </div>

        {/* Time + votes */}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-semibold backdrop-blur-sm border",
              isEnded
                ? "bg-muted/70 text-muted-foreground border-border/40"
                : "bg-primary/20 text-primary border-primary/40",
            )}
          >
            <Clock size={11} />
            {timeLeft}
          </span>
          <span className="text-[11px] text-white/70 font-body">
            {Number(totalVotes).toLocaleString()} votes
          </span>
        </div>

        {/* Face number badges — TikTok-sized */}
        {poll.faceMarkers.map((marker) => (
          <FaceBadge
            key={`badge-${Number(marker.faceNumber)}`}
            marker={marker}
            isVoted={localVotedFace === Number(marker.faceNumber)}
            isWinner={
              showResults && Number(marker.faceNumber) === winnerFaceNum
            }
            showRing={showResults}
            size="lg"
          />
        ))}

        {/* Caption */}
        {poll.caption && (
          <div className="absolute bottom-2 left-3 right-3 z-10">
            <p className="text-white/90 text-sm font-body line-clamp-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
              {poll.caption}
            </p>
          </div>
        )}
      </div>

      {/* Bottom interaction panel */}
      <div className="bg-card border-t border-border/40 px-3 pt-3 pb-3 flex-shrink-0">
        {votedLoading ? (
          <div className="h-20 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : showResults ? (
          <ResultsReveal
            tallies={tallies}
            votedFace={localVotedFace}
            totalVotes={totalVotes}
          />
        ) : (
          <VoteButtons
            pollId={poll.id}
            faceCount={poll.faceMarkers.length || 4}
            onVoted={handleVoted}
          />
        )}

        <div className="flex items-center justify-center gap-1 text-muted-foreground opacity-50 mt-2">
          <ChevronUp size={13} />
          <span className="text-[10px] font-body">Swipe for next</span>
        </div>
      </div>
    </div>
  );
}
