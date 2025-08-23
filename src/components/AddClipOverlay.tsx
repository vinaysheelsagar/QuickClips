// src/components/AddClipOverlay.tsx
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export default function AddClipOverlay({ open, onClose, children, title = "Add Clip" }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 grid h-full w-full place-items-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="addclip-title"
          className="w-[min(92vw,48rem)] rounded-2xl border bg-white shadow-lg"
        >
          <div className="flex items-center justify-between border-b p-4">
            <h2 id="addclip-title" className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} aria-label="Close" className="rounded p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
