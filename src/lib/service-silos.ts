export const SERVICE_SILOS = {
  "custom-wardrobes-closets-dubai": {
    name: "Wardrobes & Closets",
    title: "Custom Wardrobes & Luxury Closets Dubai",
    intro: "Made-to-measure wardrobes and closets planned around the space you have and the way you live. Explore the options below for your Dubai home.",
    wixCategory: "closets",
    children: {
      "walk-in-closet-design": { name: "Walk-in Closet Design", title: "Walk-in Closet Design Dubai", intro: "Explore walk-in closet layouts, storage zones and finishes tailored to your space in Dubai." },
      "built-in-wardrobes": { name: "Built-in Wardrobes", title: "Built-in Wardrobes Dubai", intro: "Fitted wardrobes designed to make use of every available wall and corner." },
      "sliding-doors-closets": { name: "Sliding Doors & Closets", title: "Sliding Door Closets Dubai", intro: "Space-conscious sliding doors and reach-in closet storage, designed to fit your room." },
      "arabic-wardrobes": { name: "Arabic Wardrobes", title: "تفصيل خزائن دبي | تفصيل كبتات دبي", intro: "Custom wardrobes in Dubai — تفصيل خزائن دبي وتفصيل كبتات دبي — with layouts and finishes shaped around your home." },
    },
  },
  "bespoke-joinery-dubai": {
    name: "Bespoke Joinery",
    title: "Premium Bespoke Joinery Services in Dubai",
    intro: "Individual pieces and architectural woodwork made to suit the proportions and character of your home.",
    wixCategory: "bespoke",
    children: {
      "custom-furniture": { name: "Custom Furniture", title: "Custom Furniture & Luxury Woodwork Dubai", intro: "Furniture designed for your space, from the initial dimensions to the finishing details." },
      "libraries-bookcases": { name: "Libraries & Bookcases", title: "Bespoke Libraries & Bookcases Dubai", intro: "Built-in bookcases and home libraries planned around your collection and your room." },
      "hidden-doors-wall-beds": { name: "Hidden Doors & Wall Beds", title: "Hidden Doors & Wall Beds Dubai", intro: "Discreet joinery solutions that make rooms work harder without compromising their character." },
    },
  },
  "living-media-storage": {
    name: "Living & Media Storage",
    title: "Bespoke Living Room & Media Storage Units",
    intro: "Storage and display joinery that makes living spaces feel considered, calm and personal.",
    wixCategory: "living",
    children: {
      "tv-wall-units": { name: "TV Wall Units", title: "Bespoke TV Wall Units Dubai", intro: "Media wall joinery with room for screens, equipment, display and concealed storage." },
      "shoe-cabinets-dressers": { name: "Shoe Cabinets & Dressers", title: "Shoe Cabinets & Luxury Dressers Dubai", intro: "Custom storage for shoes and everyday essentials, fitted to your entryway or bedroom." },
    },
  },
  "kitchen-laundry-renovations": {
    name: "Kitchen & Laundry",
    title: "Custom Kitchen Design & Laundry Room Joinery",
    intro: "Practical fitted joinery for the rooms you use every day, shaped around your routines and available space.",
    wixCategory: "kitchens",
    children: {
      "luxury-kitchens": { name: "Luxury Kitchens", title: "Luxury Custom Kitchens Dubai", intro: "Made-to-measure kitchen cabinetry and storage designed around how you cook and gather." },
      "laundry-room-storage": { name: "Laundry Room Storage", title: "Laundry Room Storage Solutions Dubai", intro: "Fitted cupboards, shelving and work surfaces to organise your laundry room." },
    },
  },
  "custom-cabinets-vanities": {
    name: "Cabinets & Vanities",
    title: "Custom Cabinets & Bespoke Vanity Units Dubai",
    intro: "Purpose-built cabinetry and vanities that bring order to the details of daily life.",
    wixCategory: "bespoke",
    children: {
      "bathroom-vanity-units": { name: "Bathroom Vanity Units", title: "Custom Bathroom Vanity Units Dubai", intro: "Bathroom vanities designed around your basin, storage needs and room dimensions." },
      "residential-cabinets": { name: "Residential Cabinets", title: "Custom Residential Cabinets Dubai", intro: "Made-to-measure cupboards and cabinet installation for the rooms of your home." },
    },
  },
} as const;

export type SiloSlug = keyof typeof SERVICE_SILOS;
export const SILO_KEYS = Object.keys(SERVICE_SILOS) as SiloSlug[];
export function isSiloSlug(value: string): value is SiloSlug {
  return Object.prototype.hasOwnProperty.call(SERVICE_SILOS, value);
}

export function getService(section: string, service: string) {
  if (!isSiloSlug(section)) return undefined;
  const children = SERVICE_SILOS[section].children as Record<string, { name: string; title: string; intro: string }>;
  return children[service];
}