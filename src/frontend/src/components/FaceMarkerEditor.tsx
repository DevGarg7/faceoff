import type { FaceMarker } from "@/types";
import { RotateCcw, Undo2 } from "lucide-react";
import { useCallback, useRef } from "react";

const FACE_COLORS = [
  {
    bg: "bg-primary",
    text: "text-primary-foreground",
    ring: "ring-primary",
    hex: "oklch(0.68 0.28 310)",
  },
  {
    bg: "bg-accent",
    text: "text-accent-foreground",
    ring: "ring-accent",
    hex: "oklch(0.7 0.26 200)",
  },
  {
    bg: "bg-primary",
    text: "text-primary-foreground",
    ring: "ring-accent",
    hex: "oklch(0.68 0.28 310)",
  },
  {
    bg: "bg-accent",
    text: "text-accent-foreground",
    ring: "ring-primary",
    hex: "oklch(0.7 0.26 200)",
  },
];

interface FaceMarkerEditorProps {
  photoUrl: string;
  markers: FaceMarker[];
  onMarkersChange: (markers: FaceMarker[]) => void;
}

export function FaceMarkerEditor({
  photoUrl,
  markers,
  onMarkersChange,
}: FaceMarkerEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTap = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    ) => {
      if (markers.length >= 4) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      let clientX: number;
      let clientY: number;
      if ("touches" in e) {
        clientX = e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX ?? 0;
        clientY = e.touches[0]?.clientY ?? e.changedTouches[0]?.clientY ?? 0;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const xPercent = ((clientX - rect.left) / rect.width) * 100;
      const yPercent = ((clientY - rect.top) / rect.height) * 100;
      const next: FaceMarker = {
        faceNumber: BigInt(markers.length + 1),
        xPercent,
        yPercent,
      };
      onMarkersChange([...markers, next]);
    },
    [markers, onMarkersChange],
  );

  const removeLast = () => {
    if (markers.length === 0) return;
    onMarkersChange(markers.slice(0, -1));
  };

  const resetAll = () => onMarkersChange([]);

  const nextNum = markers.length + 1;

  return (
    <div className="space-y-4">
      {/* Instruction bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {markers.length < 4 ? (
            <>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-display font-black text-sm bg-primary text-primary-foreground ring-2 ring-accent shadow-lg">
                {nextNum}
              </span>
              <span className="text-sm font-body text-foreground">
                Tap face #{nextNum} on the photo
              </span>
            </>
          ) : (
            <span className="text-sm font-body text-accent font-semibold">
              All 4 faces marked ✓
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={removeLast}
            disabled={markers.length === 0}
            aria-label="Undo last marker"
            data-ocid="marker.undo_button"
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-30 transition-smooth"
          >
            <Undo2 size={16} className="text-foreground" />
          </button>
          <button
            type="button"
            onClick={resetAll}
            disabled={markers.length === 0}
            aria-label="Reset all markers"
            data-ocid="marker.reset_button"
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-30 transition-smooth"
          >
            <RotateCcw size={16} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Photo canvas */}
      <div
        ref={containerRef}
        role="img"
        aria-label="Tap on a face to place a number marker"
        tabIndex={markers.length < 4 ? 0 : -1}
        onClick={handleTap}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleTap(e);
        }}
        onKeyDown={(e) => {
          if (
            (e.key === "Enter" || e.key === " ") &&
            containerRef.current &&
            markers.length < 4
          ) {
            e.preventDefault();
            const rect = containerRef.current.getBoundingClientRect();
            const synth = {
              clientX: rect.left + rect.width / 2,
              clientY: rect.top + rect.height / 2,
            } as React.MouseEvent<HTMLDivElement>;
            handleTap(synth);
          }
        }}
        data-ocid="marker.canvas_target"
        className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted select-none cursor-crosshair"
        style={{
          touchAction: markers.length >= 4 ? "auto" : "none",
        }}
      >
        <img
          src={photoUrl}
          alt="Mark faces"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Overlay hint when full */}
        {markers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
              <p className="font-display font-bold text-foreground text-sm">
                Tap faces to number them
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Start with face #1
              </p>
            </div>
          </div>
        )}

        {/* Face marker pins */}
        {markers.map((marker) => {
          const idx = Number(marker.faceNumber) - 1;
          const color = FACE_COLORS[idx] ?? FACE_COLORS[0];
          const markerKey = `face-${Number(marker.faceNumber)}`;
          return (
            <div
              key={markerKey}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full font-display font-black text-xl flex items-center justify-center shadow-xl ring-[3px] pointer-events-none fade-in ${color.bg} ${color.text} ${color.ring}`}
              style={{
                left: `${marker.xPercent}%`,
                top: `${marker.yPercent}%`,
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
              aria-label={`Face ${Number(marker.faceNumber)}`}
            >
              {Number(marker.faceNumber)}
            </div>
          );
        })}
      </div>

      {/* Marker legend */}
      {markers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {markers.map((marker) => {
            const idx = Number(marker.faceNumber) - 1;
            const color = FACE_COLORS[idx] ?? FACE_COLORS[0];
            const legendKey = `legend-${Number(marker.faceNumber)}`;
            return (
              <div
                key={legendKey}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold ${color.bg} ${color.text}`}
              >
                <span className="font-display font-black">
                  #{Number(marker.faceNumber)}
                </span>
                <span className="opacity-80">
                  {Math.round(marker.xPercent)}%,{Math.round(marker.yPercent)}%
                </span>
              </div>
            );
          })}
        </div>
      )}

      {markers.length === 0 && (
        <p className="text-xs text-center text-destructive font-body">
          Place at least 1 marker to continue.
        </p>
      )}
    </div>
  );
}
