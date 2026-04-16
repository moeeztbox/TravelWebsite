import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "../../firebase/firebaseClient";
import { loginWithFirebase } from "../../Services/authService";
import { useAuth } from "../../Context/AuthContext";

function getErrorMessage(err) {
  const code = err?.code || "";
  if (code === "auth/popup-closed-by-user") return "Sign-in popup was closed.";
  if (code === "auth/cancelled-popup-request") return "Sign-in cancelled.";
  if (code === "auth/popup-blocked")
    return "Popup blocked by the browser. Allow popups and try again.";
  return err?.message || "Google sign-in failed. Please try again.";
}

export default function GoogleLoginButton({ className = "" }) {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const cred = await signInWithPopup(firebaseAuth, googleProvider);
      const idToken = await cred.user.getIdToken();
      const data = await loginWithFirebase(idToken);
      signIn(data.token, data.user);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      {error ? (
        <p
          className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full border-2 border-gray-300 hover:border-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed text-gray-800 font-semibold py-2 sm:py-3 px-4 rounded-full shadow-sm text-sm sm:text-base transition duration-300 flex items-center justify-center gap-2"
      >
        <span className="text-lg leading-none">G</span>
        {loading ? "Connecting…" : "Continue with Google"}
      </button>
    </div>
  );
}
