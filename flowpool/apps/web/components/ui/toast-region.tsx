"use client";

import { X } from "lucide-react";
import { useAppState } from "@/lib/hooks/use-app-state";
import { cn } from "@/lib/utils/cn";

export function ToastRegion() {
  const { toasts, dismissToast } = useAppState();

  return (
    <div className="fixed right-6 top-24 z-[70] flex w-[320px] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "rounded-2xl border p-4 shadow-glow backdrop-blur",
            toast.tone === "success" && "border-green/30 bg-panel",
            toast.tone === "warning" && "border-amber/30 bg-panel",
            toast.tone === "error" && "border-critical/30 bg-panel",
            toast.tone === "info" && "border-cyan/30 bg-panel"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-medium">{toast.title}</div>
              <div className="mt-1 text-sm text-muted">{toast.message}</div>
            </div>
            <button
              aria-label="Dismiss notification"
              className="text-muted transition hover:text-text"
              onClick={() => dismissToast(toast.id)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
