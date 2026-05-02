import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  DURATION_OPTIONS,
  type FaceMarker,
  type PollCategory,
} from "@/types";
import { Rocket } from "lucide-react";

interface PollFormProps {
  markers: FaceMarker[];
  category: PollCategory;
  duration: number;
  caption: string;
  consent: boolean;
  isSubmitting: boolean;
  onCategoryChange: (v: PollCategory) => void;
  onDurationChange: (v: number) => void;
  onCaptionChange: (v: string) => void;
  onConsentChange: (v: boolean) => void;
  onSubmit: () => void;
}

export function PollForm({
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
  onSubmit,
}: PollFormProps) {
  const canPublish = consent && !isSubmitting && markers.length > 0;

  return (
    <div className="space-y-6">
      {/* Category */}
      <div className="space-y-2">
        <Label className="font-display font-semibold text-sm text-foreground">
          Category
        </Label>
        <div
          className="grid grid-cols-2 gap-2"
          data-ocid="poll.category_select"
        >
          {CATEGORY_LABELS.map(({ value, label, emoji }) => (
            <button
              key={value}
              type="button"
              onClick={() => onCategoryChange(value as PollCategory)}
              data-ocid={`poll.category.${value}`}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-left transition-smooth",
                category === value
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-muted text-muted-foreground hover:border-primary/40",
              )}
            >
              <span className="text-base">{emoji}</span>
              <span className="text-xs font-body font-medium truncate">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label className="font-display font-semibold text-sm text-foreground">
          Poll Duration
        </Label>
        <div
          className="grid grid-cols-4 gap-2"
          data-ocid="poll.duration_select"
        >
          {DURATION_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onDurationChange(value)}
              data-ocid={`poll.duration.${value}`}
              className={cn(
                "py-2.5 rounded-xl border-2 text-xs font-body font-semibold text-center transition-smooth",
                duration === value
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-muted text-muted-foreground hover:border-accent/40",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Caption */}
      <div className="space-y-2">
        <Label
          htmlFor="poll-caption"
          className="font-display font-semibold text-sm text-foreground"
        >
          Caption{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <div className="relative">
          <Textarea
            id="poll-caption"
            value={caption}
            onChange={(e) => onCaptionChange(e.target.value)}
            placeholder="e.g. Trip to Goa. Who wins?"
            maxLength={150}
            rows={2}
            className="bg-muted border-border resize-none pr-14"
            data-ocid="poll.caption_textarea"
          />
          <span className="absolute bottom-2 right-3 text-xs text-muted-foreground font-body pointer-events-none">
            {caption.length}/150
          </span>
        </div>
      </div>

      {/* Consent */}
      <div
        className={cn(
          "flex items-start gap-3 p-4 rounded-xl border-2 transition-smooth",
          consent
            ? "border-accent/40 bg-accent/5"
            : "border-destructive/30 bg-destructive/5",
        )}
      >
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
          className="w-4 h-4 mt-0.5 accent-primary flex-shrink-0"
          data-ocid="poll.consent_checkbox"
        />
        <Label
          htmlFor="consent"
          className="font-body text-xs text-muted-foreground cursor-pointer leading-relaxed"
        >
          I confirm all people in this photo have consented to be included in a
          public vote.
        </Label>
      </div>

      {/* Submit */}
      <Button
        type="button"
        disabled={!canPublish}
        onClick={onSubmit}
        className="w-full py-4 text-base font-display font-bold disabled:opacity-40"
        data-ocid="poll.submit_button"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Creating Face-Off…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Rocket size={18} />
            Launch Face-Off
          </span>
        )}
      </Button>
    </div>
  );
}
