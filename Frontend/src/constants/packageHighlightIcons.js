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
} from "lucide-react";

/** Keys must match `iconKey` stored in MongoDB (featuredPackagesSeed / Package model). */
export const HIGHLIGHT_ICON_MAP = {
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

export function iconForHighlightKey(iconKey) {
  const key = iconKey || "map-pin";
  return HIGHLIGHT_ICON_MAP[key] || MapPin;
}
