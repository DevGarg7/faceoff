import { VoteBar } from "@/components/VoteBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { usePoll, usePollResults } from "@/hooks/use-polls";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types";
import type { PollSummary } from "@/types";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

function timeLeft(expiresAt: bigint): string {
  const ms = Number(expiresAt) / 1_000_000_000 - Date.now() / 1000;
  if (ms <= 0) return "Ended";
  const h = Math.floor(ms / 3_600);
  if (h > 24) return `${Math.floor(h / 24)}d left`;
  if (h > 0) return `${h}h left`;
  const m = Math.floor((ms % 3_600) / 60);
  return `${m}m left`;
}

interface PollDetailModalProps {
  poll: PollSummary | null;
  onClose: () => void;
}

export function PollDetailModal({ poll, onClose }: PollDetailModalProps) {
  const { data: pollDetail, isLoading: loadingDetail } = usePoll(
    poll?.id ?? "",
  );
  const { data: tallies, isLoading: loadingTallies } = usePollResults(
    poll?.id ?? "",
  );

  useEffect(() => {
    if (!poll) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [poll, onClose]);

  const category = CATEGORY_LABELS.find(
    (c) => poll && c.value === (poll.category as string),
  );

  const sortedTallies = tallies
    ? [...tallies].sort((a, b) => Number(b.count) - Number(a.count))
    : [];

  const ended = poll
    ? Number(poll.expiresAt) / 1_000_000_000 < Date.now() / 1000
    : false;

  const winnerFace =
    ended && sortedTallies.length > 0
      ? Number(sortedTallies[0].faceNumber)
      : null;

  const totalVotes = sortedTallies.reduce((s, t) => s + Number(t.count), 0);

  return (
    <AnimatePresence>
      {poll && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            data-ocid="poll_detail.backdrop"
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-card border border-border border-b-0 rounded-t-3xl overflow-hidden"
            style={{ maxHeight: "88vh" }}
            data-ocid="poll_detail.dialog"
          >
            {/* Handle */}
            <div className="flex items-center justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{category?.emoji}</span>
                <h2 className="font-display font-bold text-base text-foreground">
                  {category?.label}
                </h2>
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[9px] font-display font-bold uppercase tracking-wider border",
                    ended
                      ? "text-muted-foreground border-border"
                      : "text-primary border-primary/40 bg-primary/10",
                  )}
                >
                  {ended ? "Ended" : "● Active"}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full w-8 h-8 text-muted-foreground hover:text-foreground"
                data-ocid="poll_detail.close_button"
              >
                <X size={16} />
              </Button>
            </div>

            <ScrollArea
              className="overflow-auto"
              style={{ maxHeight: "calc(88vh - 80px)" }}
            >
              <div className="px-4 pb-8 space-y-4">
                {/* Photo with face markers */}
                <div className="relative rounded-2xl overflow-hidden bg-muted">
                  {loadingDetail ? (
                    <Skeleton className="w-full aspect-[4/3]" />
                  ) : (
                    <>
                      <img
                        src={poll.photoUrl}
                        alt="Poll"
                        className="w-full aspect-[4/3] object-cover"
                      />
                      {/* Face markers overlay */}
                      {pollDetail?.faceMarkers.map((marker) => (
                        <div
                          key={`marker-${Number(marker.faceNumber)}`}
                          className="absolute"
                          style={{
                            left: `${marker.xPercent}%`,
                            top: `${marker.yPercent}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <div
                            className={cn(
                              "w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm shadow-lg ring-2",
                              winnerFace === Number(marker.faceNumber)
                                ? "bg-primary text-primary-foreground ring-accent"
                                : "bg-card/90 text-foreground ring-border",
                            )}
                          >
                            {Number(marker.faceNumber)}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Caption */}
                {poll.caption && (
                  <p className="text-sm font-body text-foreground">
                    {poll.caption}
                  </p>
                )}

                {/* Stats row */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-xl text-primary">
                      {totalVotes.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground font-body">
                      total votes
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  {ended ? (
                    winnerFace !== null ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-body text-muted-foreground">
                          Winner:
                        </span>
                        <span className="font-display font-bold text-accent text-sm">
                          Face {winnerFace} 👑
                        </span>
                      </div>
                    ) : null
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-body text-muted-foreground">
                        Time left:
                      </span>
                      <span className="font-display font-bold text-sm text-foreground">
                        {timeLeft(poll.expiresAt)}
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Vote breakdown */}
                <div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-3">
                    Vote Breakdown
                  </h3>
                  {loadingTallies ? (
                    <div className="space-y-4">
                      {["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => (
                        <Skeleton key={k} className="h-8 w-full" />
                      ))}
                    </div>
                  ) : sortedTallies.length === 0 ? (
                    <p className="text-sm text-muted-foreground font-body text-center py-4">
                      No votes yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {sortedTallies.map((tally, i) => (
                        <VoteBar
                          key={`tally-${Number(tally.faceNumber)}`}
                          tally={tally}
                          rank={i + 1}
                          isWinner={ended && i === 0 && Number(tally.count) > 0}
                          delay={i * 0.1}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
