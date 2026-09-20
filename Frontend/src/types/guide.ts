/**
 * Shared shape for the content cards rendered across the Umrah/Travel/Ziyarat
 * guide pages. `description` is sometimes an HTML string rendered via
 * `dangerouslySetInnerHTML` (kept as `string` either way). `location` and
 * `significance` are only used by the Ziyarat sites list.
 */
export interface GuideCard {
  title: string;
  description: string;
  image: string;
  location?: string;
  significance?: string;
}
