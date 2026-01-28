import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { TournamentCard } from "@/components/TournamentCard";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";

const allTournaments = [
  { name: "World Championship 2024", date: "March 15, 2024", location: "Tokyo, Japan", participants: 156, maxParticipants: 256, status: "upcoming" as const, prizePool: "$10,000" },
  { name: "Regional Showdown", date: "LIVE NOW", location: "Los Angeles, USA", participants: 32, maxParticipants: 32, status: "live" as const, prizePool: "$2,500" },
  { name: "Community Cup #47", date: "Feb 28, 2024", location: "Online", participants: 64, maxParticipants: 64, status: "completed" as const },
  { name: "European Masters", date: "March 22, 2024", location: "Berlin, Germany", participants: 89, maxParticipants: 128, status: "upcoming" as const, prizePool: "$5,000" },
  { name: "Weekly Showdown #48", date: "March 5, 2024", location: "Online", participants: 45, maxParticipants: 64, status: "upcoming" as const },
  { name: "Asia Pacific League", date: "LIVE NOW", location: "Seoul, Korea", participants: 48, maxParticipants: 48, status: "live" as const, prizePool: "$3,000" },
  { name: "Community Cup #46", date: "Feb 21, 2024", location: "Online", participants: 64, maxParticipants: 64, status: "completed" as const },
  { name: "North American Open", date: "Feb 14, 2024", location: "New York, USA", participants: 128, maxParticipants: 128, status: "completed" as const, prizePool: "$4,000" },
];

type FilterStatus = "all" | "upcoming" | "live" | "completed";

export default function Tournaments() {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTournaments = allTournaments.filter((t) => {
    const matchesFilter = filter === "all" || t.status === filter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                <span className="text-gradient-primary">Tournaments</span>
              </h1>
              <p className="text-muted-foreground">Find and join competitive events</p>
            </div>
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Create Tournament
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(["all", "live", "upcoming", "completed"] as FilterStatus[]).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className="capitalize"
                >
                  {status === "live" && "🔴 "}
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament, i) => (
              <TournamentCard key={i} {...tournament} />
            ))}
          </div>

          {filteredTournaments.length === 0 && (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No tournaments found matching your criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
