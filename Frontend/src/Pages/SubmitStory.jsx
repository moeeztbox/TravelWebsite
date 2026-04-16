import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { submitStory } from "../Services/storiesService";
import { useAuth } from "../Context/AuthContext";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function baseFromEmail(email) {
  const raw = String(email || "").split("@")[0] || "user";
  const cleaned = raw.toLowerCase().replace(/[^a-z0-9_]/g, "");
  return cleaned || "user";
}

export default function SubmitStory() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("umrah");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoInputRef = useRef(null);

  const auto = useMemo(() => {
    const base = baseFromEmail(user?.email);
    const defaultLocation = [user?.city, user?.country]
      .filter(Boolean)
      .join(", ")
      .trim();
    return {
      base,
      displayName: base,
      username: `@${base}`,
      location: defaultLocation,
    };
  }, [user?.email, user?.city, user?.country]);

  useEffect(() => {
    setDisplayName((v) => (v ? v : auto.displayName));
    setUsername((v) => (v ? v : auto.username));
    setLocation((v) => (v ? v : auto.location));
  }, [auto.displayName, auto.username, auto.location]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitStory({
        title: title.trim(),
        type,
        displayName: displayName.trim(),
        username: username.trim(),
        location: location.trim(),
        rating,
        text,
        videoFile,
      });
      toast.success("Story submitted for review");
      setTitle("");
      setType("umrah");
      setDisplayName(auto.displayName);
      setUsername(auto.username);
      setLocation(auto.location);
      setRating(5);
      setText("");
      setVideoFile(null);
      if (videoInputRef.current) videoInputRef.current.value = "";
    } catch (err) {
      toast.error(err.response?.data?.message || "Submit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate("/dashboard");
          }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 px-3 py-2 rounded-xl transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-stone-900">Share your story</h1>
        <p className="text-stone-600 mt-2">
          Share your Hajj or Umrah journey. Your name, username, and location are
          auto-filled from your account (editable).
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Name
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-4 py-2.5"
                placeholder={auto.displayName}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-4 py-2.5"
                placeholder={auto.username}
                required
              />
              <p className="text-[11px] text-stone-500 mt-1">
                Format: @username (letters/numbers/underscore)
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Package type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5"
            >
              <option value="umrah">Umrah</option>
              <option value="hajj">Hajj</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Location
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5"
              placeholder="City, Country"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Tip: update your location in Profile for auto-fill.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Rating
            </label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const v = i + 1;
                const active = v <= rating;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setRating(v)}
                    className={[
                      "p-1 rounded-lg transition",
                      loading ? "cursor-not-allowed opacity-60" : "hover:bg-stone-100",
                    ].join(" ")}
                    disabled={loading}
                    aria-label={`Rate ${v} star`}
                    title={`${v} / 5`}
                  >
                    <Star
                      className={[
                        "w-6 h-6",
                        active ? "fill-amber-400 text-amber-400" : "text-stone-300",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
              <span className="text-sm text-stone-600 ml-2">{rating}/5</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Review
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={7}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5"
              placeholder="Write your feedback…"
            />
            <p className="text-xs text-stone-500 mt-1">
              You can submit text, a video, or both.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Video (optional, mp4/webm/mov, up to 60MB)
            </label>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
          </div>

          <button
            disabled={loading}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 disabled:opacity-60"
            type="submit"
          >
            {loading ? "Submitting…" : "Submit for review"}
          </button>
        </form>
      </div>
    </div>
  );
}

