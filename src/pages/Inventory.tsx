import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BeybladeCard } from "@/components/BeybladeCard";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Grid, List } from "lucide-react";

const userInventory = [
  { name: "Valkyrie Wing", type: "Attack" as const, attack: 85, defense: 45, stamina: 60, wins: 127, losses: 43 },
  { name: "Longinus Destroy", type: "Attack" as const, attack: 92, defense: 38, stamina: 55, wins: 98, losses: 52 },
  { name: "Spriggan Requiem", type: "Balance" as const, attack: 75, defense: 70, stamina: 75, wins: 156, losses: 44 },
  { name: "Fafnir Phoenix", type: "Stamina" as const, attack: 50, defense: 65, stamina: 95, wins: 89, losses: 31 },
  { name: "Achilles Brave", type: "Attack" as const, attack: 88, defense: 52, stamina: 48, wins: 67, losses: 28 },
  { name: "Diabolos Kaiser", type: "Balance" as const, attack: 78, defense: 68, stamina: 72, wins: 45, losses: 22 },
  { name: "Dragon Blaze", type: "Attack" as const, attack: 90, defense: 35, stamina: 50, wins: 112, losses: 58 },
  { name: "Pegasus Storm", type: "Stamina" as const, attack: 55, defense: 60, stamina: 92, wins: 78, losses: 34 },
];

type FilterType = "all" | "Attack" | "Defense" | "Stamina" | "Balance";

export default function Inventory() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredBeyblades = userInventory.filter((b) => {
    const matchesFilter = filter === "all" || b.type === filter;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalWins = userInventory.reduce((acc, b) => acc + b.wins, 0);
  const totalLosses = userInventory.reduce((acc, b) => acc + b.losses, 0);
  const overallWinRate = Math.round((totalWins / (totalWins + totalLosses)) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                My <span className="text-gradient-accent">Inventory</span>
              </h1>
              <p className="text-muted-foreground">
                {userInventory.length} Beyblades • {overallWinRate}% Overall Win Rate
              </p>
            </div>
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add Beyblade
            </Button>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg bg-gradient-card border border-border p-4 text-center">
              <div className="font-display text-2xl font-bold text-foreground">{userInventory.length}</div>
              <div className="text-sm text-muted-foreground">Total Beys</div>
            </div>
            <div className="rounded-lg bg-gradient-card border border-border p-4 text-center">
              <div className="font-display text-2xl font-bold text-green-400">{totalWins}</div>
              <div className="text-sm text-muted-foreground">Total Wins</div>
            </div>
            <div className="rounded-lg bg-gradient-card border border-border p-4 text-center">
              <div className="font-display text-2xl font-bold text-red-400">{totalLosses}</div>
              <div className="text-sm text-muted-foreground">Total Losses</div>
            </div>
            <div className="rounded-lg bg-gradient-card border border-border p-4 text-center">
              <div className="font-display text-2xl font-bold text-primary">{overallWinRate}%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 flex-wrap">
              {(["all", "Attack", "Defense", "Stamina", "Balance"] as FilterType[]).map((type) => (
                <Button
                  key={type}
                  variant={filter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(type)}
                >
                  {type === "all" ? "All Types" : type}
                </Button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 border border-border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Inventory Grid */}
          <div className={viewMode === "grid" 
            ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredBeyblades.map((bey, i) => (
              <BeybladeCard key={i} {...bey} />
            ))}
          </div>

          {filteredBeyblades.length === 0 && (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No Beyblades found matching your criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
