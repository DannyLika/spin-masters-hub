import { Calendar, Users, Trophy, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface TournamentCardProps {
  name: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  status: "upcoming" | "live" | "completed";
  prizePool?: string;
  className?: string;
}

const statusStyles = {
  upcoming: {
    badge: "bg-accent/20 text-accent border-accent/50",
    text: "Upcoming",
  },
  live: {
    badge: "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse",
    text: "🔴 LIVE",
  },
  completed: {
    badge: "bg-muted text-muted-foreground border-muted",
    text: "Completed",
  },
};

export function TournamentCard({
  name,
  date,
  location,
  participants,
  maxParticipants,
  status,
  prizePool,
  className,
}: TournamentCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-gradient-card border border-border p-5 shadow-card transition-all duration-300 hover:border-primary/50 hover:shadow-glow",
        className
      )}
    >
      {/* Live indicator line */}
      {status === "live" && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-energy animate-pulse-glow" />
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <span
            className={cn(
              "inline-block text-xs font-display font-medium px-2 py-1 rounded border mb-2",
              statusStyles[status].badge
            )}
          >
            {statusStyles[status].text}
          </span>
          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>
        {prizePool && (
          <div className="text-right">
            <Trophy className="w-5 h-5 text-primary mb-1 ml-auto" />
            <span className="text-sm font-bold text-primary">{prizePool}</span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>
            {participants}/{maxParticipants} Players
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${(participants / maxParticipants) * 100}%` }}
          />
        </div>
      </div>

      <Button
        variant={status === "upcoming" ? "default" : "outline"}
        className="w-full"
        size="sm"
      >
        {status === "upcoming" ? "Register Now" : status === "live" ? "Watch Live" : "View Results"}
      </Button>
    </div>
  );
}
