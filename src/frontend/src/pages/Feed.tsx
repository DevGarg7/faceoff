import { Layout } from "@/components/Layout";
import { FeedCardSkeleton } from "@/components/LoadingSkeleton";
import { PollCard } from "@/components/PollCard";
import { useAuth } from "@/hooks/use-auth";
import { usePoll, usePublicFeed } from "@/hooks/use-polls";
import { Link } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { useEffect, useRef } from "react";

function EmptyFeed() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-8 text-center"
      data-ocid="feed.empty_state"
    >
      <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
        <span className="text-5xl">📸</span>
      </div>
      <div className="space-y-2">
        <h2 className="font-display font-black text-2xl text-foreground">
          No polls yet
        </h2>
        <p className="font-body text-muted-foreground text-sm max-w-xs">
          Be the first to upload a group photo and start a FaceOff!
        </p>
      </div>
      <Link
        to="/upload"
        data-ocid="feed.upload_cta_button"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-bold px-8 py-3 rounded-2xl shadow-[0_0_20px_oklch(0.68_0.28_310/0.5)] hover:shadow-[0_0_28px_oklch(0.68_0.28_310/0.7)] transition-smooth"
      >
        <Upload size={18} />
        Upload First Photo
      </Link>
    </div>
  );
}

function LoginPrompt() {
  const { login, isLoggingIn, isInitializing } = useAuth();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6 text-center"
      data-ocid="feed.login_prompt"
    >
      <div className="text-6xl mb-4">🔥</div>
      <h2 className="font-display font-black text-3xl text-foreground mb-2">
        Join <span className="text-primary">Face</span>
        <span className="text-accent">Off</span>
      </h2>
      <p className="text-muted-foreground font-body mb-8 max-w-xs">
        Sign in to vote, upload, and see who the public thinks wins every
        matchup.
      </p>
      <button
        type="button"
        onClick={login}
        disabled={isLoggingIn || isInitializing}
        className="vote-button w-full max-w-xs text-base py-4 disabled:opacity-50 pulse-scale"
        data-ocid="feed.login_button"
      >
        {isLoggingIn ? "Opening login…" : "Sign In with Internet Identity"}
      </button>
    </div>
  );
}

interface SnapFeedItemProps {
  pollId: string;
  index: number;
}

function SnapFeedItem({ pollId, index }: SnapFeedItemProps) {
  const { data: poll, isLoading } = usePoll(pollId);

  return (
    <div
      className="snap-start flex-shrink-0 w-full h-full"
      data-ocid={`feed.poll_item.${index + 1}`}
    >
      <div className="h-full w-full max-w-md mx-auto flex flex-col overflow-hidden">
        {isLoading || !poll ? (
          <FeedCardSkeleton />
        ) : (
          <PollCard poll={poll} index={index} />
        )}
      </div>
    </div>
  );
}

export default function FeedPage() {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePublicFeed();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const summaries = data?.pages.flat() ?? [];

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Layout>
      {!isAuthenticated ? (
        <LoginPrompt />
      ) : (
        <div
          className="h-[calc(100vh-7rem)] overflow-y-scroll snap-y snap-mandatory"
          data-ocid="feed.page"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {isLoading ? (
            <div className="snap-start w-full h-full flex items-start justify-center p-4">
              <div className="w-full max-w-md">
                <FeedCardSkeleton />
              </div>
            </div>
          ) : summaries.length === 0 ? (
            <div className="snap-start w-full h-full flex items-center justify-center">
              <EmptyFeed />
            </div>
          ) : (
            <>
              {summaries.map((summary, i) => (
                <SnapFeedItem key={summary.id} pollId={summary.id} index={i} />
              ))}
              <div
                ref={sentinelRef}
                className="snap-start h-2 w-full"
                data-ocid="feed.load_more_sentinel"
              />
              {isFetchingNextPage && (
                <div
                  className="snap-start w-full h-full flex items-center justify-center"
                  data-ocid="feed.loading_more"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Layout>
  );
}
