import { useEffect, useMemo, useState } from "react";
import { Star, Quote } from "lucide-react";
import { cn } from "../../lib/utils";
import Marquee from "../../UI/marquee";
import { fetchApprovedReviews } from "../../Services/reviewService";

function initials(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Heatmap: higher rating gets a warmer, more vivid accent so top reviews stand out. */
const RATING_TIERS = {
  5: {
    star: "text-amber-500 fill-amber-500",
    ring: "ring-amber-300/70",
    accent: "from-amber-50 to-white",
    badge: "bg-amber-500 text-white",
  },
  4: {
    star: "text-amber-400 fill-amber-400",
    ring: "ring-amber-200/60",
    accent: "from-amber-50/60 to-white",
    badge: "bg-amber-400 text-white",
  },
  3: {
    star: "text-yellow-400 fill-yellow-400",
    ring: "ring-yellow-200/50",
    accent: "from-yellow-50/50 to-white",
    badge: "bg-yellow-400 text-white",
  },
  2: {
    star: "text-orange-300 fill-orange-300",
    ring: "ring-zinc-200/60",
    accent: "from-zinc-50 to-white",
    badge: "bg-zinc-400 text-white",
  },
  1: {
    star: "text-zinc-300 fill-zinc-300",
    ring: "ring-zinc-200/60",
    accent: "from-zinc-50 to-white",
    badge: "bg-zinc-400 text-white",
  },
};

function tierFor(rating) {
  const r = Math.max(1, Math.min(5, Math.round(Number(rating) || 0)));
  return RATING_TIERS[r] || RATING_TIERS[1];
}

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const rows = await fetchApprovedReviews();
        if (!cancelled) setReviews(rows || []);
      } catch {
        if (!cancelled) setReviews([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(
    () =>
      (reviews || []).map((r) => ({
        id: r._id,
        name: r.fullName || "Traveler",
        body: r.review || "",
        rating: Math.max(0, Math.min(5, Number(r.rating) || 0)),
        date: formatDate(r.createdAt),
      })),
    [reviews],
  );

  return (
    <div className="relative w-full overflow-hidden bg-gray-50 py-16 sm:py-20 font-sans">
      <div className="text-center space-y-4 mb-12 px-4 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Traveller <span className="text-amber-500">Reviews</span>
        </h2>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px bg-amber-500 w-16"></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <div className="h-px bg-amber-500 w-16"></div>
        </div>

        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Real experiences from travellers who chose Al Buraq Global
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {loading ? (
          <div className="text-sm text-gray-500 text-center py-10">
            Loading reviews…
          </div>
        ) : cards.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-10">
            No reviews yet. Be the first to share your experience!
          </div>
        ) : (
          <Marquee pauseOnHover className="[--duration:22s]">
            {cards.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ name, body, rating, date }) {
  const tier = tierFor(rating);
  return (
    <figure
      className={cn(
        "relative w-80 sm:w-96 mx-3 overflow-hidden rounded-2xl border bg-gradient-to-b p-6",
        "border-gray-200 ring-1 hover:shadow-xl transition-shadow duration-300",
        tier.ring,
        tier.accent,
      )}
    >
      <Quote
        className="absolute top-4 right-4 w-8 h-8 text-gray-100"
        aria-hidden="true"
      />

      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "flex items-center justify-center w-11 h-11 rounded-full font-semibold text-sm shrink-0",
            tier.badge,
          )}
        >
          {initials(name)}
        </div>
        <div className="min-w-0">
          <figcaption className="text-base font-semibold text-gray-900 truncate">
            {name}
          </figcaption>
          {date ? <p className="text-xs text-gray-500">{date}</p> : null}
        </div>
      </div>

      <div className="flex items-center gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < rating ? tier.star : "text-gray-200 fill-gray-200",
            )}
          />
        ))}
        <span className="ml-1.5 text-xs font-medium text-gray-500">
          {rating}/5
        </span>
      </div>

      <blockquote className="text-sm text-gray-700 leading-relaxed line-clamp-4">
        "{body}"
      </blockquote>
    </figure>
  );
}

export default ReviewsSection;
