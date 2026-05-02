import { r as reactExports, s as useLocation, e as useAuth, j as jsxRuntimeExports, L as Link, c as cn } from "./index-ovTHFw25.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const SquarePlus = createLucideIcon("square-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const NAV_ITEMS = [
  { to: "/", icon: House, label: "Feed", ocid: "nav.feed_tab" },
  {
    to: "/upload",
    icon: SquarePlus,
    label: "Create Poll",
    ocid: "nav.upload_tab"
  },
  {
    to: "/dashboard",
    icon: ChartColumn,
    label: "Dashboard",
    ocid: "nav.dashboard_tab"
  },
  { to: "/profile", icon: User, label: "Profile", ocid: "nav.profile_tab" }
];
function Layout({ children, hideNav = false }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 bg-card border-b border-border flex items-center justify-between px-4 h-14 shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          className: "flex items-center gap-1",
          "data-ocid": "nav.logo_link",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-black text-2xl tracking-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Face" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Off" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/profile",
          className: "text-xs font-body font-semibold text-primary border border-primary rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-smooth",
          "data-ocid": "nav.login_link",
          children: "Sign In"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pt-14 pb-20 bg-background", children }),
    hideNav && /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "py-3 text-center bg-muted/40 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
      "Powered by",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "underline hover:text-foreground transition-colors duration-200",
          children: "caffeine.ai"
        }
      )
    ] }) }),
    !hideNav && /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-around h-16 max-w-lg mx-auto", children: NAV_ITEMS.map(({ to, icon: Icon2, label, ocid }) => {
        const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to,
            "data-ocid": ocid,
            className: cn(
              "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-smooth min-w-0",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon2,
                {
                  size: 22,
                  strokeWidth: isActive ? 2.5 : 1.8,
                  className: cn(
                    isActive && "drop-shadow-[0_0_6px_oklch(0.68_0.28_310/0.7)]"
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-body font-medium leading-none truncate", children: label })
            ]
          },
          to
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-1 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground/60 font-body", children: [
        "Built with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "underline hover:text-muted-foreground transition-colors duration-200",
            children: "caffeine.ai"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  ChartColumn as C,
  Layout as L,
  User as U,
  createLucideIcon as c
};
