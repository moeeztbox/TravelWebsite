// This file must run BEFORE any other code
// It creates a global process object for libraries that expect it

if (typeof window !== "undefined") {
  // Create process object if it doesn't exist
  if (!window.process) {
    window.process = { env: {} };
  }

  // Copy Vite env vars to process.env with the names Amadeus expects
  window.process.env.AMADEUS_CLIENT_ID = import.meta.env.VITE_AMADEUS_API_KEY;
  window.process.env.AMADEUS_CLIENT_SECRET =
    import.meta.env.VITE_AMADEUS_API_SECRET;
  window.process.env.NODE_ENV = import.meta.env.MODE || "development";

  // Also make global available
  if (!window.global) {
    window.global = window;
  }

  console.log(
    "✅ Polyfill loaded - process object created",
    window.process ? "with process" : "without process",
    "API Key in process:",
    window.process.env.AMADEUS_CLIENT_ID ? "Yes" : "No",
  );
}
