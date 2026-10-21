"use client";

import { useEffect } from "react";

export function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-[100] flex max-w-sm items-center gap-3 rounded-xl border border-app-strong glass-panel px-4 py-3 text-sm font-medium text-ink shadow-elevated"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white dark:bg-accent-bright dark:text-slate-950">
        ✓
      </span>
      {message}
      <button
        type="button"
        onClick={onClose}
        className="ml-auto text-ink-muted hover:text-ink"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
