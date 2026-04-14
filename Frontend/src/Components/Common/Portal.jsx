import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Renders children into `document.body`, outside the React tree root.
 * Avoids clipping from parent `overflow: hidden` and stacking-context issues.
 */
export default function Portal({ children }) {
  const [node] = useState(() => {
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
