import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { BeybladeCard } from "@/components/BeybladeCard";
import { RecentBattle } from "@/components/RecentBattle";
import { Trophy, Swords, Target, TrendingUp, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const userBeyblades = [
  { name: "Valkyrie Wing", type: "Attack" as const, attack: 85, defense: 45, stamina: 60, wins: 127, losses: 43 },
  { name: "Longinus Destroy", type: "Attack" as const, attack: 92, defense: 38, stamina: 55, wins: 98, losses: 52 },
  { name: "Spriggan Requiem", type: "Balance" as const, attack: 75, defense: 70, stamina: 75, wins: 156, losses: 44 },
  { name: "Fafnir Phoenix", type: "Stamina" as const, attack: 50, defense: 65, stamina: 95, wins: 89, losses: 31 },
];

const recentBattles = [
  { player1: "You", player2: "SpinKing99", bey1: "Valkyrie Wing", bey2: "Longinus", winner: 1 as const, date: "2 hours ago", tournament: "Regional Showdown" },
  { player1: "You", player2: "NovaSpin", bey1: "Spriggan", bey2: "Achilles", winner: 1 as const, date: "3 hours ago" },
  { player1: "BeyBlade_Pro", player2: "You", bey1: "Fafnir", bey2: "Valkyrie", winner: 1 as const, date: "5 hours ago" },
  { player1: "You", player2: "PhoenixRise", bey1: "Longinus", bey2: "Valkyrie", winner: 2 as const, date: "1 day ago" },
];

const upcomingTournaments = [
  { name: "Weekly Showdown #48", date: "Tomorrow, 7PM", registered: true },
  { name: "Regional Championship", date: "March 15, 2024", registered: false },
  { name: "Community Cup #49", date: "March 20, 2024", registered: true },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome back, <span className="text-gradient-primary">DragonMaster</span>
            </h1>
            <p className="text-muted-foreground">Here's your battle overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard
              title="Total Battles"
              value="470"
              subtitle="This month"
              icon={Swords}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Win Rate"
              value="74.2%"
              subtitle="Last 100 battles"
              icon={Target}
              trend={{ value: 5, isPositive: true }}
            />
            <StatsCard
              title="Tournaments Won"
              value="12"
              subtitle="All time"
              icon={Trophy}
            />
            <StatsCard
              title="Global Rank"
              value="#142"
              subtitle="↑ 28 positions"
              icon={TrendingUp}
              trend={{ value: 28, isPositive: true }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* My Beyblades */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    My <span className="text-gradient-accent">Beyblades</span>
                  </h2>
                  <Button variant="outline" size="sm">
                    Add New
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {userBeyblades.map((bey, i) => (
                    <BeybladeCard key={i} {...bey} />
                  ))}
                </div>
              </section>

              {/* Recent Battles */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Recent <span className="text-gradient-primary">Battles</span>
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All →
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentBattles.map((battle, i) => (
                    <RecentBattle key={i} {...battle} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="rounded-xl bg-gradient-card border border-border p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="default" className="w-full justify-start">
                    <Swords className="w-4 h-4 mr-2" />
                    Log New Battle
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="w-4 h-4 mr-2" />
                    Find Tournament
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Award className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                </div>
              </div>

              {/* Upcoming Tournaments */}
              <div className="rounded-xl bg-gradient-card border border-border p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming
                </h3>
                <div className="space-y-4">
                  {upcomingTournaments.map((t, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.date}</p>
                      </div>
                      {t.registered ? (
                        <span className="text-xs font-medium text-green-400 bg-green-400/20 px-2 py-1 rounded">
                          Registered
                        </span>
                      ) : (
                        <Button variant="outline" size="sm">
                          Join
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="rounded-xl bg-gradient-card border border-border p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Win Rate Trend</h3>
                <div className="h-40 flex items-center justify-center border border-dashed border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Chart coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
