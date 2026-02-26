import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";

/**
 * LanguageSwitcher
 * - Tries to surface the real Google Translate select if/when it appears.
 * - Always shows a fallback menu with language buttons that set the googtrans cookie
 *   and reload the page (works even when the injected select is unavailable).
 */

const LANGS = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو (Urdu)" },
  { code: "ar", label: "العربية (Arabic)" },
];

function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  // set for hostname root
  document.cookie = `${name}=${value};expires=${expires};path=/;domain=${window.location.hostname}`;
}

// Google translate expects the cookie value like "/<source>/<target>" e.g. "/en/ur"
function applyGoogleTranslate(targetLang) {
  const sourceLang = "en";
  // try to set the official combo first (if injected)
  const combo = document.querySelector(".goog-te-combo");
  if (combo) {
    try {
      combo.value = targetLang;
      combo.dispatchEvent(new Event("change"));
      return;
    } catch (err) {
      // fall through to cookie method
      // console.warn("Error updating goog-te-combo:", err);
    }
  }

  // fallback: set googtrans cookie then reload
  try {
    setCookie("googtrans", `/${sourceLang}/${targetLang}`);
    setCookie("googtrans", `/${sourceLang}/${targetLang}`, 365); // repeat to ensure domain
    // some setups expect domain with a leading dot:
    const domain = "." + window.location.hostname;
    document.cookie = `googtrans=/${sourceLang}/${targetLang};path=/;domain=${domain}`;
  } catch (e) {
    // ignore
  }

  // reload to let Google Translate run (it observes the cookie on load)
  setTimeout(() => {
    window.location.reload();
  }, 200);
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Poll to find the google select and move it into our container if possible.
  useEffect(() => {
    const interval = setInterval(() => {
      const select = document.querySelector(".goog-te-combo");
      const container = containerRef.current;
      if (select && container && !container.contains(select)) {
        // Move the select into our container and style it (non-intrusively).
        try {
          container.innerHTML = ""; // clear placeholder
          container.appendChild(select);
          select.style.display = "block";
          select.style.width = "100%";
          select.style.padding = "6px 8px";
          select.style.border = "1px solid #e5e7eb";
          select.style.borderRadius = "8px";
          select.style.background = "white";
          select.style.cursor = "pointer";
          select.style.fontSize = "14px";
        } catch (err) {
          // If Google renders inside an iframe or cross-origin, append will fail.
          // We'll silently ignore and rely on our manual buttons.
        }
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-yellow-600 cursor-pointer transition-all duration-200"
      >
        <Globe size={25} />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50"
          onMouseLeave={() => setOpen(false)}
        >
          {/* Container where we will move the real google select (if available) */}
          <div
            id="google_translate_container"
            ref={containerRef}
            className="w-full mb-2"
          />

          {/* Fallback manual language buttons */}
          <div className="flex flex-col gap-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setOpen(false);
                  applyGoogleTranslate(l.code);
                }}
                className="text-left px-2 py-2 rounded-md hover:bg-gray-50 transition"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
