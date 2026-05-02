import { j as jsxRuntimeExports, c as cn, u as useActor, a as useQueryClient, r as reactExports, b as ue, d as createActor, e as useAuth, F as FeedCardSkeleton, L as Link } from "./index-ovTHFw25.js";
import { c as createLucideIcon, L as Layout } from "./Layout-DFJinAMo.js";
import { m as motion } from "./proxy-BkN__AwS.js";
import { T as Trophy, u as useHasVoted, C as Clock, a as usePublicFeed, b as usePoll } from "./use-polls-y0ZEKFc4.js";
import { C as CATEGORY_LABELS } from "./index-PB1pKDI7.js";
import { U as Upload } from "./upload-B6lEwFMV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode);
const FACE_COLORS$1 = [
  {
    text: "text-primary",
    shadow: "drop-shadow-[0_0_12px_oklch(0.68_0.28_310/0.95)]"
  },
  {
    text: "text-accent",
    shadow: "drop-shadow-[0_0_12px_oklch(0.7_0.26_200/0.95)]"
  },
  {
    text: "text-[oklch(0.82_0.22_85)]",
    shadow: "drop-shadow-[0_0_12px_oklch(0.82_0.22_85/0.95)]"
  },
  {
    text: "text-[oklch(0.75_0.22_165)]",
    shadow: "drop-shadow-[0_0_12px_oklch(0.75_0.22_165/0.95)]"
  }
];
function FaceBadge({
  marker,
  isWinner = false,
  isVoted = false,
  showRing = false,
  size = "md"
}) {
  const num = Number(marker.faceNumber);
  const colorIdx = (num - 1) % FACE_COLORS$1.length;
  const color = FACE_COLORS$1[colorIdx];
  const sizeCls = {
    sm: "text-4xl leading-none",
    md: "text-5xl leading-none",
    lg: "text-7xl leading-none"
  }[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none",
      style: { left: `${marker.xPercent}%`, top: `${marker.yPercent}%` },
      children: [
        (isVoted || isWinner && showRing) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "absolute -inset-2 rounded-full border-2 animate-pulse",
              isVoted ? "border-accent" : "border-primary"
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "font-display font-black",
              sizeCls,
              isVoted ? "text-accent drop-shadow-[0_0_14px_oklch(0.7_0.26_200/1)]" : isWinner && showRing ? "text-primary drop-shadow-[0_0_14px_oklch(0.68_0.28_310/1)]" : cn((color == null ? void 0 : color.text) ?? "text-primary", (color == null ? void 0 : color.shadow) ?? ""),
              "[text-shadow:0_2px_8px_rgba(0,0,0,0.95)]"
            ),
            style: { WebkitTextStroke: "2px rgba(0,0,0,0.7)" },
            children: num
          }
        )
      ]
    }
  );
}
const FACE_COLORS = [
  {
    ring: "border-primary",
    fill: "bg-primary/25",
    badge: "bg-primary text-primary-foreground",
    label: "text-primary",
    pct: "text-primary"
  },
  {
    ring: "border-accent",
    fill: "bg-accent/25",
    badge: "bg-accent text-accent-foreground",
    label: "text-accent",
    pct: "text-accent"
  },
  {
    ring: "border-[oklch(0.72_0.2_85)]",
    fill: "bg-[oklch(0.72_0.2_85/0.2)]",
    badge: "bg-[oklch(0.72_0.2_85)] text-[oklch(0.1_0.01_85)]",
    label: "text-[oklch(0.82_0.22_85)]",
    pct: "text-[oklch(0.82_0.22_85)]"
  },
  {
    ring: "border-[oklch(0.65_0.2_165)]",
    fill: "bg-[oklch(0.65_0.2_165/0.2)]",
    badge: "bg-[oklch(0.65_0.2_165)] text-[oklch(0.95_0.01_165)]",
    label: "text-[oklch(0.75_0.22_165)]",
    pct: "text-[oklch(0.75_0.22_165)]"
  }
];
function ResultsReveal({
  tallies,
  votedFace,
  totalVotes
}) {
  const sorted = [...tallies].sort((a, b) => Number(b.count) - Number(a.count));
  const winner = sorted[0];
  const total = Number(totalVotes);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      className: "w-full space-y-2",
      "data-ocid": "feed.results_panel",
      children: [
        sorted.map((tally, idx) => {
          const faceNum = Number(tally.faceNumber);
          const pct = total === 0 ? 0 : Number(tally.count) / total * 100;
          const isVoted = votedFace === faceNum;
          const isWinner = winner && Number(winner.faceNumber) === faceNum;
          const colorIdx = (faceNum - 1) % FACE_COLORS.length;
          const color = FACE_COLORS[colorIdx];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -16 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: idx * 0.07, duration: 0.28 },
              className: cn(
                "relative rounded-xl overflow-hidden border",
                isVoted ? cn(
                  (color == null ? void 0 : color.ring) ?? "border-primary",
                  "border-2 shadow-[0_0_10px_oklch(0.7_0.26_200/0.4)]"
                ) : "border-border/50"
              ),
              "data-ocid": `feed.result_bar.${faceNum}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: `${pct}%` },
                    transition: {
                      delay: idx * 0.07 + 0.08,
                      duration: 0.55,
                      ease: "easeOut"
                    },
                    className: cn(
                      "absolute inset-0",
                      isVoted ? (color == null ? void 0 : color.fill) ?? "bg-primary/20" : isWinner ? "bg-primary/15" : "bg-muted/40"
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center gap-2 px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-7 h-7 rounded-full font-display font-black text-xs flex items-center justify-center flex-shrink-0",
                        isVoted ? (color == null ? void 0 : color.badge) ?? "bg-primary text-primary-foreground" : isWinner ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      ),
                      children: faceNum
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: cn(
                        "font-body font-semibold text-xs",
                        isVoted ? (color == null ? void 0 : color.label) ?? "text-primary" : isWinner ? "text-primary" : "text-muted-foreground"
                      ),
                      children: [
                        "Face ",
                        faceNum,
                        isVoted && " · Your pick"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                    isWinner && idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 12, className: "text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: cn(
                          "font-display font-black text-sm",
                          isVoted ? (color == null ? void 0 : color.pct) ?? "text-primary" : isWinner ? "text-primary" : "text-foreground"
                        ),
                        children: [
                          Math.round(pct),
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-[10px]", children: Number(tally.count).toLocaleString() })
                  ] })
                ] })
              ]
            },
            `result-face-${faceNum}`
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-[10px] text-muted-foreground", children: [
          total.toLocaleString(),
          " vote",
          total !== 1 ? "s" : ""
        ] })
      ]
    }
  );
}
const FACE_STYLES = [
  {
    base: "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_oklch(0.68_0.28_310/0.6)] hover:shadow-[0_0_32px_oklch(0.68_0.28_310/0.9)]",
    active: "bg-primary border-primary text-primary-foreground shadow-[0_0_32px_oklch(0.68_0.28_310/0.9)] scale-95"
  },
  {
    base: "bg-accent border-accent text-accent-foreground shadow-[0_0_20px_oklch(0.7_0.26_200/0.6)] hover:shadow-[0_0_32px_oklch(0.7_0.26_200/0.9)]",
    active: "bg-accent border-accent text-accent-foreground shadow-[0_0_32px_oklch(0.7_0.26_200/0.9)] scale-95"
  },
  {
    base: "bg-[oklch(0.72_0.2_85)] border-[oklch(0.72_0.2_85)] text-[oklch(0.1_0.01_85)] shadow-[0_0_20px_oklch(0.72_0.2_85/0.6)] hover:shadow-[0_0_32px_oklch(0.72_0.2_85/0.9)]",
    active: "bg-[oklch(0.72_0.2_85)] border-[oklch(0.72_0.2_85)] text-[oklch(0.1_0.01_85)] scale-95"
  },
  {
    base: "bg-[oklch(0.65_0.2_165)] border-[oklch(0.65_0.2_165)] text-[oklch(0.95_0.01_165)] shadow-[0_0_20px_oklch(0.65_0.2_165/0.6)] hover:shadow-[0_0_32px_oklch(0.65_0.2_165/0.9)]",
    active: "bg-[oklch(0.65_0.2_165)] border-[oklch(0.65_0.2_165)] text-[oklch(0.95_0.01_165)] scale-95"
  }
];
function VoteButtons({ pollId, faceCount, onVoted }) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [voting, setVoting] = reactExports.useState(null);
  async function handleVote(faceNumber) {
    if (!actor || voting !== null) return;
    setVoting(faceNumber);
    try {
      const result = await actor.castVote(pollId, BigInt(faceNumber));
      if (result.__kind__ === "ok") {
        await queryClient.invalidateQueries({ queryKey: ["hasVoted", pollId] });
        await queryClient.invalidateQueries({ queryKey: ["results", pollId] });
        onVoted(faceNumber, result.ok);
      } else {
        ue.error(result.err ?? "Vote failed");
        setVoting(null);
      }
    } catch {
      ue.error("Failed to cast vote");
      setVoting(null);
    }
  }
  const faces = Array.from({ length: faceCount }, (_, i) => i + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "grid gap-3 w-full",
        faceCount <= 2 ? "grid-cols-2" : "grid-cols-4"
      ),
      "data-ocid": "feed.vote_buttons",
      children: faces.map((n) => {
        const styleIdx = (n - 1) % FACE_STYLES.length;
        const faceStyle = FACE_STYLES[styleIdx];
        const isVoting = voting === n;
        const isDisabled = voting !== null && !isVoting;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `feed.vote_button.${n}`,
            disabled: voting !== null,
            onClick: () => handleVote(n),
            className: cn(
              "relative flex flex-col items-center justify-center rounded-full aspect-square font-display font-black",
              "border-4 transition-smooth active:scale-90 select-none",
              isVoting ? faceStyle == null ? void 0 : faceStyle.active : faceStyle == null ? void 0 : faceStyle.base,
              isDisabled && "opacity-40 cursor-not-allowed"
            ),
            children: isVoting ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl leading-none", children: n }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest mt-1 opacity-90 font-body font-bold", children: "Vote" })
            ] })
          },
          `vote-face-${n}`
        );
      })
    }
  );
}
function formatTimeLeft(expiresAt) {
  const now = Date.now();
  const expiresMs = Number(expiresAt / 1000000n);
  const diff = expiresMs - now;
  if (diff <= 0) return "Ended";
  const hours = Math.floor(diff / 36e5);
  if (hours < 1) {
    const mins = Math.floor(diff / 6e4);
    return `${mins}m left`;
  }
  if (hours < 24) return `${hours}h left`;
  const days = Math.floor(hours / 24);
  return `${days}d left`;
}
function PollCard({ poll, index }) {
  var _a;
  const { data: hasVoted, isLoading: votedLoading } = useHasVoted(poll.id);
  const [localVotedFace, setLocalVotedFace] = reactExports.useState(null);
  const [localTallies, setLocalTallies] = reactExports.useState(
    null
  );
  const prevPollIdRef = reactExports.useRef(poll.id);
  if (prevPollIdRef.current !== poll.id) {
    prevPollIdRef.current = poll.id;
    setLocalVotedFace(null);
    setLocalTallies(null);
  }
  const showResults = hasVoted || localVotedFace !== null;
  const tallies = localTallies ?? poll.votes;
  const totalVotes = localTallies ? localTallies.reduce((s, t) => s + t.count, 0n) : poll.totalVotes;
  const categoryInfo = CATEGORY_LABELS.find(
    (c) => c.value === poll.category
  );
  const timeLeft = formatTimeLeft(poll.expiresAt);
  const isEnded = timeLeft === "Ended";
  const winnerFaceNum = tallies.length > 0 ? Number(
    (_a = [...tallies].sort((a, b) => Number(b.count) - Number(a.count))[0]) == null ? void 0 : _a.faceNumber
  ) : -1;
  function handleVoted(faceNumber, newTallies) {
    setLocalVotedFace(faceNumber);
    setLocalTallies(newTallies);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-full flex flex-col",
      "data-ocid": `feed.poll_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 overflow-hidden bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: poll.photoUrl,
              alt: `Poll ${poll.id}`,
              className: "w-full h-full object-cover",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-display font-bold bg-black/70 text-foreground border border-white/10 backdrop-blur-sm", children: [
            (categoryInfo == null ? void 0 : categoryInfo.emoji) ?? "🏆",
            " ",
            (categoryInfo == null ? void 0 : categoryInfo.label) ?? "Poll"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 z-10 flex flex-col items-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-semibold backdrop-blur-sm border",
                  isEnded ? "bg-muted/70 text-muted-foreground border-border/40" : "bg-primary/20 text-primary border-primary/40"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
                  timeLeft
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-white/70 font-body", children: [
              Number(totalVotes).toLocaleString(),
              " votes"
            ] })
          ] }),
          poll.faceMarkers.map((marker) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            FaceBadge,
            {
              marker,
              isVoted: localVotedFace === Number(marker.faceNumber),
              isWinner: showResults && Number(marker.faceNumber) === winnerFaceNum,
              showRing: showResults,
              size: "lg"
            },
            `badge-${Number(marker.faceNumber)}`
          )),
          poll.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-3 right-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-sm font-body line-clamp-2 [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]", children: poll.caption }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-t border-border/40 px-3 pt-3 pb-3 flex-shrink-0", children: [
          votedLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" }) }) : showResults ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResultsReveal,
            {
              tallies,
              votedFace: localVotedFace,
              totalVotes
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            VoteButtons,
            {
              pollId: poll.id,
              faceCount: poll.faceMarkers.length || 4,
              onVoted: handleVoted
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 text-muted-foreground opacity-50 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 13 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-body", children: "Swipe for next" })
          ] })
        ] })
      ]
    }
  );
}
function EmptyFeed() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 px-8 text-center",
      "data-ocid": "feed.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "📸" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-2xl text-foreground", children: "No polls yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm max-w-xs", children: "Be the first to upload a group photo and start a FaceOff!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/upload",
            "data-ocid": "feed.upload_cta_button",
            className: "inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-bold px-8 py-3 rounded-2xl shadow-[0_0_20px_oklch(0.68_0.28_310/0.5)] hover:shadow-[0_0_28px_oklch(0.68_0.28_310/0.7)] transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 18 }),
              "Upload First Photo"
            ]
          }
        )
      ]
    }
  );
}
function LoginPrompt() {
  const { login, isLoggingIn, isInitializing } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6 text-center",
      "data-ocid": "feed.login_prompt",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "🔥" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-3xl text-foreground mb-2", children: [
          "Join ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Face" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Off" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-8 max-w-xs", children: "Sign in to vote, upload, and see who the public thinks wins every matchup." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: login,
            disabled: isLoggingIn || isInitializing,
            className: "vote-button w-full max-w-xs text-base py-4 disabled:opacity-50 pulse-scale",
            "data-ocid": "feed.login_button",
            children: isLoggingIn ? "Opening login…" : "Sign In with Internet Identity"
          }
        )
      ]
    }
  );
}
function SnapFeedItem({ pollId, index }) {
  const { data: poll, isLoading } = usePoll(pollId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "snap-start flex-shrink-0 w-full h-full",
      "data-ocid": `feed.poll_item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full max-w-md mx-auto flex flex-col overflow-hidden", children: isLoading || !poll ? /* @__PURE__ */ jsxRuntimeExports.jsx(FeedCardSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(PollCard, { poll, index }) })
    }
  );
}
function FeedPage() {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePublicFeed();
  const sentinelRef = reactExports.useRef(null);
  const summaries = (data == null ? void 0 : data.pages.flat()) ?? [];
  reactExports.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        var _a;
        if (((_a = entries[0]) == null ? void 0 : _a.isIntersecting) && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPrompt, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "h-[calc(100vh-7rem)] overflow-y-scroll snap-y snap-mandatory",
      "data-ocid": "feed.page",
      style: { scrollbarWidth: "none", msOverflowStyle: "none" },
      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "snap-start w-full h-full flex items-start justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedCardSkeleton, {}) }) }) : summaries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "snap-start w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyFeed, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        summaries.map((summary, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SnapFeedItem, { pollId: summary.id, index: i }, summary.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: sentinelRef,
            className: "snap-start h-2 w-full",
            "data-ocid": "feed.load_more_sentinel"
          }
        ),
        isFetchingNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "snap-start w-full h-full flex items-center justify-center",
            "data-ocid": "feed.loading_more",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" })
          }
        )
      ] })
    }
  ) });
}
export {
  FeedPage as default
};
