import { Toaster } from "@/components/ui/sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "bg-card border border-border text-foreground font-body shadow-lg",
          title: "font-display font-bold text-foreground",
          description: "text-muted-foreground text-sm",
          actionButton: "bg-primary text-primary-foreground font-semibold",
          cancelButton: "bg-muted text-muted-foreground",
          success: "border-accent",
          error: "border-destructive",
        },
      }}
      theme="dark"
      richColors
    />
  );
}

export { toast } from "sonner";
