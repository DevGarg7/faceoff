import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { BarChart3, Home, PlusSquare, User } from "lucide-react";
import type { ReactNode } from "react";

const NAV_ITEMS = [
  { to: "/", icon: Home, label: "Feed", ocid: "nav.feed_tab" },
  {
    to: "/upload",
    icon: PlusSquare,
    label: "Create Poll",
    ocid: "nav.upload_tab",
  },
  {
    to: "/dashboard",
    icon: BarChart3,
    label: "Dashboard",
    ocid: "nav.dashboard_tab",
  },
  { to: "/profile", icon: User, label: "Profile", ocid: "nav.profile_tab" },
] as const;

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function Layout({ children, hideNav = false }: LayoutProps) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border flex items-center justify-between px-4 h-14 shadow-md">
        <Link
          to="/"
          className="flex items-center gap-1"
          data-ocid="nav.logo_link"
        >
          <span className="font-display font-black text-2xl tracking-tight">
            <span className="text-primary">Face</span>
            <span className="text-accent">Off</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {!isAuthenticated && (
            <Link
              to="/profile"
              className="text-xs font-body font-semibold text-primary border border-primary rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-smooth"
              data-ocid="nav.login_link"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-14 pb-20 bg-background">{children}</main>

      {/* Caffeine attribution footer */}
      {hideNav && (
        <footer className="py-3 text-center bg-muted/40 border-t border-border">
          <p className="text-xs text-muted-foreground font-body">
            Powered by{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      )}

      {/* Bottom navigation */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
          <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
            {NAV_ITEMS.map(({ to, icon: Icon, label, ocid }) => {
              const isActive =
                to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={ocid}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-smooth min-w-0",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={cn(
                      isActive &&
                        "drop-shadow-[0_0_6px_oklch(0.68_0.28_310/0.7)]",
                    )}
                  />
                  <span className="text-[10px] font-body font-medium leading-none truncate">
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="pb-1 text-center">
            <p className="text-[9px] text-muted-foreground/60 font-body">
              Built with{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-muted-foreground transition-colors duration-200"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </nav>
      )}
    </div>
  );
}
