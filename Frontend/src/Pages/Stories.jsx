import { useEffect, useState } from "react";
import { listApprovedStories } from "../Services/storiesService";
import { getApiOrigin } from "../utils/apiOrigin";
import GoBackButton from "../Components/Common/GoBackButton";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const origin = getApiOrigin();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const rows = await listApprovedStories();
        setStories(rows);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <GoBackButton className="mb-4" fallbackTo="/" />
        <h1 className="text-3xl font-bold text-stone-900">Stories</h1>
        <p className="text-stone-600 mt-2">
          Read Hajj and Umrah journeys shared by our community.
        </p>

        <div className="mt-8 space-y-4">
          {loading ? (
            <p className="text-stone-500">Loading…</p>
          ) : stories.length === 0 ? (
            <p className="text-stone-500">No stories yet.</p>
          ) : (
            stories.map((s) => (
              <article
                key={s._id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-stone-900">
                      {s.title}
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      {s.type?.toUpperCase()} •{" "}
                      {s.user ? `${s.user.firstName || ""} ${s.user.lastName || ""}`.trim() : "Traveler"}
                    </p>
                  </div>
                </div>

                {s.videoUrl ? (
                  <div className="mt-4">
                    <video
                      controls
                      className="w-full max-h-[420px] aspect-video object-contain rounded-xl border border-stone-200 bg-black"
                      src={`${origin}${s.videoUrl}`}
                    />
                  </div>
                ) : null}

                {s.text ? (
                  <p className="mt-4 text-stone-700 whitespace-pre-wrap leading-relaxed">
                    {s.text}
                  </p>
                ) : null}
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

