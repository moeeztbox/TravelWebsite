import { useRef, useState } from "react";
import { toast } from "sonner";
import { submitStory } from "../Services/storiesService";

export default function SubmitStory() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("umrah");
  const [text, setText] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoInputRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitStory({ title: title.trim(), type, text, videoFile });
      toast.success("Story submitted for review");
      setTitle("");
      setType("umrah");
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
        <h1 className="text-2xl font-bold text-stone-900">Share your story</h1>
        <p className="text-stone-600 mt-2">
          Share your Hajj or Umrah journey in text or video. Admin will review it
          before publishing.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
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
              Type
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
              Story (text)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={7}
              className="w-full rounded-xl border border-stone-200 px-4 py-2.5"
              placeholder="Write your experience…"
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

