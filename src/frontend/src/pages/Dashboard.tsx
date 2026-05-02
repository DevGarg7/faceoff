import { Layout } from "@/components/Layout";
import { DashboardCardSkeleton } from "@/components/LoadingSkeleton";
import { MyPollCard } from "@/components/MyPollCard";
import { PollDetailModal } from "@/components/PollDetailModal";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useMyPolls } from "@/hooks/use-polls";
import { cn } from "@/lib/utils";
import type { PollSummary } from "@/types";
import { Link } from "@tanstack/react-router";
import { BarChart3, Clock, PlusCircle, RefreshCw, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-2">
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center",
          color,
        )}
      >
        <Icon size={18} className="text-foreground" />
      </div>
      <div className="font-display font-black text-2xl text-foreground">
        {value}
      </div>
      <div className="text-xs text-muted-foreground font-body">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const { data: polls, isLoading, refetch, isFetching } = useMyPolls();
  const [selectedPoll, setSelectedPoll] = useState<PollSummary | null>(null);

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <p className="text-muted-foreground font-body">
            Sign in to see your dashboard.
          </p>
        </div>
      </Layout>
    );
  }

  const allPolls = polls ?? [];
  const totalVotes = allPolls.reduce((s, p) => s + Number(p.totalVotes), 0);
  const activePolls = allPolls.filter(
    (p) => Number(p.expiresAt) / 1_000_000_000 > Date.now() / 1000,
  ).length;
  const endedWithWinner = allPolls.filter(
    (p) =>
      Number(p.expiresAt) / 1_000_000_000 < Date.now() / 1000 &&
      p.leadingFace !== undefined,
  ).length;

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-6" data-ocid="dashboard.page">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl text-foreground">
                My Polls
              </h1>
              {allPolls.length > 0 && (
                <Badge className="bg-primary/20 text-primary border-primary/30 font-display font-bold">
                  {allPolls.length}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground font-body text-sm">
              Track your face-off results
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth disabled:opacity-50"
              data-ocid="dashboard.refresh_button"
            >
              <RefreshCw
                size={14}
                className={cn(isFetching && "animate-spin")}
              />
            </button>
            <Link
              to="/upload"
              className="flex items-center gap-1.5 text-sm font-body font-semibold px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-smooth"
              data-ocid="dashboard.create_poll_link"
            >
              <PlusCircle size={14} />
              New Poll
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard
            label="Polls Created"
            value={allPolls.length}
            icon={BarChart3}
            color="bg-primary/20"
          />
          <StatCard
            label="Total Votes"
            value={
              totalVotes >= 1000
                ? `${(totalVotes / 1000).toFixed(1)}k`
                : totalVotes
            }
            icon={Trophy}
            color="bg-accent/20"
          />
          <StatCard
            label="Active Now"
            value={activePolls}
            icon={Clock}
            color="bg-secondary"
          />
        </div>

        {/* Winners row */}
        {endedWithWinner > 0 && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <Trophy size={14} className="text-primary shrink-0" />
            <span className="text-xs font-body text-primary">
              <span className="font-bold">{endedWithWinner}</span>{" "}
              {endedWithWinner === 1 ? "poll" : "polls"} with a clear winner
            </span>
          </div>
        )}

        {/* Polls list */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-base text-foreground">
            Your Polls
          </h2>
          {activePolls > 0 && (
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-primary">
              {activePolls} live
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3" data-ocid="dashboard.loading_state">
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
          </div>
        ) : allPolls.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="dashboard.empty_state"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl mb-4"
            >
              📊
            </motion.div>
            <h3 className="font-display font-bold text-lg text-foreground mb-1">
              No polls yet
            </h3>
            <p className="text-muted-foreground font-body text-sm mb-6 max-w-[200px]">
              Create your first face-off and watch the votes roll in.
            </p>
            <Link
              to="/upload"
              className="vote-button inline-flex items-center gap-2"
              data-ocid="dashboard.create_first_poll_button"
            >
              <PlusCircle size={16} />
              Create a Poll
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5" data-ocid="dashboard.polls_list">
            {allPolls.map((poll, i) => (
              <MyPollCard
                key={poll.id}
                poll={poll}
                index={i}
                onClick={() => setSelectedPoll(poll)}
              />
            ))}
          </div>
        )}
      </div>

      <PollDetailModal
        poll={selectedPoll}
        onClose={() => setSelectedPoll(null)}
      />
    </Layout>
  );
}
