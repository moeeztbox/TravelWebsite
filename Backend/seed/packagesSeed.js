import Package from "../models/packageModel.js";

const SEED_PACKAGES = [
  {
    packageId: "economy-umrah",
    order: 1,
    title: "Economy Umrah",
    subtitle: "Perfect for First-Time Pilgrims",
    price: "PKR 185,000",
    duration: "10 Days",
    badge: "Most Popular",
    image:
      "https://images.unsplash.com/photo-1575101261474-5cb5653bb416?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      { iconKey: "hotel", text: "Close to Haram" },
      { iconKey: "plane", text: "Direct Flights" },
      { iconKey: "shield", text: "Full Insurance" },
      { iconKey: "users", text: "Group Support" },
    ],
    active: true,
  },
  {
    packageId: "economy-plus-umrah",
    order: 2,
    title: "Economy Plus Umrah",
    subtitle: "Luxury Experience for Sacred Journey",
    price: "PKR 750,000",
    duration: "21 Days",
    badge: "Premium Choice",
    image:
      "https://plus.unsplash.com/premium_photo-1676208761578-0523b6e3f233?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      { iconKey: "star", text: "5-Star Luxury" },
      { iconKey: "car", text: "Private Transport" },
      { iconKey: "clock", text: "24/7 Support" },
      { iconKey: "map-pin", text: "Premium Location" },
    ],
    active: true,
  },
  {
    packageId: "three-star-umrah",
    order: 3,
    title: "3 Star Umrah",
    subtitle: "Designed for Families with Children",
    price: "PKR 320,000",
    duration: "12 Days",
    badge: "Family Friendly",
    image:
      "https://images.unsplash.com/photo-1588994538331-5cc9ba0284c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      { iconKey: "users", text: "Family Focused" },
      { iconKey: "shield", text: "Child Safety" },
      { iconKey: "calendar", text: "Flexible Dates" },
      { iconKey: "hotel", text: "Family Rooms" },
    ],
    active: true,
  },
  {
    packageId: "four-star-umrah",
    order: 4,
    title: "4 Star Umrah",
    subtitle: "Designed for Families with Children",
    price: "PKR 320,000",
    duration: "12 Days",
    badge: "Family Friendly",
    image:
      "https://images.unsplash.com/photo-1588994538331-5cc9ba0284c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      { iconKey: "users", text: "Family Focused" },
      { iconKey: "shield", text: "Child Safety" },
      { iconKey: "calendar", text: "Flexible Dates" },
      { iconKey: "hotel", text: "Family Rooms" },
    ],
    active: true,
  },
  {
    packageId: "five-star-umrah",
    order: 5,
    title: "5 Star Umrah",
    subtitle: "Designed for Families with Children",
    price: "PKR 320,000",
    duration: "12 Days",
    badge: "Family Friendly",
    image:
      "https://images.unsplash.com/photo-1588994538331-5cc9ba0284c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      { iconKey: "users", text: "Family Focused" },
      { iconKey: "shield", text: "Child Safety" },
      { iconKey: "calendar", text: "Flexible Dates" },
      { iconKey: "hotel", text: "Family Rooms" },
    ],
    active: true,
  },
  {
    packageId: "ramadan-special-umrah",
    order: 6,
    title: "Ramadan Special Umrah",
    subtitle: "Designed for Families with Children",
    price: "PKR 320,000",
    duration: "12 Days",
    badge: "Family Friendly",
    image:
      "https://images.unsplash.com/photo-1588994538331-5cc9ba0284c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    highlights: [
      { iconKey: "users", text: "Family Focused" },
      { iconKey: "shield", text: "Child Safety" },
      { iconKey: "calendar", text: "Flexible Dates" },
      { iconKey: "hotel", text: "Family Rooms" },
    ],
    active: true,
  },
];

export async function seedPackagesIfEnabled() {
  const existing = await Package.find(
    { packageId: { $in: SEED_PACKAGES.map((p) => p.packageId) } },
    { packageId: 1 }
  ).lean();

  const existingIds = new Set(existing.map((e) => e.packageId));
  const missing = SEED_PACKAGES.filter((p) => !existingIds.has(p.packageId));
  if (missing.length === 0) {
    console.log("Packages seed: already exists (no missing packages).");
    return;
  }

  await Package.insertMany(missing, { ordered: false });
  console.log(`Seeded ${missing.length} package(s).`);
}

