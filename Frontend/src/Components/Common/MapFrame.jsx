import { useEffect, useState } from "react";

// Once activated, auto re-arm the block after this long even if onMouseLeave never
// fires (e.g. the user clicks the map then scrolls with the wheel without moving the
// cursor off it first -- mouseleave isn't guaranteed to fire from that).
const AUTO_DEACTIVATE_MS = 4000;

/**
 * Google Maps iframes are a separate browsing context: while the cursor is over one,
 * wheel/scroll events are handled by the iframe itself and never reach the parent page,
 * which makes page scrolling appear to "stick" wherever a map sits. Block pointer events
 * on the iframe until the user explicitly clicks to activate it, then re-arm on mouse
 * leave (or after a short timeout, as a safety net) so the next scroll pass isn't
 * trapped again.
 */
export default function MapFrame({ src, title, height = "100%", className = "", wrapperClassName = "" }) {
  const [active, setActive] = useState(false);
  const heightStyle = /^\d+$/.test(String(height)) ? `${height}px` : height;

  useEffect(() => {
    if (!active) return undefined;
    const t = setTimeout(() => setActive(false), AUTO_DEACTIVATE_MS);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div
      className={`relative w-full ${wrapperClassName}`}
      style={{ height: heightStyle }}
      onMouseLeave={() => setActive(false)}
    >
      <iframe
        title={title}
        src={src}
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen=""
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0, pointerEvents: active ? "auto" : "none" }}
        className={className}
      />
      {!active ? (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 cursor-pointer bg-transparent"
          aria-label="Click to interact with the map"
        >
          <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/70 text-white text-[11px] font-medium">
            Click to interact with map
          </span>
        </button>
      ) : null}
    </div>
  );
}
