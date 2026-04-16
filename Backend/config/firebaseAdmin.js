import admin from "firebase-admin";

function normalizeServiceAccount(raw) {
  if (!raw) return null;
  if (typeof raw === "object") return raw;
  const str = String(raw).trim();
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch {
    // Allow env var containing JSON with escaped newlines.
    const repaired = str.replace(/\\n/g, "\n");
    return JSON.parse(repaired);
  }
}

export function ensureFirebaseAdmin() {
  if (admin.apps.length > 0) return admin;

  const svc = normalizeServiceAccount(process.env.FIREBASE_SERVICE_ACCOUNT);
  if (svc) {
    admin.initializeApp({ credential: admin.credential.cert(svc) });
    return admin;
  }

  const adcPath = String(process.env.GOOGLE_APPLICATION_CREDENTIALS || "").trim();
  if (!adcPath) {
    const err = new Error(
      "Firebase Admin is not configured. Set FIREBASE_SERVICE_ACCOUNT (JSON) or GOOGLE_APPLICATION_CREDENTIALS (path to service account JSON)."
    );
    err.code = "FIREBASE_ADMIN_NOT_CONFIGURED";
    throw err;
  }

  // Use Application Default Credentials (service account file path).
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
  return admin;
}

export function firebaseAuth() {
  return ensureFirebaseAdmin().auth();
}

