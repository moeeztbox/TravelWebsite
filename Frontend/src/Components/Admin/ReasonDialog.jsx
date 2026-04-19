import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useScrollLock } from "../../Hooks/useScrollLock";

export default function ReasonDialog({
  open,
  title = "Provide a reason",
  description = "Optionally explain the reason. This will be visible to the user.",
  placeholder = "Type reason here…",
  confirmText = "OK",
  cancelText = "Cancel",
  hideCancel = false,
  initialValue = "",
  busy = false,
  onConfirm,
  onCancel,
}) {
  const [value, setValue] = useState(initialValue || "");
  const inputRef = useRef(null);
  useScrollLock(Boolean(open));

  useEffect(() => {
    if (!open) return;
    setValue(initialValue || "");
    const t = setTimeout(() => inputRef.current?.focus?.(), 0);
    return () => clearTimeout(t);
  }, [open, initialValue]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") onConfirm?.(value);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel, onConfirm, value]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-stone-900">{title}</h3>
            {description ? (
              <p className="text-xs text-stone-500 mt-0.5">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-stone-100 text-stone-500"
            aria-label="Close"
            disabled={busy}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <textarea
            ref={inputRef}
            rows={5}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            placeholder={placeholder}
          />
          <div className="flex flex-wrap justify-end gap-2">
            {!hideCancel ? (
              <button
                type="button"
                onClick={onCancel}
                disabled={busy}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm font-semibold hover:bg-stone-50 disabled:opacity-60"
              >
                {cancelText}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => onConfirm?.(value)}
              disabled={busy}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 disabled:opacity-60"
            >
              {confirmText}
            </button>
          </div>
          <p className="text-[11px] text-stone-500">
            Tip: Press <span className="font-semibold">Esc</span> to cancel,{" "}
            <span className="font-semibold">Ctrl/⌘ + Enter</span> to confirm.
          </p>
        </div>
      </div>
    </div>
  );
}

