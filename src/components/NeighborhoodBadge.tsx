import { getNeighborhood } from "@/data/neighborhoods";

interface NeighborhoodBadgeProps {
  name: string;
}

export default function NeighborhoodBadge({ name }: NeighborhoodBadgeProps) {
  const neighborhood = getNeighborhood(name);
  const accent = neighborhood?.accent ?? "#2C3E50";

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold uppercase tracking-wider text-white"
      style={{ backgroundColor: accent }}
    >
      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
        <circle cx="4" cy="4" r="3" opacity="0.5" />
      </svg>
      {name}
    </span>
  );
}
