import { cn } from "@/lib/utils";
import { Camera, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const STORAGE_GATEWAY_URL =
  (import.meta.env.VITE_STORAGE_GATEWAY_URL as string) ?? "";

interface PhotoUploaderProps {
  onPhotoReady: (file: File, previewUrl: string) => void;
  previewUrl: string | null;
  onClear: () => void;
  uploadProgress: number | null;
}

export function PhotoUploader({
  onPhotoReady,
  previewUrl,
  onClear,
  uploadProgress,
}: PhotoUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) return;
      if (!file.type.match(/image\/(jpeg|png)/)) return;
      if (file.size > 10 * 1024 * 1024) return;
      const url = URL.createObjectURL(file);
      onPhotoReady(file, url);
    },
    [onPhotoReady],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFile(e.dataTransfer.files[0] ?? null);
    },
    [handleFile],
  );

  if (previewUrl) {
    return (
      <div className="space-y-4">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted">
          <img
            src={previewUrl}
            alt="Selected group"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-card transition-smooth shadow-lg"
            aria-label="Remove photo"
            data-ocid="photo.remove_button"
          >
            <X size={16} className="text-foreground" />
          </button>
          {uploadProgress !== null && uploadProgress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm px-4 py-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-body text-foreground">
                  Uploading...
                </span>
                <span className="text-xs font-display font-bold text-primary">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-center text-muted-foreground font-body">
          Photo ready — next, number the faces.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        data-ocid="photo.dropzone"
        className={cn(
          "flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl w-full aspect-[4/3] cursor-pointer transition-smooth",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-border hover:border-primary/60 hover:bg-primary/5",
        )}
      >
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-smooth",
            isDragging ? "bg-primary/20" : "bg-muted",
          )}
        >
          <Upload
            size={28}
            className={isDragging ? "text-primary" : "text-muted-foreground"}
          />
        </div>
        <div className="text-center px-4">
          <p className="font-display font-bold text-foreground text-sm">
            Drag & drop or tap to upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            JPG or PNG · Max 4 faces · Up to 10MB
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => cameraRef.current?.click()}
        data-ocid="photo.camera_button"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-accent/40 bg-accent/5 hover:bg-accent/10 hover:border-accent/60 transition-smooth"
      >
        <Camera size={18} className="text-accent" />
        <span className="text-sm font-display font-semibold text-accent">
          Use Camera
        </span>
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        data-ocid="photo.file_input"
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/jpeg,image/png"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        data-ocid="photo.camera_input"
      />
    </div>
  );
}

export async function uploadPhotoWithProgress(
  file: File,
  onProgress: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        onProgress((e.loaded / e.total) * 100);
      }
    });
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText) as { url: string };
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
