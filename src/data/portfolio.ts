// Central, editable portfolio content. Replace placeholders with real work.
import addisPoster from "@/assets/WhatsApp Image 2026-11-03 at 6.41.19 PM.jpeg";
import safariPoster from "@/assets/WhatsApp Image 2026-11-03 at 6.41.19 PM (1).jpeg";
import mbudyaPoster from "@/assets/WhatsApp Image 2026-11-03 at 6.41.20 PM.jpeg";
import lodgePoster from "@/assets/WhatsApp Image 2026-11-03 at 6.41.20 PM (1).jpeg";
import zanzibarPoster from "@/assets/WhatsApp Image 2026-11-03 at 6.41.21 PM.jpeg";
import appreciationPoster from "@/assets/WhatsApp Image 2026-11-03 at 6.41.22 PM.jpeg";
import zanzibarCampaign from "@/assets/WhatsApp Image 2026-11-03 at 6.41.22 PM (1).jpeg";

export type Category = "Web Development" | "Graphics Design" | "UI/UX" | "Branding";

export type Project = {
  name: string;
  description: string;
  category: Category;
  year: string;
  tools: string[];
  image: string;
  live?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    name: "Addis Ababa — Festive Escape",
    description: "A colorful travel poster promoting a festive city break in Ethiopia.",
    category: "Graphics Design",
    year: "2026",
    tools: ["Travel Campaign", "Poster Design"],
    image: addisPoster,
  },
  {
    name: "Mikumi & Udzungwa Safari",
    description: "A wildlife tour poster highlighting a weekend safari itinerary.",
    category: "Graphics Design",
    year: "2026",
    tools: ["Tourism", "Poster Design"],
    image: safariPoster,
  },
  {
    name: "Mbudya Island Tour",
    description: "A bright island getaway promotion with activities and package details.",
    category: "Graphics Design",
    year: "2026",
    tools: ["Travel Campaign", "Poster Design"],
    image: mbudyaPoster,
  },
  {
    name: "Maple Villa Lodge",
    description: "A hospitality promo showcasing the lodge, rooms, and guest amenities.",
    category: "Branding",
    year: "2026",
    tools: ["Hospitality", "Advertising"],
    image: lodgePoster,
  },
  {
    name: "Zanzibar Tour — Run Africa",
    description: "A destination campaign featuring Zanzibar experiences and tour details.",
    category: "Graphics Design",
    year: "2026",
    tools: ["Travel Campaign", "Poster Design"],
    image: zanzibarPoster,
  },
  {
    name: "Run Africa — Customer Appreciation",
    description: "A warm social campaign celebrating customers and memorable trips.",
    category: "Graphics Design",
    year: "2026",
    tools: ["Social Campaign", "Visual Design"],
    image: appreciationPoster,
  },
  {
    name: "Zanzibar Vibes",
    description: "A bold holiday poster promoting a coastal escape and island activities.",
    category: "Graphics Design",
    year: "2026",
    tools: ["Travel Campaign", "Poster Design"],
    image: zanzibarCampaign,
  },
];

export const gallery = [
  { title: "Addis Ababa Escape", category: "Travel Poster", image: addisPoster },
  { title: "Mbudya Island", category: "Tour Promotion", image: mbudyaPoster },
  { title: "Maple Villa Lodge", category: "Hospitality Campaign", image: lodgePoster },
  { title: "Zanzibar Vibes", category: "Travel Campaign", image: zanzibarCampaign },
];

export const stats = [
  { value: "—", label: "Projects completed" },
  { value: "—", label: "Design projects" },
  { value: "—", label: "Technologies explored" },
  { value: "—", label: "Years experience" },
];

export const testimonials = [
  {
    name: "Client name",
    role: "Position, Company",
    quote: "Your genuine client feedback will appear here once provided.",
  },
  {
    name: "Client name",
    role: "Position, Company",
    quote: "Testimonials are placeholders until real ones are added.",
  },
];

export const contact = {
  email: "travellermark56@gmail.com",
  phone: "255654996229",
  location: "Dar es Salaam, Tanzania",
};
