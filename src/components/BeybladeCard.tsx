import { cn } from "@/lib/utils";

interface BeybladeCardProps {
  name: string;
  type: "Attack" | "Defense" | "Stamina" | "Balance";
  attack: number;
  defense: number;
  stamina: number;
  wins: number;
  losses: number;
  imageUrl?: string;
  className?: string;
}

const typeColors = {
  Attack: "from-red-500 to-orange-500",
  Defense: "from-blue-500 to-cyan-500",
  Stamina: "from-green-500 to-emerald-500",
  Balance: "from-purple-500 to-pink-500",
};

const typeIcons = {
  Attack: "⚔️",
  Defense: "🛡️",
  Stamina: "⏱️",
  Balance: "⚖️",
};

export function BeybladeCard({
  name,
  type,
  attack,
  defense,
  stamina,
  wins,
  losses,
  className,
}: BeybladeCardProps) {
  const winRate = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-gradient-card border border-border p-4 shadow-card transition-all duration-300 hover:scale-[1.02] hover:border-primary/50",
        className
      )}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", typeColors[type])} />
      </div>

      {/* Spinning indicator */}
      <div className="absolute -right-8 -top-8 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity">
        <div className="w-full h-full rounded-full border-4 border-dashed border-primary animate-spin-slow" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r",
                typeColors[type]
              )}
            >
              {typeIcons[type]} {type}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-display font-bold text-primary">{winRate}%</div>
            <div className="text-xs text-muted-foreground">Win Rate</div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-3">
          <StatBar label="ATK" value={attack} color="bg-red-500" />
          <StatBar label="DEF" value={defense} color="bg-blue-500" />
          <StatBar label="STA" value={stamina} color="bg-green-500" />
        </div>

        {/* Record */}
        <div className="flex justify-between text-sm border-t border-border pt-3">
          <div>
            <span className="text-green-400 font-bold">{wins}W</span>
            <span className="text-muted-foreground mx-1">-</span>
            <span className="text-red-400 font-bold">{losses}L</span>
          </div>
          <div className="text-muted-foreground">{wins + losses} battles</div>
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-display text-muted-foreground w-8">{label}</span>
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-bold text-foreground w-6 text-right">{value}</span>
    </div>
  );
}
