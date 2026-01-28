import { Navbar } from "@/components/Navbar";
import { BeybladeCard } from "@/components/BeybladeCard";
import { RecentBattle } from "@/components/RecentBattle";
import { Swords, Users, Zap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const topBeyblades = [
  { name: "Valkyrie Wing", type: "Attack" as const, attack: 85, defense: 45, stamina: 60, wins: 12, losses: 4 },
  { name: "Longinus Destroy", type: "Attack" as const, attack: 92, defense: 38, stamina: 55, wins: 9, losses: 5 },
  { name: "Spriggan Requiem", type: "Balance" as const, attack: 75, defense: 70, stamina: 75, wins: 15, losses: 3 },
];

const recentBattles = [
  { player1: "Alex", player2: "Jordan", bey1: "Valkyrie Wing", bey2: "Longinus", winner: 1 as const, date: "Today" },
  { player1: "Sam", player2: "Riley", bey1: "Spriggan", bey2: "Achilles", winner: 2 as const, date: "Yesterday" },
  { player1: "Casey", player2: "Morgan", bey1: "Fafnir", bey2: "Valkyrie", winner: 1 as const, date: "2 days ago" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero - Simple & Personal */}
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Track your battles</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Your <span className="text-gradient-primary">Beyblade</span> Battle Log
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Keep track of battles, stats, and collections for your local league. 
            Perfect for family tournaments and friendly competitions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/dashboard">
                <Plus className="w-5 h-5 mr-2" />
                Log a Battle
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/inventory">View Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-gradient-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Swords className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground">36</p>
              <p className="text-sm text-muted-foreground">Total Battles</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-card border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground">4</p>
              <p className="text-sm text-muted-foreground">Bladers</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Beyblades</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Beyblades & Recent Battles */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Top Beyblades */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Top <span className="text-gradient-accent">Performers</span>
              </h2>
              <div className="space-y-4">
                {topBeyblades.map((bey, i) => (
                  <BeybladeCard key={i} {...bey} />
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4" asChild>
                <Link to="/inventory">View All Beyblades →</Link>
              </Button>
            </div>

            {/* Recent Battles */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Recent <span className="text-gradient-primary">Battles</span>
              </h2>
              <div className="space-y-4">
                {recentBattles.map((battle, i) => (
                  <RecentBattle key={i} {...battle} />
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4" asChild>
                <Link to="/dashboard">View All Battles →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border mt-8">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <Swords className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-gradient-primary">BeyTracker</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Track. Battle. Have Fun!
          </p>
        </div>
      </footer>
    </div>
  );
}
