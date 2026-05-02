import { createActor } from "@/backend";
import { FaceMarkerEditor } from "@/components/FaceMarkerEditor";
import { Layout } from "@/components/Layout";
import {
  PhotoUploader,
  uploadPhotoWithProgress,
} from "@/components/PhotoUploader";
import { PollForm } from "@/components/PollForm";
import { toast } from "@/components/Toast";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { type FaceMarker, PollCategory } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";

type Step = 1 | 2 | 3;

const STEPS = [
  { num: 1 as Step, label: "Photo" },
  { num: 2 as Step, label: "Number Faces" },
  { num: 3 as Step, label: "Poll Settings" },
];

function StepIndicator({ current }: { current: Step }) {
  return (
    <div
      className="flex items-center justify-center gap-0 mb-8"
      aria-label="Progress steps"
    >
      {STEPS.map((step, idx) => {
        const isDone = current > step.num;
        const isActive = current === step.num;
        const stepKey = `step-${step.num}`;
        return (
          <div key={stepKey} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm border-2 transition-smooth",
                  isDone
                    ? "bg-accent border-accent text-accent-foreground"
                    : isActive
                      ? "bg-primary border-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted border-border text-muted-foreground",
                )}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : step.num}
              </div>
              <span
                className={cn(
                  "text-[10px] font-body font-medium leading-none",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-12 h-0.5 mx-1 mb-4 rounded-full transition-smooth",
                  current > step.num ? "bg-accent" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function UploadPage() {
  const { isAuthenticated } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [markers, setMarkers] = useState<FaceMarker[]>([]);
  const [category, setCategory] = useState<PollCategory>(
    PollCategory.mostHandsome,
  );
  const [duration, setDuration] = useState(24);
  const [caption, setCaption] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoReady = (file: File, url: string) => {
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
        false,
      );

      if (result.__kind__ === "ok") {
        toast.success("Face-Off is live! 🔥", {
          description: "Public voting has started.",
        });
        queryClient.invalidateQueries({ queryKey: ["publicFeed"] });
        queryClient.invalidateQueries({ queryKey: ["myPolls"] });
        navigate({ to: "/dashboard" });
      } else {
        toast.error("Failed to create poll", { description: result.err });
      }
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div
          className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
          data-ocid="upload.unauthenticated_state"
        >
          <p className="text-lg font-display font-bold text-foreground mb-2">
            Sign in to create a Face-Off
          </p>
          <p className="text-sm text-muted-foreground font-body">
            Use the Sign In button at the top to get started.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-6" data-ocid="upload.page">
        <div className="mb-6">
          <h1 className="font-display font-black text-2xl text-foreground">
            Create a <span className="text-primary">Face</span>
            <span className="text-accent">Off</span>
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            Upload a group photo and let the public decide.
          </p>
        </div>

        <StepIndicator current={step} />

        {step === 1 && (
          <div className="space-y-5 slide-up" data-ocid="upload.step1_panel">
            <PhotoUploader
              onPhotoReady={handlePhotoReady}
              previewUrl={previewUrl}
              onClear={handleClearPhoto}
              uploadProgress={uploadProgress}
            />
            <button
              type="button"
              disabled={!photo}
              onClick={goToStep2}
              data-ocid="upload.next_step1_button"
              className={cn(
                "w-full py-3.5 rounded-xl font-display font-bold text-sm transition-smooth",
                photo
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-50",
              )}
            >
              Next: Number the Faces →
            </button>
          </div>
        )}

        {step === 2 && previewUrl && (
          <div className="space-y-5 slide-up" data-ocid="upload.step2_panel">
            <FaceMarkerEditor
              photoUrl={previewUrl}
              markers={markers}
              onMarkersChange={setMarkers}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                data-ocid="upload.back_step2_button"
                className="flex-1 py-3.5 rounded-xl font-display font-semibold text-sm border-2 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-smooth"
              >
                ← Back
              </button>
              <button
                type="button"
                disabled={markers.length === 0}
                onClick={goToStep3}
                data-ocid="upload.next_step2_button"
                className={cn(
                  "flex-[2] py-3.5 rounded-xl font-display font-bold text-sm transition-smooth",
                  markers.length > 0
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50",
                )}
              >
                Next: Poll Settings →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 slide-up" data-ocid="upload.step3_panel">
            <PollForm
              markers={markers}
              category={category}
              duration={duration}
              caption={caption}
              consent={consent}
              isSubmitting={isSubmitting}
              onCategoryChange={setCategory}
              onDurationChange={setDuration}
              onCaptionChange={setCaption}
              onConsentChange={setConsent}
              onSubmit={handlePublish}
            />
            {!isSubmitting && (
              <button
                type="button"
                onClick={() => setStep(2)}
                data-ocid="upload.back_step3_button"
                className="w-full py-3 rounded-xl font-display font-semibold text-sm border-2 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-smooth"
              >
                ← Back to Face Numbering
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
