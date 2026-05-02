import { createActor } from "@/backend";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

// Per-face colours: magenta | cyan | amber | green
const FACE_STYLES = [
  {
    base: "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_oklch(0.68_0.28_310/0.6)] hover:shadow-[0_0_32px_oklch(0.68_0.28_310/0.9)]",
    active:
      "bg-primary border-primary text-primary-foreground shadow-[0_0_32px_oklch(0.68_0.28_310/0.9)] scale-95",
  },
  {
    base: "bg-accent border-accent text-accent-foreground shadow-[0_0_20px_oklch(0.7_0.26_200/0.6)] hover:shadow-[0_0_32px_oklch(0.7_0.26_200/0.9)]",
    active:
      "bg-accent border-accent text-accent-foreground shadow-[0_0_32px_oklch(0.7_0.26_200/0.9)] scale-95",
  },
  {
    base: "bg-[oklch(0.72_0.2_85)] border-[oklch(0.72_0.2_85)] text-[oklch(0.1_0.01_85)] shadow-[0_0_20px_oklch(0.72_0.2_85/0.6)] hover:shadow-[0_0_32px_oklch(0.72_0.2_85/0.9)]",
    active:
      "bg-[oklch(0.72_0.2_85)] border-[oklch(0.72_0.2_85)] text-[oklch(0.1_0.01_85)] scale-95",
  },
  {
    base: "bg-[oklch(0.65_0.2_165)] border-[oklch(0.65_0.2_165)] text-[oklch(0.95_0.01_165)] shadow-[0_0_20px_oklch(0.65_0.2_165/0.6)] hover:shadow-[0_0_32px_oklch(0.65_0.2_165/0.9)]",
    active:
      "bg-[oklch(0.65_0.2_165)] border-[oklch(0.65_0.2_165)] text-[oklch(0.95_0.01_165)] scale-95",
  },
];

interface VoteButtonsProps {
  pollId: string;
  faceCount: number;
  onVoted: (
    faceNumber: number,
    tallies: Array<{ faceNumber: bigint; count: bigint; percentage: number }>,
  ) => void;
}

export function VoteButtons({ pollId, faceCount, onVoted }: VoteButtonsProps) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [voting, setVoting] = useState<number | null>(null);

  async function handleVote(faceNumber: number) {
    if (!actor || voting !== null) return;
    setVoting(faceNumber);
    try {
      const result = await actor.castVote(pollId, BigInt(faceNumber));
      if (result.__kind__ === "ok") {
        await queryClient.invalidateQueries({ queryKey: ["hasVoted", pollId] });
        await queryClient.invalidateQueries({ queryKey: ["results", pollId] });
        onVoted(faceNumber, result.ok);
      } else {
        toast.error(result.err ?? "Vote failed");
        setVoting(null);
      }
    } catch {
      toast.error("Failed to cast vote");
      setVoting(null);
    }
  }

  const faces = Array.from({ length: faceCount }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        "grid gap-3 w-full",
        faceCount <= 2 ? "grid-cols-2" : "grid-cols-4",
      )}
      data-ocid="feed.vote_buttons"
    >
      {faces.map((n) => {
        const styleIdx = (n - 1) % FACE_STYLES.length;
        const faceStyle = FACE_STYLES[styleIdx];
        const isVoting = voting === n;
        const isDisabled = voting !== null && !isVoting;

        return (
          <button
            key={`vote-face-${n}`}
            type="button"
            data-ocid={`feed.vote_button.${n}`}
            disabled={voting !== null}
            onClick={() => handleVote(n)}
            className={cn(
              "relative flex flex-col items-center justify-center rounded-full aspect-square font-display font-black",
              "border-4 transition-smooth active:scale-90 select-none",
              isVoting ? faceStyle?.active : faceStyle?.base,
              isDisabled && "opacity-40 cursor-not-allowed",
            )}
          >
            {isVoting ? (
              <div className="w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <>
                <span className="text-3xl leading-none">{n}</span>
                <span className="text-[9px] uppercase tracking-widest mt-1 opacity-90 font-body font-bold">
                  Vote
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
