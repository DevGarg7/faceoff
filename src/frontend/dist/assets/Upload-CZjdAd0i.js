import { r as reactExports, j as jsxRuntimeExports, c as cn, e as useAuth, u as useActor, a as useQueryClient, f as useNavigate, P as PollCategory, b as ue, d as createActor } from "./index-ovTHFw25.js";
import { c as createLucideIcon, L as Layout } from "./Layout-DFJinAMo.js";
import { X, B as Button } from "./index-43L81i9Q.js";
import { U as Upload } from "./upload-B6lEwFMV.js";
import { L as Label } from "./label-Cl6Vgd0a.js";
import { C as CATEGORY_LABELS, D as DURATION_OPTIONS } from "./index-PB1pKDI7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
];
const Rocket = createLucideIcon("rocket", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
];
const Undo2 = createLucideIcon("undo-2", __iconNode);
const FACE_COLORS = [
  {
    bg: "bg-primary",
    text: "text-primary-foreground",
    ring: "ring-primary",
    hex: "oklch(0.68 0.28 310)"
  },
  {
    bg: "bg-accent",
    text: "text-accent-foreground",
    ring: "ring-accent",
    hex: "oklch(0.7 0.26 200)"
  },
  {
    bg: "bg-primary",
    text: "text-primary-foreground",
    ring: "ring-accent",
    hex: "oklch(0.68 0.28 310)"
  },
  {
    bg: "bg-accent",
    text: "text-accent-foreground",
    ring: "ring-primary",
    hex: "oklch(0.7 0.26 200)"
  }
];
function FaceMarkerEditor({
  photoUrl,
  markers,
  onMarkersChange
}) {
  const containerRef = reactExports.useRef(null);
  const handleTap = reactExports.useCallback(
    (e) => {
      var _a, _b, _c, _d;
      if (markers.length >= 4) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      let clientX;
      let clientY;
      if ("touches" in e) {
        clientX = ((_a = e.touches[0]) == null ? void 0 : _a.clientX) ?? ((_b = e.changedTouches[0]) == null ? void 0 : _b.clientX) ?? 0;
        clientY = ((_c = e.touches[0]) == null ? void 0 : _c.clientY) ?? ((_d = e.changedTouches[0]) == null ? void 0 : _d.clientY) ?? 0;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const xPercent = (clientX - rect.left) / rect.width * 100;
      const yPercent = (clientY - rect.top) / rect.height * 100;
      const next = {
        faceNumber: BigInt(markers.length + 1),
        xPercent,
        yPercent
      };
      onMarkersChange([...markers, next]);
    },
    [markers, onMarkersChange]
  );
  const removeLast = () => {
    if (markers.length === 0) return;
    onMarkersChange(markers.slice(0, -1));
  };
  const resetAll = () => onMarkersChange([]);
  const nextNum = markers.length + 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: markers.length < 4 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-8 h-8 rounded-full font-display font-black text-sm bg-primary text-primary-foreground ring-2 ring-accent shadow-lg", children: nextNum }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-body text-foreground", children: [
          "Tap face #",
          nextNum,
          " on the photo"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body text-accent font-semibold", children: "All 4 faces marked ✓" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: removeLast,
            disabled: markers.length === 0,
            "aria-label": "Undo last marker",
            "data-ocid": "marker.undo_button",
            className: "p-2 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-30 transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { size: 16, className: "text-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: resetAll,
            disabled: markers.length === 0,
            "aria-label": "Reset all markers",
            "data-ocid": "marker.reset_button",
            className: "p-2 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-30 transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 16, className: "text-foreground" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: containerRef,
        role: "img",
        "aria-label": "Tap on a face to place a number marker",
        tabIndex: markers.length < 4 ? 0 : -1,
        onClick: handleTap,
        onTouchEnd: (e) => {
          e.preventDefault();
          handleTap(e);
        },
        onKeyDown: (e) => {
          if ((e.key === "Enter" || e.key === " ") && containerRef.current && markers.length < 4) {
            e.preventDefault();
            const rect = containerRef.current.getBoundingClientRect();
            const synth = {
              clientX: rect.left + rect.width / 2,
              clientY: rect.top + rect.height / 2
            };
            handleTap(synth);
          }
        },
        "data-ocid": "marker.canvas_target",
        className: "relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted select-none cursor-crosshair",
        style: {
          touchAction: markers.length >= 4 ? "auto" : "none"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: photoUrl,
              alt: "Mark faces",
              className: "w-full h-full object-cover pointer-events-none",
              draggable: false
            }
          ),
          markers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/70 backdrop-blur-sm rounded-2xl px-5 py-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "Tap faces to number them" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Start with face #1" })
          ] }) }),
          markers.map((marker) => {
            const idx = Number(marker.faceNumber) - 1;
            const color = FACE_COLORS[idx] ?? FACE_COLORS[0];
            const markerKey = `face-${Number(marker.faceNumber)}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full font-display font-black text-xl flex items-center justify-center shadow-xl ring-[3px] pointer-events-none fade-in ${color.bg} ${color.text} ${color.ring}`,
                style: {
                  left: `${marker.xPercent}%`,
                  top: `${marker.yPercent}%`,
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)"
                },
                "aria-label": `Face ${Number(marker.faceNumber)}`,
                children: Number(marker.faceNumber)
              },
              markerKey
            );
          })
        ]
      }
    ),
    markers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: markers.map((marker) => {
      const idx = Number(marker.faceNumber) - 1;
      const color = FACE_COLORS[idx] ?? FACE_COLORS[0];
      const legendKey = `legend-${Number(marker.faceNumber)}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold ${color.bg} ${color.text}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-black", children: [
              "#",
              Number(marker.faceNumber)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-80", children: [
              Math.round(marker.xPercent),
              "%,",
              Math.round(marker.yPercent),
              "%"
            ] })
          ]
        },
        legendKey
      );
    }) }),
    markers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-destructive font-body", children: "Place at least 1 marker to continue." })
  ] });
}
const STORAGE_GATEWAY_URL = "";
function PhotoUploader({
  onPhotoReady,
  previewUrl,
  onClear,
  uploadProgress
}) {
  const fileRef = reactExports.useRef(null);
  const cameraRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const handleFile = reactExports.useCallback(
    (file) => {
      if (!file) return;
      if (!file.type.match(/image\/(jpeg|png)/)) return;
      if (file.size > 10 * 1024 * 1024) return;
      const url = URL.createObjectURL(file);
      onPhotoReady(file, url);
    },
    [onPhotoReady]
  );
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFile(e.dataTransfer.files[0] ?? null);
    },
    [handleFile]
  );
  if (previewUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: previewUrl,
            alt: "Selected group",
            className: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClear,
            className: "absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-card transition-smooth shadow-lg",
            "aria-label": "Remove photo",
            "data-ocid": "photo.remove_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, className: "text-foreground" })
          }
        ),
        uploadProgress !== null && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body text-foreground", children: "Uploading..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-display font-bold text-primary", children: [
              Math.round(uploadProgress),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary rounded-full transition-all duration-300",
              style: { width: `${uploadProgress}%` }
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground font-body", children: "Photo ready — next, number the faces." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = fileRef.current) == null ? void 0 : _a.click();
        },
        onDrop: handleDrop,
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        "data-ocid": "photo.dropzone",
        className: cn(
          "flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl w-full aspect-[4/3] cursor-pointer transition-smooth",
          isDragging ? "border-primary bg-primary/10 scale-[1.01]" : "border-border hover:border-primary/60 hover:bg-primary/5"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-16 h-16 rounded-full flex items-center justify-center transition-smooth",
                isDragging ? "bg-primary/20" : "bg-muted"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Upload,
                {
                  size: 28,
                  className: isDragging ? "text-primary" : "text-muted-foreground"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "Drag & drop or tap to upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "JPG or PNG · Max 4 faces · Up to 10MB" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = cameraRef.current) == null ? void 0 : _a.click();
        },
        "data-ocid": "photo.camera_button",
        className: "flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-accent/40 bg-accent/5 hover:bg-accent/10 hover:border-accent/60 transition-smooth",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 18, className: "text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-semibold text-accent", children: "Use Camera" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/jpeg,image/png",
        className: "hidden",
        onChange: (e) => {
          var _a;
          return handleFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
        },
        "data-ocid": "photo.file_input"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: cameraRef,
        type: "file",
        accept: "image/jpeg,image/png",
        capture: "environment",
        className: "hidden",
        onChange: (e) => {
          var _a;
          return handleFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
        },
        "data-ocid": "photo.camera_input"
      }
    )
  ] });
}
async function uploadPhotoWithProgress(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        onProgress(e.loaded / e.total * 100);
      }
    });
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve(data.url);
      } else {
        reject(new Error("Upload failed"));
      }
    });
    xhr.addEventListener("error", () => reject(new Error("Upload failed")));
    xhr.open("POST", `${STORAGE_GATEWAY_URL}/upload`);
    xhr.send(formData);
  });
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function PollForm({
  markers,
  category,
  duration,
  caption,
  consent,
  isSubmitting,
  onCategoryChange,
  onDurationChange,
  onCaptionChange,
  onConsentChange,
  onSubmit
}) {
  const canPublish = consent && !isSubmitting && markers.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display font-semibold text-sm text-foreground", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 gap-2",
          "data-ocid": "poll.category_select",
          children: CATEGORY_LABELS.map(({ value, label, emoji }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onCategoryChange(value),
              "data-ocid": `poll.category.${value}`,
              className: cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-left transition-smooth",
                category === value ? "border-primary bg-primary/10 text-foreground" : "border-border bg-muted text-muted-foreground hover:border-primary/40"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-medium truncate", children: label })
              ]
            },
            value
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display font-semibold text-sm text-foreground", children: "Poll Duration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-4 gap-2",
          "data-ocid": "poll.duration_select",
          children: DURATION_OPTIONS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onDurationChange(value),
              "data-ocid": `poll.duration.${value}`,
              className: cn(
                "py-2.5 rounded-xl border-2 text-xs font-body font-semibold text-center transition-smooth",
                duration === value ? "border-accent bg-accent/10 text-foreground" : "border-border bg-muted text-muted-foreground hover:border-accent/40"
              ),
              children: label
            },
            value
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Label,
        {
          htmlFor: "poll-caption",
          className: "font-display font-semibold text-sm text-foreground",
          children: [
            "Caption",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "poll-caption",
            value: caption,
            onChange: (e) => onCaptionChange(e.target.value),
            placeholder: "e.g. Trip to Goa. Who wins?",
            maxLength: 150,
            rows: 2,
            className: "bg-muted border-border resize-none pr-14",
            "data-ocid": "poll.caption_textarea"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-2 right-3 text-xs text-muted-foreground font-body pointer-events-none", children: [
          caption.length,
          "/150"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "flex items-start gap-3 p-4 rounded-xl border-2 transition-smooth",
          consent ? "border-accent/40 bg-accent/5" : "border-destructive/30 bg-destructive/5"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "consent",
              checked: consent,
              onChange: (e) => onConsentChange(e.target.checked),
              className: "w-4 h-4 mt-0.5 accent-primary flex-shrink-0",
              "data-ocid": "poll.consent_checkbox"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "consent",
              className: "font-body text-xs text-muted-foreground cursor-pointer leading-relaxed",
              children: "I confirm all people in this photo have consented to be included in a public vote."
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        disabled: !canPublish,
        onClick: onSubmit,
        className: "w-full py-4 text-base font-display font-bold disabled:opacity-40",
        "data-ocid": "poll.submit_button",
        children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }),
          "Creating Face-Off…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { size: 18 }),
          "Launch Face-Off"
        ] })
      }
    )
  ] });
}
const STEPS = [
  { num: 1, label: "Photo" },
  { num: 2, label: "Number Faces" },
  { num: 3, label: "Poll Settings" }
];
function StepIndicator({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center justify-center gap-0 mb-8",
      "aria-label": "Progress steps",
      children: STEPS.map((step, idx) => {
        const isDone = current > step.num;
        const isActive = current === step.num;
        const stepKey = `step-${step.num}`;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm border-2 transition-smooth",
                  isDone ? "bg-accent border-accent text-accent-foreground" : isActive ? "bg-primary border-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted border-border text-muted-foreground"
                ),
                children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, strokeWidth: 3 }) : step.num
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-[10px] font-body font-medium leading-none",
                  isActive ? "text-foreground" : "text-muted-foreground"
                ),
                children: step.label
              }
            )
          ] }),
          idx < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-12 h-0.5 mx-1 mb-4 rounded-full transition-smooth",
                current > step.num ? "bg-accent" : "bg-border"
              )
            }
          )
        ] }, stepKey);
      })
    }
  );
}
function UploadPage() {
  const { isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(1);
  const [photo, setPhoto] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const [markers, setMarkers] = reactExports.useState([]);
  const [category, setCategory] = reactExports.useState(
    PollCategory.mostHandsome
  );
  const [duration, setDuration] = reactExports.useState(24);
  const [caption, setCaption] = reactExports.useState("");
  const [consent, setConsent] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const handlePhotoReady = (file, url) => {
    setPhoto(file);
    setPreviewUrl(url);
    setMarkers([]);
  };
  const handleClearPhoto = () => {
    setPhoto(null);
    setPreviewUrl(null);
    setMarkers([]);
    setUploadProgress(null);
  };
  const goToStep2 = () => {
    if (!photo || !previewUrl) return;
    setStep(2);
  };
  const goToStep3 = () => {
    if (markers.length === 0) return;
    setStep(3);
  };
  const handlePublish = async () => {
    if (!photo || !actor || !consent || markers.length === 0) return;
    setIsSubmitting(true);
    try {
      setUploadProgress(0);
      const photoUrl = await uploadPhotoWithProgress(photo, (pct) => {
        setUploadProgress(pct);
      });
      setUploadProgress(100);
      const result = await actor.createPoll(
        photoUrl,
        markers,
        category,
        BigInt(duration),
        caption.trim() || null,
        false
      );
      if (result.__kind__ === "ok") {
        ue.success("Face-Off is live! 🔥", {
          description: "Public voting has started."
        });
        queryClient.invalidateQueries({ queryKey: ["publicFeed"] });
        queryClient.invalidateQueries({ queryKey: ["myPolls"] });
        navigate({ to: "/dashboard" });
      } else {
        ue.error("Failed to create poll", { description: result.err });
      }
    } catch {
      ue.error("Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-6",
        "data-ocid": "upload.unauthenticated_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground mb-2", children: "Sign in to create a Face-Off" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Use the Sign In button at the top to get started." })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-4 py-6", "data-ocid": "upload.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-black text-2xl text-foreground", children: [
        "Create a ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Face" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Off" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mt-1", children: "Upload a group photo and let the public decide." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 slide-up", "data-ocid": "upload.step1_panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PhotoUploader,
        {
          onPhotoReady: handlePhotoReady,
          previewUrl,
          onClear: handleClearPhoto,
          uploadProgress
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          disabled: !photo,
          onClick: goToStep2,
          "data-ocid": "upload.next_step1_button",
          className: cn(
            "w-full py-3.5 rounded-xl font-display font-bold text-sm transition-smooth",
            photo ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
          ),
          children: "Next: Number the Faces →"
        }
      )
    ] }),
    step === 2 && previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 slide-up", "data-ocid": "upload.step2_panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FaceMarkerEditor,
        {
          photoUrl: previewUrl,
          markers,
          onMarkersChange: setMarkers
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setStep(1),
            "data-ocid": "upload.back_step2_button",
            className: "flex-1 py-3.5 rounded-xl font-display font-semibold text-sm border-2 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-smooth",
            children: "← Back"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            disabled: markers.length === 0,
            onClick: goToStep3,
            "data-ocid": "upload.next_step2_button",
            className: cn(
              "flex-[2] py-3.5 rounded-xl font-display font-bold text-sm transition-smooth",
              markers.length > 0 ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            ),
            children: "Next: Poll Settings →"
          }
        )
      ] })
    ] }),
    step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 slide-up", "data-ocid": "upload.step3_panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PollForm,
        {
          markers,
          category,
          duration,
          caption,
          consent,
          isSubmitting,
          onCategoryChange: setCategory,
          onDurationChange: setDuration,
          onCaptionChange: setCaption,
          onConsentChange: setConsent,
          onSubmit: handlePublish
        }
      ),
      !isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setStep(2),
          "data-ocid": "upload.back_step3_button",
          className: "w-full py-3 rounded-xl font-display font-semibold text-sm border-2 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-smooth",
          children: "← Back to Face Numbering"
        }
      )
    ] })
  ] }) });
}
export {
  UploadPage as default
};
