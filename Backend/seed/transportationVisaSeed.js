import TransportationOption from "../models/transportationOption.js";
import VisaOption from "../models/visaOption.js";

const VEH = [
  "Economy Car (1–3 pax)",
  "SUV / MPV (1–6 pax)",
  "Mini Bus (7–14 pax)",
  "Bus (15–30 pax)",
];

export async function seedTransportationAndVisaOptions() {
  const tCount = await TransportationOption.countDocuments();
  if (tCount === 0) {
    await TransportationOption.insertMany([
      {
        key: "tr-air-econ",
        title: "Airport transfer — Economy",
        description: "Meet & greet, standard luggage, sedan or compact SUV.",
        priceLabel: "PKR 2,800 / pax",
        priceAmount: 2800,
        serviceTypes: ["airport", "haram"],
        vehicleTypes: [VEH[0], VEH[1]],
      },
      {
        key: "tr-mk-md",
        title: "Makkah ↔ Madinah — Intercity",
        description: "Direct intercity ride with rest stop on request.",
        priceLabel: "PKR 4,500 / pax",
        priceAmount: 4500,
        serviceTypes: ["intercity", "ziyarat"],
        vehicleTypes: VEH,
      },
      {
        key: "tr-ziy-full",
        title: "Ziyarat full day",
        description: "Private ziyarat circuit with driver waiting time.",
        priceLabel: "PKR 6,200 / pax",
        priceAmount: 6200,
        serviceTypes: ["ziyarat"],
        vehicleTypes: [VEH[1], VEH[2]],
      },
      {
        key: "tr-haram-shuttle",
        title: "Haram area shuttle",
        description: "Short hops around the Haram zone (hotels / gates).",
        priceLabel: "PKR 1,900 / pax",
        priceAmount: 1900,
        serviceTypes: ["haram"],
        vehicleTypes: [VEH[0], VEH[1]],
      },
    ]);
    console.log("Seeded transportation options.");
  }

  const vCount = await VisaOption.countDocuments();
  if (vCount === 0) {
    await VisaOption.insertMany([
      {
        key: "visa-umrah-std",
        title: "Umrah visa — Standard",
        description: "Standard processing timeline, e-visa support.",
        priceLabel: "USD 90 / person",
        priceAmount: 90,
        tier: "standard",
        visaTypes: ["umrah"],
      },
      {
        key: "visa-umrah-prem",
        title: "Umrah visa — Premium",
        description: "Priority queue and dedicated coordinator.",
        priceLabel: "USD 120 / person",
        priceAmount: 120,
        tier: "premium",
        visaTypes: ["umrah"],
      },
      {
        key: "visa-visit-std",
        title: "Visit visa — Standard",
        description: "Tourism / family visit — standard service.",
        priceLabel: "USD 75 / person",
        priceAmount: 75,
        tier: "standard",
        visaTypes: ["visit", "transit"],
      },
      {
        key: "visa-hajj-std",
        title: "Hajj visa — Standard",
        description: "Aligned with approved Hajj season packages.",
        priceLabel: "USD 140 / person",
        priceAmount: 140,
        tier: "standard",
        visaTypes: ["hajj"],
      },
    ]);
    console.log("Seeded visa options.");
  }
}
