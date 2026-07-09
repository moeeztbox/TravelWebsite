import { useCallback, useRef, useState } from "react";

const TRANSITION_MS = 400;

function OurTeam() {
  const stats = [
    { label: "Years of Excellence", value: "12+" },
    { label: "Happy Partners", value: "40+" },
    { label: "Team Members", value: "70+" },
    { label: "Countries", value: "18" },
  ];

  const team = [
    {
      name: "Muhammad Jamil",
      role: "CEO",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80",
      bio: "Leads the company's overall strategy and vision for exceptional pilgrimage experiences.",
    },
    {
      name: "Hajra Jamil",
      role: "Co-Founder",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=600&q=80",
      bio: "Co-founded the company with a vision for accessible, spiritually meaningful travel.",
    },
    {
      name: "Mudassir Jamil",
      role: "Accountant",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      bio: "Manages the company's finances and keeps operations transparent and on track.",
    },
    {
      name: "Moeez Jamil",
      role: "Designer & Developer",
      image:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=600&q=80",
      bio: "Designs and builds the website and booking platform behind the experience.",
    },
  ];

  const partners = ["Nimbus", "Solaris", "Vertex", "Quanta", "Helix", "Zenith"];

  // `order` is the only source of truth for card order; it starts as `team`
  // on every mount, so a page refresh always restores the original order.
  const [order, setOrder] = useState(team);
  // While animating, one clone card is temporarily rendered (appended for
  // "next", prepended for "prev") purely to slide into view -- it's removed
  // again the instant the animation ends, so the steady-state DOM never has
  // duplicates.
  const [pending, setPending] = useState(null); // "next" | "prev" | null
  const [transformPx, setTransformPx] = useState(0);
  const [transitionOn, setTransitionOn] = useState(false);
  const trackRef = useRef(null);
  const animatingRef = useRef(false);

  const getCardWidth = () => {
    const firstCard = trackRef.current?.firstElementChild;
    return firstCard ? firstCard.getBoundingClientRect().width : 0;
  };

  const goNext = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    const width = getCardWidth();
    setPending("next");
    setTransitionOn(false);
    setTransformPx(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionOn(true);
        setTransformPx(-width);
      });
    });
  }, []);

  const goPrev = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    const width = getCardWidth();
    setPending("prev");
    setTransitionOn(false);
    setTransformPx(-width);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionOn(true);
        setTransformPx(0);
      });
    });
  }, []);

  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.target !== trackRef.current || e.propertyName !== "transform") return;
      if (!pending) return;
      setTransitionOn(false);
      setTransformPx(0);
      setOrder((prev) =>
        pending === "next"
          ? [...prev.slice(1), prev[0]]
          : [prev[prev.length - 1], ...prev.slice(0, -1)],
      );
      setPending(null);
      animatingRef.current = false;
    },
    [pending],
  );

  const displayItems =
    pending === "next"
      ? [...order, { ...order[0], _slotKey: "clone-next" }]
      : pending === "prev"
        ? [{ ...order[order.length - 1], _slotKey: "clone-prev" }, ...order]
        : order;

  return (
    <div className="bg-background">
      {/* Team */}
      <section id="team" className="container ml-46 py-16">
        <div className="mb-8">
          <div>
            <h2 className="text-3xl text-center font-extrabold">
              Our <span className="text-yellow-600">Team</span>
            </h2>
            <p className="mt-2 text-center ">
              A diverse group of builders, designers, and operators.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center justify-end gap-2 pb-4">
            <button
              onClick={goPrev}
              aria-label="Previous"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goNext}
              aria-label="Next"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className="-ml-4 flex"
              style={{
                transform: `translateX(${transformPx}px)`,
                transition: transitionOn
                  ? `transform ${TRANSITION_MS}ms ease-in-out`
                  : "none",
              }}
            >
              {displayItems.map((m) => (
                <div
                  key={m._slotKey ?? m.name}
                  className="w-full pl-4 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%]"
                >
                  <div className="group rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md">
                    <div className="overflow-hidden rounded-xl bg-transparent">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="block h-56 w-full bg-transparent object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="-mx-4 mt-4 h-[2px] bg-foreground/70" />
                    <div className="pt-4">
                      <div className="font-semibold tracking-tight">
                        {m.name}
                      </div>
                      <div className="text-sm text-foreground/60">{m.role}</div>
                      <p className="mt-2 text-sm text-foreground/70">{m.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default OurTeam;
