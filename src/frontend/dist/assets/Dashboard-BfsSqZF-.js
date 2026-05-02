import { r as reactExports, j as jsxRuntimeExports, c as cn, S as Skeleton, e as useAuth, L as Link, D as DashboardCardSkeleton } from "./index-ovTHFw25.js";
import { c as createLucideIcon, L as Layout, C as ChartColumn } from "./Layout-DFJinAMo.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-BkN__AwS.js";
import { S as Slot, c as cva, u as useComposedRefs$1, P as Primitive$1, B as Button, X } from "./index-43L81i9Q.js";
import { c as usePollResults, T as Trophy, C as Clock, b as usePoll, d as useMyPolls } from "./use-polls-y0ZEKFc4.js";
import { C as CATEGORY_LABELS } from "./index-PB1pKDI7.js";
import { P as Primitive, a as Presence, c as createContextScope, b as composeEventHandlers, u as useCallbackRef, d as useLayoutEffect2 } from "./index-nyPqY74B.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function VoteBar({ tally, rank, isWinner, delay = 0 }) {
  const pct = Math.round(tally.percentage * 100) / 100;
  const faceNum = Number(tally.faceNumber);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", "data-ocid": `vote_bar.face_${faceNum}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "w-6 h-6 rounded-full flex items-center justify-center font-display font-bold text-xs",
              isWinner ? "bg-primary text-primary-foreground ring-2 ring-accent" : "bg-secondary text-secondary-foreground"
            ),
            children: faceNum
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-body text-muted-foreground", children: [
          "Face ",
          faceNum
        ] }),
        isWinner && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-display font-bold text-accent uppercase tracking-wider", children: "👑 Winner" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-display font-bold text-accent", children: [
          pct.toFixed(1),
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-body", children: [
          Number(tally.count),
          " votes"
        ] }),
        rank === 1 && !isWinner && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-body text-muted-foreground", children: [
          "#",
          rank
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-secondary rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { width: 0 },
        animate: { width: `${pct}%` },
        transition: { duration: 0.7, delay, ease: "easeOut" },
        className: cn(
          "h-full rounded-full",
          isWinner ? "bg-primary" : "bg-accent/60"
        )
      }
    ) })
  ] });
}
function MiniVoteBar({ tallies }) {
  if (!tallies.length) return null;
  const sorted = [...tallies].sort((a, b) => Number(b.count) - Number(a.count));
  const total = sorted.reduce((s, t) => s + Number(t.count), 0);
  if (total === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 h-1.5 rounded-full overflow-hidden w-full", children: sorted.map((t) => {
    const pct = Number(t.count) / total * 100;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "h-full",
          Number(t.faceNumber) === Number(sorted[0].faceNumber) ? "bg-primary" : "bg-accent/50"
        ),
        style: { width: `${pct}%` }
      },
      `face-${Number(t.faceNumber)}`
    );
  }) });
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function timeLeft$1(expiresAt) {
  const ms = Number(expiresAt) / 1e9 - Date.now() / 1e3;
  if (ms <= 0) return "Ended";
  const h = Math.floor(ms / 3600);
  if (h > 24) return `${Math.floor(h / 24)}d left`;
  if (h > 0) return `${h}h left`;
  const m = Math.floor(ms % 3600 / 60);
  return `${m}m left`;
}
function MyPollCard({ poll, index, onClick }) {
  const category = CATEGORY_LABELS.find(
    (c) => c.value === poll.category
  );
  const ended = Number(poll.expiresAt) / 1e9 < Date.now() / 1e3;
  const { data: tallies } = usePollResults(poll.id);
  const sortedTallies = tallies ? [...tallies].sort((a, b) => Number(b.count) - Number(a.count)) : [];
  const winnerFace = ended && sortedTallies.length > 0 ? Number(sortedTallies[0].faceNumber) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.06 },
      whileHover: { scale: 1.01 },
      whileTap: { scale: 0.98 },
      onClick,
      className: "poll-card w-full text-left flex gap-3 p-3 cursor-pointer hover:border-primary/40 transition-smooth",
      "data-ocid": `dashboard.poll_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-20 rounded-xl overflow-hidden bg-muted shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: poll.photoUrl,
              alt: "Poll",
              className: "w-full h-full object-cover"
            }
          ),
          ended && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-card/50" }),
          winnerFace !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1 right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-1 ring-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-[11px] text-primary-foreground", children: winnerFace }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col justify-between py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-sm text-foreground truncate", children: [
                category == null ? void 0 : category.emoji,
                " ",
                category == null ? void 0 : category.label
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: cn(
                    "text-[9px] font-display font-bold uppercase tracking-wider shrink-0 border",
                    ended ? "text-muted-foreground border-border" : "text-primary border-primary/40 bg-primary/10"
                  ),
                  children: ended ? "Ended" : "● Active"
                }
              )
            ] }),
            poll.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body line-clamp-1", children: poll.caption })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 10, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-bold text-primary", children: Number(poll.totalVotes).toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-body", children: "votes" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: ended ? winnerFace !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 10, className: "text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-body text-accent", children: [
                  "Face ",
                  winnerFace,
                  " won"
                ] })
              ] }) : null : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10, className: "text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-body", children: timeLeft$1(poll.expiresAt) })
              ] }) })
            ] }),
            sortedTallies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MiniVoteBar, { tallies: sortedTallies })
          ] })
        ] })
      ]
    }
  );
}
var DirectionContext = reactExports.createContext(void 0);
function useDirection(localDir) {
  const globalDir = reactExports.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const [scrollbarX, setScrollbarX] = reactExports.useState(null);
    const [scrollbarY, setScrollbarY] = reactExports.useState(null);
    const [cornerWidth, setCornerWidth] = reactExports.useState(0);
    const [cornerHeight, setCornerHeight] = reactExports.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
    const composedRefs = useComposedRefs$1(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs$1(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  reactExports.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  reactExports.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = reactExports.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = reactExports.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs2 = useComposedRefs$1(forwardedRef, ref, context.onScrollbarXChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs2,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs2 = useComposedRefs$1(forwardedRef, ref, context.onScrollbarYChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs2,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs2 = useComposedRefs$1(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs2,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs$1(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    reactExports.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return reactExports.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root$1 = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root$1,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive$1.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function timeLeft(expiresAt) {
  const ms = Number(expiresAt) / 1e9 - Date.now() / 1e3;
  if (ms <= 0) return "Ended";
  const h = Math.floor(ms / 3600);
  if (h > 24) return `${Math.floor(h / 24)}d left`;
  if (h > 0) return `${h}h left`;
  const m = Math.floor(ms % 3600 / 60);
  return `${m}m left`;
}
function PollDetailModal({ poll, onClose }) {
  const { data: pollDetail, isLoading: loadingDetail } = usePoll(
    (poll == null ? void 0 : poll.id) ?? ""
  );
  const { data: tallies, isLoading: loadingTallies } = usePollResults(
    (poll == null ? void 0 : poll.id) ?? ""
  );
  reactExports.useEffect(() => {
    if (!poll) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [poll, onClose]);
  const category = CATEGORY_LABELS.find(
    (c) => poll && c.value === poll.category
  );
  const sortedTallies = tallies ? [...tallies].sort((a, b) => Number(b.count) - Number(a.count)) : [];
  const ended = poll ? Number(poll.expiresAt) / 1e9 < Date.now() / 1e3 : false;
  const winnerFace = ended && sortedTallies.length > 0 ? Number(sortedTallies[0].faceNumber) : null;
  const totalVotes = sortedTallies.reduce((s, t) => s + Number(t.count), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: poll && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-40",
        "data-ocid": "poll_detail.backdrop"
      },
      "backdrop"
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { type: "spring", damping: 28, stiffness: 300 },
        className: "fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-card border border-border border-b-0 rounded-t-3xl overflow-hidden",
        style: { maxHeight: "88vh" },
        "data-ocid": "poll_detail.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center pt-3 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-border" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: category == null ? void 0 : category.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: category == null ? void 0 : category.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: cn(
                    "text-[9px] font-display font-bold uppercase tracking-wider border",
                    ended ? "text-muted-foreground border-border" : "text-primary border-primary/40 bg-primary/10"
                  ),
                  children: ended ? "Ended" : "● Active"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: onClose,
                className: "rounded-full w-8 h-8 text-muted-foreground hover:text-foreground",
                "data-ocid": "poll_detail.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScrollArea,
            {
              className: "overflow-auto",
              style: { maxHeight: "calc(88vh - 80px)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-2xl overflow-hidden bg-muted", children: loadingDetail ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[4/3]" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: poll.photoUrl,
                      alt: "Poll",
                      className: "w-full aspect-[4/3] object-cover"
                    }
                  ),
                  pollDetail == null ? void 0 : pollDetail.faceMarkers.map((marker) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute",
                      style: {
                        left: `${marker.xPercent}%`,
                        top: `${marker.yPercent}%`,
                        transform: "translate(-50%, -50%)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: cn(
                            "w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm shadow-lg ring-2",
                            winnerFace === Number(marker.faceNumber) ? "bg-primary text-primary-foreground ring-accent" : "bg-card/90 text-foreground ring-border"
                          ),
                          children: Number(marker.faceNumber)
                        }
                      )
                    },
                    `marker-${Number(marker.faceNumber)}`
                  ))
                ] }) }),
                poll.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground", children: poll.caption }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-xl text-primary", children: totalVotes.toLocaleString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: "total votes" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4" }),
                  ended ? winnerFace !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body text-muted-foreground", children: "Winner:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-accent text-sm", children: [
                      "Face ",
                      winnerFace,
                      " 👑"
                    ] })
                  ] }) : null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body text-muted-foreground", children: "Time left:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: timeLeft(poll.expiresAt) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm text-foreground mb-3", children: "Vote Breakdown" }),
                  loadingTallies ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }, k)) }) : sortedTallies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body text-center py-4", children: "No votes yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sortedTallies.map((tally, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    VoteBar,
                    {
                      tally,
                      rank: i + 1,
                      isWinner: ended && i === 0 && Number(tally.count) > 0,
                      delay: i * 0.1
                    },
                    `tally-${Number(tally.faceNumber)}`
                  )) })
                ] })
              ] })
            }
          )
        ]
      },
      "sheet"
    )
  ] }) });
}
function StatCard({
  label,
  value,
  icon: Icon,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "w-9 h-9 rounded-xl flex items-center justify-center",
          color
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, className: "text-foreground" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-2xl text-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-body", children: label })
  ] });
}
function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const { data: polls, isLoading, refetch, isFetching } = useMyPolls();
  const [selectedPoll, setSelectedPoll] = reactExports.useState(null);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Sign in to see your dashboard." }) }) });
  }
  const allPolls = polls ?? [];
  const totalVotes = allPolls.reduce((s, p) => s + Number(p.totalVotes), 0);
  const activePolls = allPolls.filter(
    (p) => Number(p.expiresAt) / 1e9 > Date.now() / 1e3
  ).length;
  const endedWithWinner = allPolls.filter(
    (p) => Number(p.expiresAt) / 1e9 < Date.now() / 1e3 && p.leadingFace !== void 0
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-4 py-6", "data-ocid": "dashboard.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl text-foreground", children: "My Polls" }),
            allPolls.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/20 text-primary border-primary/30 font-display font-bold", children: allPolls.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm", children: "Track your face-off results" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => refetch(),
              disabled: isFetching,
              className: "w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth disabled:opacity-50",
              "data-ocid": "dashboard.refresh_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  size: 14,
                  className: cn(isFetching && "animate-spin")
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/upload",
              className: "flex items-center gap-1.5 text-sm font-body font-semibold px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-smooth",
              "data-ocid": "dashboard.create_poll_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 14 }),
                "New Poll"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Polls Created",
            value: allPolls.length,
            icon: ChartColumn,
            color: "bg-primary/20"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Votes",
            value: totalVotes >= 1e3 ? `${(totalVotes / 1e3).toFixed(1)}k` : totalVotes,
            icon: Trophy,
            color: "bg-accent/20"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Active Now",
            value: activePolls,
            icon: Clock,
            color: "bg-secondary"
          }
        )
      ] }),
      endedWithWinner > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 14, className: "text-primary shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-body text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: endedWithWinner }),
          " ",
          endedWithWinner === 1 ? "poll" : "polls",
          " with a clear winner"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: "Your Polls" }),
        activePolls > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-display font-bold uppercase tracking-widest text-primary", children: [
          activePolls,
          " live"
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "dashboard.loading_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardCardSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardCardSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardCardSkeleton, {})
      ] }) : allPolls.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "dashboard.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0.8, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                className: "text-6xl mb-4",
                children: "📊"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-1", children: "No polls yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mb-6 max-w-[200px]", children: "Create your first face-off and watch the votes roll in." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/upload",
                className: "vote-button inline-flex items-center gap-2",
                "data-ocid": "dashboard.create_first_poll_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 16 }),
                  "Create a Poll"
                ]
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", "data-ocid": "dashboard.polls_list", children: allPolls.map((poll, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        MyPollCard,
        {
          poll,
          index: i,
          onClick: () => setSelectedPoll(poll)
        },
        poll.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PollDetailModal,
      {
        poll: selectedPoll,
        onClose: () => setSelectedPoll(null)
      }
    )
  ] });
}
export {
  DashboardPage as default
};
