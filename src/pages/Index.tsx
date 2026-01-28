import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TournamentCard } from "@/components/TournamentCard";
import { BeybladeCard } from "@/components/BeybladeCard";
import { RecentBattle } from "@/components/RecentBattle";
import { StatsCard } from "@/components/StatsCard";
import { Trophy, Swords, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredTournaments = [
  {
    name: "World Championship 2024",
    date: "March 15, 2024",
    location: "Tokyo, Japan",
    participants: 156,
    maxParticipants: 256,
    status: "upcoming" as const,
    prizePool: "$10,000",
  },
  {
    name: "Regional Showdown",
    date: "LIVE NOW",
    location: "Los Angeles, USA",
    participants: 32,
    maxParticipants: 32,
    status: "live" as const,
    prizePool: "$2,500",
  },
  {
    name: "Community Cup #47",
    date: "Feb 28, 2024",
    location: "Online",
    participants: 64,
    maxParticipants: 64,
    status: "completed" as const,
  },
];

const topBeyblades = [
  { name: "Valkyrie Wing", type: "Attack" as const, attack: 85, defense: 45, stamina: 60, wins: 127, losses: 43 },
  { name: "Longinus Destroy", type: "Attack" as const, attack: 92, defense: 38, stamina: 55, wins: 98, losses: 52 },
  { name: "Spriggan Requiem", type: "Balance" as const, attack: 75, defense: 70, stamina: 75, wins: 156, losses: 44 },
];

const recentBattles = [
  { player1: "DragonMaster", player2: "SpinKing99", bey1: "Valkyrie Wing", bey2: "Longinus", winner: 1 as const, date: "2 hours ago", tournament: "Regional Showdown" },
  { player1: "BeyBlade_Pro", player2: "NovaSpin", bey1: "Spriggan", bey2: "Achilles", winner: 2 as const, date: "3 hours ago", tournament: "Regional Showdown" },
  { player1: "TurboBlader", player2: "PhoenixRise", bey1: "Fafnir", bey2: "Valkyrie", winner: 1 as const, date: "5 hours ago" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Featured Tournaments Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured <span className="text-gradient-primary">Tournaments</span>
              </h2>
              <p className="text-muted-foreground">Join the action and compete for glory</p>
            </div>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTournaments.map((tournament, i) => (
              <TournamentCard key={i} {...tournament} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 px-4 bg-gradient-card">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Battles"
              value="2,847"
              subtitle="This month"
              icon={Swords}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Win Rate"
              value="67%"
              subtitle="Last 100 battles"
              icon={Target}
              trend={{ value: 5, isPositive: true }}
            />
            <StatsCard
              title="Tournaments Won"
              value="23"
              subtitle="All time"
              icon={Trophy}
            />
            <StatsCard
              title="Global Rank"
              value="#142"
              subtitle="Out of 10,000+"
              icon={TrendingUp}
              trend={{ value: 28, isPositive: true }}
            />
          </div>
        </div>
      </section>

      {/* Top Beyblades & Recent Battles */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Top Beyblades */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Top <span className="text-gradient-accent">Beyblades</span>
              </h2>
              <div className="space-y-4">
                {topBeyblades.map((bey, i) => (
                  <BeybladeCard key={i} {...bey} />
                ))}
              </div>
            </div>

            {/* Recent Battles */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Recent <span className="text-gradient-primary">Battles</span>
              </h2>
              <div className="space-y-4">
                {recentBattles.map((battle, i) => (
                  <RecentBattle key={i} {...battle} />
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Battles →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-card border border-border p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to <span className="text-gradient-primary">Dominate</span>?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands of bladers tracking their journey. Create your profile, 
                log your battles, and rise through the ranks.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg">
                  Create Free Account
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <Swords className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-gradient-primary">BeyTracker</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 BeyTracker. Track. Battle. Dominate.
          </p>
        </div>
      </footer>
    </div>
  );
}
