import { getNeighborhood } from "@/data/neighborhoods";

interface NeighborhoodBadgeProps {
  name: string;
}

export default function NeighborhoodBadge({ name }: NeighborhoodBadgeProps) {
  const neighborhood = getNeighborhood(name);
  const accent = neighborhood?.accent ?? "#2C3E50";

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-body font-bold uppercase tracking-widest"
      style={{ color: accent, backgroundColor: `${accent}14` }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: accent }}
      />
      {name}
    </span>
  );
}
