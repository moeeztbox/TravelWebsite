/**
 * A pure, deterministic stand-in for Math.random() for decorative values
 * (particle positions/timings) that get computed during render. Math.random()
 * there causes a React hydration mismatch — the server and the client each
 * call it independently and get different numbers, so the server-rendered
 * HTML and the client's first render disagree. This returns the same value
 * for the same seed every time, on both server and client, while still
 * looking scattered/random visually.
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
