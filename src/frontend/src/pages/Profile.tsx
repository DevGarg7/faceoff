import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { ProfileSkeleton } from "@/components/LoadingSkeleton";
import { toast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-profile";
import type { ProfilePublic } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, ImagePlus, LogOut, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const USERNAME_RE = /^[a-zA-Z0-9_]{1,30}$/;

function LoginScreen() {
  const { login, isLoggingIn, isInitializing } = useAuth();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6 text-center"
      data-ocid="profile.login_prompt"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6 max-w-xs"
      >
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center">
            <User size={48} className="text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-display font-black text-xs">
              !
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="font-display font-black text-3xl text-foreground">
            <span className="text-primary">Face</span>
            <span className="text-accent">Off</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            Vote on who shines in every group photo.
          </p>
        </div>
        <Button
          type="button"
          onClick={login}
          disabled={isLoggingIn || isInitializing}
          className="w-full py-5 text-base font-display font-bold tracking-wide"
          data-ocid="profile.login_button"
        >
          {isInitializing
            ? "Loading…"
            : isLoggingIn
              ? "Opening login…"
              : "Sign In to Join"}
        </Button>
      </motion.div>
    </div>
  );
}

function ProfileSetup() {
  const { actor } = useActor(createActor);
  const { refetch } = useProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  const validateUsername = (val: string): string => {
    if (!val.trim()) return "Username is required.";
    if (val.length < 3) return "At least 3 characters required.";
    if (!USERNAME_RE.test(val))
      return "Only letters, numbers, and underscores allowed.";
    return "";
  };

  const handleBlur = () => {
    setValidationError(validateUsername(username));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (validationError) setValidationError(validateUsername(e.target.value));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateUsername(username);
    if (err) {
      setValidationError(err);
      return;
    }
    if (!actor) return;
    setIsSaving(true);
    try {
      const result = await actor.createProfile(username.trim());
      if (result.__kind__ === "ok") {
        toast.success("Profile created! 🎉", {
          description: `Welcome to FaceOff, @${username}!`,
        });
        queryClient.invalidateQueries({ queryKey: ["myProfile"] });
        await refetch();
        navigate({ to: "/" });
      } else {
        toast.error("Couldn't create profile", {
          description: result.__kind__ === "err" ? result.err : "Unknown error",
        });
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center px-6 py-10 max-w-sm mx-auto"
      data-ocid="profile.setup_section"
    >
      {/* Logo */}
      <div className="mb-6 text-center">
        <h1 className="font-display font-black text-4xl mb-1">
          <span className="text-primary">Face</span>
          <span className="text-accent">Off</span>
        </h1>
        <p className="text-muted-foreground font-body text-sm">
          Vote on who shines in every group.
        </p>
      </div>

      {/* Avatar placeholder */}
      <div className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/60 flex items-center justify-center mb-6">
        <User size={34} className="text-primary" />
      </div>

      <div className="w-full bg-card border border-border rounded-2xl p-5 space-y-5">
        <div>
          <h2 className="font-display font-black text-xl text-foreground mb-0.5">
            Create your profile
          </h2>
          <p className="text-muted-foreground font-body text-xs">
            Pick a username to start voting and uploading polls.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="username"
              className="font-display font-semibold text-sm text-foreground"
            >
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. alex_vibes"
              maxLength={30}
              autoCapitalize="none"
              autoCorrect="off"
              className="bg-muted border-border font-mono text-sm"
              data-ocid="profile.username_input"
            />
            {validationError && (
              <p
                className="text-destructive text-xs font-body"
                data-ocid="profile.username_field_error"
              >
                {validationError}
              </p>
            )}
            <p className="text-muted-foreground text-xs font-body">
              Letters, numbers, and underscores only · max 30 chars
            </p>
          </div>

          <Button
            type="submit"
            disabled={!username.trim() || isSaving}
            className="w-full font-display font-bold py-5 text-base"
            data-ocid="profile.submit_button"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Creating…
              </span>
            ) : (
              "Create Profile"
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

function formatMemberSince(createdAt: bigint): string {
  const ms = Number(createdAt / 1_000_000n);
  const date = new Date(ms);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

interface StatTileProps {
  value: string | number;
  label: string;
  accent?: boolean;
}

function StatTile({ value, label, accent }: StatTileProps) {
  return (
    <div className="bg-muted/60 border border-border rounded-xl p-3 flex flex-col items-center gap-0.5">
      <span
        className={`font-display font-black text-2xl ${
          accent ? "text-accent" : "text-primary"
        }`}
      >
        {value}
      </span>
      <span className="text-muted-foreground font-body text-xs text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function ProfileView() {
  const { profile: profileRaw, isLoading } = useProfile();
  const profile = profileRaw as ProfilePublic | null;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (isLoading) return <ProfileSkeleton />;
  if (!profile) return null;

  const initial = profile.username.charAt(0).toUpperCase();
  const memberSince = formatMemberSince(profile.createdAt);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center px-6 py-8 max-w-sm mx-auto"
        data-ocid="profile.view_section"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.4,
            type: "spring",
            stiffness: 180,
          }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 border-2 border-primary flex items-center justify-center mb-4 shadow-lg"
        >
          <span className="font-display font-black text-4xl text-primary-foreground">
            {initial}
          </span>
        </motion.div>

        {/* Username */}
        <h2 className="font-display font-black text-2xl text-foreground mb-1">
          @{profile.username}
        </h2>

        {/* Member since */}
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-body mb-6">
          <CalendarDays size={13} />
          <span>Member since {memberSince}</span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 w-full mb-8">
          <StatTile
            value={Number(profile.pollCount)}
            label="Polls Created"
            accent={false}
          />
          <StatTile
            value={Number(profile.pollCount) > 0 ? "Active" : "—"}
            label="Creator Status"
            accent
          />
        </div>

        {/* Settings section */}
        <div className="w-full space-y-3">
          <h3 className="font-display font-bold text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Settings
          </h3>

          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-card border border-border hover:border-border/80 transition-smooth font-body text-sm text-foreground"
            data-ocid="profile.manage_polls_button"
            onClick={() => navigate({ to: "/dashboard" })}
          >
            <ImagePlus size={16} className="text-accent shrink-0" />
            <span>Manage my polls</span>
          </button>

          <button
            type="button"
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-destructive/30 bg-destructive/10 text-destructive font-body font-semibold text-sm hover:bg-destructive/20 transition-smooth"
            data-ocid="profile.logout_button"
          >
            <LogOut size={16} className="shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>

      {/* Logout confirmation dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent
          className="bg-card border-border max-w-xs"
          data-ocid="profile.logout_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-black text-foreground">
              Sign Out?
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-body text-sm">
              You'll need to sign in again to vote or upload polls.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setShowLogoutDialog(false)}
              data-ocid="profile.logout_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="flex-1 font-display font-bold"
              onClick={() => {
                logout();
                setShowLogoutDialog(false);
              }}
              data-ocid="profile.logout_confirm_button"
            >
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function ProfilePage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const { hasProfile, isLoading, isFetched } = useProfile();

  if (isInitializing || (isAuthenticated && isLoading)) {
    return (
      <Layout>
        <ProfileSkeleton />
      </Layout>
    );
  }

  const showSetup = isAuthenticated && isFetched && !hasProfile;

  return (
    <Layout>
      <div data-ocid="profile.page">
        {!isAuthenticated ? (
          <LoginScreen />
        ) : showSetup ? (
          <ProfileSetup />
        ) : (
          <ProfileView />
        )}
      </div>
    </Layout>
  );
}
