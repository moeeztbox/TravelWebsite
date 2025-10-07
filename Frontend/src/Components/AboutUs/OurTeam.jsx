import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

function OurTeam() {
  const stats = [
    { label: "Years of Excellence", value: "12+" },
    { label: "Happy Partners", value: "40+" },
    { label: "Team Members", value: "70+" },
    { label: "Countries", value: "18" },
  ];

  const team = [
    {
      name: "Aisha Khan",
      role: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=600&q=80",
      bio: "Leads engineering and platform strategy with a focus on reliability and scale.",
    },
    {
      name: "Daniel Lee",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80",
      bio: "Drives product vision, aligning customer needs with business outcomes.",
    },
    {
      name: "Priya Patel",
      role: "Design Director",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      bio: "Champions human-centered design and accessible experiences.",
    },
    {
      name: "Marco Silva",
      role: "Engineering Manager",
      image:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=600&q=80",
      bio: "Builds high-performing teams and ships with craftsmanship.",
    },
    {
      name: "Sara Alvarez",
      role: "Marketing Lead",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
      bio: "Tells our story with clarity across brand, content, and campaigns.",
    },
    {
      name: "Yuki Tanaka",
      role: "Operations Lead",
      image:
        "https://images.unsplash.com/photo-1544005314-6e8cb500b8f7?auto=format&fit=crop&w=600&q=80",
      bio: "Optimizes processes to keep teams moving efficiently and safely.",
    },
    {
      name: "Omar Rahman",
      role: "QA Lead",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80",
      bio: "Ensures quality with robust testing and automation pipelines.",
    },
    {
      name: "Lina Chen",
      role: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      bio: "Turns data into insights to guide product strategy and growth.",
    },
  ];

  const partners = ["Nimbus", "Solaris", "Vertex", "Quanta", "Helix", "Zenith"];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

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
              onClick={scrollPrev}
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
              onClick={scrollNext}
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
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex">
              {team.map((m) => (
                <div
                  key={m.name}
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
                      <div className="mt-4 flex items-center gap-4 text-foreground/60">
                        <a
                          href="#"
                          aria-label="Instagram"
                          className="hover:text-primary"
                          title="Instagram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="5" />
                            <circle cx="12" cy="12" r="3.5" />
                            <circle cx="17.5" cy="6.5" r="0.5" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          aria-label="Facebook"
                          className="hover:text-primary"
                          title="Facebook"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                          >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3.5l.5-4H14V7a1 1 0 011-1h3V2z" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          aria-label="Twitter"
                          className="hover:text-primary"
                          title="Twitter"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                          >
                            <path d="M22 5.8c-.7.3-1.5.6-2.3.7a3.9 3.9 0 00-6.7 3.6A11.1 11.1 0 013 6.6s-4 9 5 13a11.6 11.6 0 01-7 2c9 5 20 0 20-11.5 0-.3 0-.6-.1-.9.8-.6 1.5-1.3 2-2.1z" />
                          </svg>
                        </a>
                      </div>
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
