/** Indices 0–7 map to DiceBear avataaars seeds (stable per user index). */
export const BITMOJI_COUNT = 8;

export function getBitmojiAvatarUrl(bitmojiIndex = 0, seedExtra = "") {
  const idx = Number.isFinite(Number(bitmojiIndex))
    ? Math.min(7, Math.max(0, Math.floor(Number(bitmojiIndex))))
    : 0;
  const seed = `traveler-${idx}-${seedExtra || "guest"}`;
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
}
