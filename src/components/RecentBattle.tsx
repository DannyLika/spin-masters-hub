import { cn } from "@/lib/utils";

interface RecentBattleProps {
  player1: string;
  player2: string;
  bey1: string;
  bey2: string;
  winner: 1 | 2;
  date: string;
  tournament?: string;
  className?: string;
}

export function RecentBattle({
  player1,
  player2,
  bey1,
  bey2,
  winner,
  date,
  tournament,
  className,
}: RecentBattleProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-gradient-card border border-border p-4 transition-all duration-300 hover:border-primary/30",
        className
      )}
    >
      {tournament && (
        <div className="text-xs text-accent font-medium mb-2">{tournament}</div>
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Player 1 */}
        <div className={cn("flex-1 text-center", winner === 1 && "")}>
          <div
            className={cn(
              "font-display font-bold text-lg transition-colors",
              winner === 1 ? "text-primary" : "text-foreground"
            )}
          >
            {player1}
          </div>
          <div className="text-xs text-muted-foreground">{bey1}</div>
          {winner === 1 && (
            <span className="inline-block mt-1 text-xs font-display font-bold text-primary bg-primary/20 px-2 py-0.5 rounded">
              WINNER
            </span>
          )}
        </div>

        {/* VS */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <span className="font-display font-bold text-muted-foreground">VS</span>
          </div>
        </div>

        {/* Player 2 */}
        <div className={cn("flex-1 text-center", winner === 2 && "")}>
          <div
            className={cn(
              "font-display font-bold text-lg transition-colors",
              winner === 2 ? "text-primary" : "text-foreground"
            )}
          >
            {player2}
          </div>
          <div className="text-xs text-muted-foreground">{bey2}</div>
          {winner === 2 && (
            <span className="inline-block mt-1 text-xs font-display font-bold text-primary bg-primary/20 px-2 py-0.5 rounded">
              WINNER
            </span>
          )}
        </div>
      </div>

      <div className="text-xs text-muted-foreground text-center mt-3">{date}</div>
    </div>
  );
}
