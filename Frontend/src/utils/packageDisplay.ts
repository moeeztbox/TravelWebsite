import {
  Bus,
  ShieldCheck,
  Ticket,
  Hotel,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { iconForHighlightKey } from "../constants/packageHighlightIcons";
import type { Package, PackageServices, JourneyStage } from "../types/package";

export interface HighlightItem {
  icon: LucideIcon;
  text: string;
}

export function getHighlights(pkg: Package): HighlightItem[] {
  const raw = Array.isArray(pkg?.highlights) ? pkg.highlights : [];
  return raw
    .filter((h) => h && h.text)
    .map((h) => ({
      icon: iconForHighlightKey(h.iconKey),
      text: h.text,
    }));
}

export interface ServiceBadge {
  key: string;
  label: string;
  Icon: LucideIcon;
  on: boolean;
}

export function serviceBadges(services?: PackageServices): ServiceBadge[] {
  const s = services || {};
  return [
    { key: "transport", label: "Transport", Icon: Bus, on: Boolean(s.transport) },
    { key: "visa", label: "Visa", Icon: ShieldCheck, on: Boolean(s.visa) },
    { key: "ticket", label: "Ticket", Icon: Ticket, on: Boolean(s.ticket) },
    { key: "hotel", label: "Hotel", Icon: Hotel, on: Boolean(s.hotel) },
    { key: "ziyarat", label: "Ziyarat", Icon: MapPin, on: Boolean(s.ziyarat) },
  ].filter((x) => x.on);
}

export const JOURNEY_STAGE_LABEL: Record<JourneyStage, string> = {
  scheduled: "Scheduled",
  flight_takeoff: "Flight takeoff",
  jeddah_airport: "Jeddah airport",
  in_jeddah: "In Jeddah",
  ziyarat: "Ziyarat",
  in_makkah: "In Makkah",
  in_madinah: "In Madinah",
  makkah_airport: "Makkah airport",
  return_flight: "Return flight",
  completed: "Completed",
};

export const JOURNEY_STAGE_ORDER: JourneyStage[] = [
  "scheduled",
  "flight_takeoff",
  "jeddah_airport",
  "in_jeddah",
  "ziyarat",
  "in_madinah",
  "in_makkah",
  "makkah_airport",
  "return_flight",
  "completed",
];

export function journeyChain(pkg: Package): string {
  const raw = Array.isArray(pkg?.journeyStages) ? pkg.journeyStages : [];
  const selected = new Set(raw.map((s) => String(s || "").trim()).filter(Boolean));
  const ordered = JOURNEY_STAGE_ORDER.filter((id) => selected.has(id));
  const labels = ordered.map((id) => JOURNEY_STAGE_LABEL[id] || id);
  return labels.join(" → ");
}
