import { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import Marquee from "../../UI/marquee";
import { listApprovedStories } from "../../Services/storiesService";
import { getApiOrigin } from "../../utils/apiOrigin";

function nameFromStory(s) {
  const v = String(s?.displayName || "").trim();
  if (v) return v;
  const f = String(s?.user?.firstName || "").trim();
  const l = String(s?.user?.lastName || "").trim();
  const full = [f, l].filter(Boolean).join(" ").trim();
  return full || "Traveler";
}

function usernameFromStory(s) {
  const raw = String(s?.username || "").trim();
  if (raw) return raw.startsWith("@") ? raw : `@${raw}`;
  const email = String(s?.user?.email || "");
  const base = email.split("@")[0] || "traveler";
  return `@${base}`;
}

const MarqueeDemo = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const origin = getApiOrigin();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const rows = await listApprovedStories();
        if (!cancelled) setStories(rows || []);
      } catch {
        if (!cancelled) setStories([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const reviews = useMemo(() => {
    return (stories || []).map((s) => {
      const username = usernameFromStory(s);
      const name = nameFromStory(s);
      const rating = Math.max(0, Math.min(5, Number(s?.rating ?? 0))) || 0;
      const body = String(s?.text || "").trim();
      const tripType = String(s?.type || "").toUpperCase() || "STORY";
      const location = String(s?.location || "").trim();
      const img = `https://avatar.vercel.sh/${encodeURIComponent(
        username.replace("@", "")
      )}`;
      const videoUrl = s?.videoUrl ? `${origin}${s.videoUrl}` : null;
      return {
        id: s?._id || username,
        name,
        username,
        body: body || "Shared a story.",
        img,
        tripType,
        location,
        rating,
        videoUrl,
        title: String(s?.title || "").trim(),
      };
    });
  }, [stories, origin]);

  return (
    <div className="relative flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-gray-50 font-sans">
      <div className="text-center space-y-4 mb-12 px-4 z-10 relative">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">       
          Traveller <span className="text-amber-500">Reviews</span>
        </h2>   

        <div className="flex items-center justify-center gap-3">             
          <div className="h-px bg-amber-500 w-16"></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <div className="h-px bg-amber-500 w-16"></div>
        </div>

        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Voices of Traveller's who choose a superior Umrah Experience
        </p>
      </div>

      <div className="w-full max-w-7xl relative z-10">
        {loading ? (
          <div className="text-sm text-gray-500 text-center">Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div className="text-sm text-gray-500 text-center">
            No reviews yet.
          </div>
        ) : (
          <Marquee pauseOnHover className="[--duration:18s]">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                {...review}
                onWatchVideo={(url) =>
                  setActiveVideo({ url, title: review.title || "Review video" })
                }
              />
            ))}
          </Marquee>
        )}
      </div>

      {activeVideo?.url ? (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-video-title"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white shadow-xl border border-gray-200 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h3
                id="review-video-title"
                className="text-base sm:text-lg font-bold text-gray-900"
              >
                {activeVideo.title}
              </h3>
              <button
                type="button"
                className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
                onClick={() => setActiveVideo(null)}
              >
                Close
              </button>
            </div>
            <div className="mt-4">
              <video
                controls
                className="w-full max-h-[65vh] aspect-video object-contain rounded-xl border border-gray-200 bg-black"
                src={activeVideo.url}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ReviewCard = ({
  img,
  name,
  username,
  body,
  tripType,
  location,
  rating,
  videoUrl,
  onWatchVideo,
}) => {
  return (
    <figure
      className={cn(
        'relative w-80 lg:w-96 cursor-pointer overflow-hidden rounded-xl border p-6 mx-3',
        'border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300'
      )}
    >
      <div className="flex flex-row items-start gap-4 mb-5">
        <div className="relative flex-shrink-0">
          <img
            width="48"
            height="48"
            className="w-12 h-12 rounded-full"
            alt={`${name} profile`}
            src={img}
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full shadow flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <figcaption className="text-lg font-semibold text-gray-900 truncate">
            {name}
          </figcaption>
          <p className="text-sm text-gray-500 truncate">{username}</p>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200 inline-block w-fit">
              {tripType}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
      </div>

      <blockquote className="text-sm text-gray-700 leading-relaxed mb-4">
        "{body}"
      </blockquote>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < rating ? "text-amber-500" : "text-gray-300"} fill-current`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        {videoUrl ? (
          <button
            type="button"
            onClick={() => onWatchVideo?.(videoUrl)}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors"
          >
            Watch video
          </button>
        ) : null}
      </div>
    </figure>
  );
};

export default MarqueeDemo;