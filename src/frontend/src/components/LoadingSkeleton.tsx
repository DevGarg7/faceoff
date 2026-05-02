import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function FeedCardSkeleton() {
  return (
    <div
      className="poll-card w-full max-w-md mx-auto"
      data-ocid="feed.loading_state"
    >
      <Skeleton className="w-full aspect-[3/4] rounded-t-2xl" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-48" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div
      className="poll-card p-4 space-y-3"
      data-ocid="dashboard.loading_state"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="w-16 h-16 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div
      className="flex flex-col items-center gap-4 p-6"
      data-ocid="profile.loading_state"
    >
      <Skeleton className="w-24 h-24 rounded-full" />
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-56" />
      <div className="grid grid-cols-3 gap-4 w-full mt-4">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
      </div>
    </div>
  );
}

interface GenericSkeletonProps {
  className?: string;
  rows?: number;
}

export function GenericSkeleton({ className, rows = 3 }: GenericSkeletonProps) {
  const widths = ["90%", "80%", "70%", "60%", "50%"];
  return (
    <div className={cn("space-y-3", className)}>
      {widths.slice(0, rows).map((w) => (
        <Skeleton key={w} className="h-4" style={{ width: w }} />
      ))}
    </div>
  );
}
