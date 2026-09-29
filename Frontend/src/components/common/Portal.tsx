"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

/**
 * Renders children into `document.body`, outside the React tree root.
 * Avoids clipping from parent `overflow: hidden` and stacking-context issues.
 */
export default function Portal({ children }: PortalProps) {
  const [node] = useState<HTMLDivElement | null>(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElement("div");
    el.setAttribute("data-react-portal", "");
    return el;
  });

  useEffect(() => {
    if (!node) return;
    document.body.appendChild(node);
    return () => {
      document.body.removeChild(node);
    };
  }, [node]);

  if (!node) return null;
  return createPortal(children, node);
}
