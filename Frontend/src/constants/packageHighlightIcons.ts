import {
  Star,
  MapPin,
  Calendar,
  Users,
  Plane,
  Hotel,
  Car,
  Shield,
  Clock,
  type LucideIcon,
} from "lucide-react";
import type { HighlightIconKey } from "../types/package";

/** Keys must match `iconKey` stored in MongoDB (featuredPackagesSeed / Package model). */
export const HIGHLIGHT_ICON_MAP: Record<HighlightIconKey, LucideIcon> = {
  hotel: Hotel,
  plane: Plane,
  shield: Shield,
  users: Users,
  star: Star,
  car: Car,
  clock: Clock,
  "map-pin": MapPin,
  calendar: Calendar,
};

export function iconForHighlightKey(iconKey?: string | null): LucideIcon {
  const key = (iconKey || "map-pin") as HighlightIconKey;
  return HIGHLIGHT_ICON_MAP[key] || MapPin;
}
