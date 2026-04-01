import { Neighborhood } from "@/lib/types";

export const neighborhoods: Neighborhood[] = [
  { name: "North Beach", slug: "north-beach", accent: "#C0392B" },
  { name: "The Mission", slug: "the-mission", accent: "#E67E22" },
  { name: "Sausalito", slug: "sausalito", accent: "#2980B9" },
  { name: "Fisherman's Wharf", slug: "fishermans-wharf", accent: "#27AE60" },
  { name: "Chinatown", slug: "chinatown", accent: "#8E44AD" },
  { name: "The Castro", slug: "the-castro", accent: "#F39C12" },
  { name: "Haight-Ashbury", slug: "haight-ashbury", accent: "#D35400" },
  { name: "Nob Hill", slug: "nob-hill", accent: "#2C3E50" },
  { name: "SoMa", slug: "soma", accent: "#1ABC9C" },
  { name: "The Embarcadero", slug: "the-embarcadero", accent: "#3498DB" },
  { name: "Pacific Heights", slug: "pacific-heights", accent: "#9B59B6" },
  { name: "Marina District", slug: "marina-district", accent: "#1F6391" },
  { name: "Golden Gate Park", slug: "golden-gate-park", accent: "#27AE60" },
  { name: "Union Square", slug: "union-square", accent: "#E74C3C" },
  { name: "Russian Hill", slug: "russian-hill", accent: "#34495E" },
];

export function getNeighborhood(name: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.name === name);
}
