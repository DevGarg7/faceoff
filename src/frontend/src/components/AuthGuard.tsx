import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-profile";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface AuthGuardProps {
  children: ReactNode;
  requireProfile?: boolean;
}

export function AuthGuard({ children, requireProfile = true }: AuthGuardProps) {
  const { isAuthenticated, isInitializing } = useAuth();
  const { hasProfile, isLoading, isFetched } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isInitializing || isLoading) return;
    if (!isAuthenticated) return;
    if (!requireProfile) return;
    if (isFetched && !hasProfile && location.pathname !== "/profile") {
      navigate({ to: "/profile", replace: true });
    }
  }, [
    isAuthenticated,
    isInitializing,
    hasProfile,
    isLoading,
    isFetched,
    requireProfile,
    location.pathname,
    navigate,
  ]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground font-body text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
