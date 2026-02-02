import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/lib/supabaseClient";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Swords } from "lucide-react";

type PlayerRow = {
  id: string;
  display_name: string;
};

type BeybladeRow = {
  id: string;
  name: string;
  type: string;
};

type MatchStats = {
  total: number;
  wins: number;
  losses: number;
  winRate: number;
  bursts: number;
  knockouts: number;
  extremeKnockouts: number;
  spinFinishes: number;
};

type EventStats = {
  burst: number;
  knockout: number;
  extreme_knockout: number;
  spin_finish: number;
};

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b"];

export default function Reports() {
  const [players, setPlayers] = useState<PlayerRow[]>([]);
  const [beyblades, setBeyblades] = useState<BeybladeRow[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("all");
  const [selectedBey, setSelectedBey] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false);

  const [playerStats, setPlayerStats] = useState<Record<string, MatchStats>>({});
  const [beyStats, setBeyStats] = useState<Record<string, MatchStats>>({});
  const [typeStats, setTypeStats] = useState<Record<string, MatchStats>>({});
  const [eventStats, setEventStats] = useState<EventStats>({ burst: 0, knockout: 0, extreme_knockout: 0, spin_finish: 0 });
  const [overallStats, setOverallStats] = useState<MatchStats>({
    total: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    bursts: 0,
    knockouts: 0,
    extremeKnockouts: 0,
    spinFinishes: 0,
  });

  useEffect(() => {
    const checkSupabase = async () => {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (url && key) {
        setIsSupabaseConfigured(true);
        await loadData();
      } else {
        setIsSupabaseConfigured(false);
        setIsLoading(false);
      }
    };
    checkSupabase();
  }, []);

  useEffect(() => {
    if (isSupabaseConfigured) {
      loadStats();
    }
  }, [selectedPlayer, selectedBey, selectedType, isSupabaseConfigured]);

  const loadData = async () => {
    try {
      const [playersRes, beybladesRes] = await Promise.all([
        supabase.from("players").select("id, display_name").order("display_name"),
        supabase.from("beyblades").select("id, name, type").order("name"),
      ]);

      if (playersRes.data) setPlayers(playersRes.data);
      if (beybladesRes.data) setBeyblades(beybladesRes.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load data:", error);
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Fetch all matches
      const { data: matches, error: matchesError } = await supabase
        .from("matches")
        .select("id, winner_player_id");

      if (matchesError) throw matchesError;

      if (!matches || matches.length === 0) {
        setPlayerStats({});
        setBeyStats({});
        setTypeStats({});
        setEventStats({ burst: 0, knockout: 0, extreme_knockout: 0, spin_finish: 0 });
        setOverallStats({ total: 0, wins: 0, losses: 0, winRate: 0, bursts: 0, knockouts: 0, extremeKnockouts: 0, spinFinishes: 0 });
        return;
      }

      const matchIds = matches.map((m) => m.id);

      // Fetch participants
      let participantQuery = supabase
        .from("match_participants")
        .select("match_id, player_id, beyblade_id, is_winner, score")
        .in("match_id", matchIds);

      if (selectedPlayer !== "all") {
        participantQuery = participantQuery.eq("player_id", selectedPlayer);
      }
      if (selectedBey !== "all") {
        participantQuery = participantQuery.eq("beyblade_id", selectedBey);
      }

      const { data: participants, error: participantsError } = await participantQuery;
      if (participantsError) {
        console.error("Error fetching participants:", participantsError);
        throw participantsError;
      }
      
      if (!participants || participants.length === 0) {
        console.log("No participants found for matches:", matchIds);
        setPlayerStats({});
        setBeyStats({});
        setTypeStats({});
        setEventStats({ burst: 0, knockout: 0, extreme_knockout: 0, spin_finish: 0 });
        setOverallStats({ total: 0, wins: 0, losses: 0, winRate: 0, bursts: 0, knockouts: 0, extremeKnockouts: 0, spinFinishes: 0 });
        return;
      }

      // Fetch beyblades to get types
      const beyIds = [...new Set((participants || []).map((p: any) => p.beyblade_id))];
      const { data: beybladesData, error: beybladesError } = await supabase
        .from("beyblades")
        .select("id, type")
        .in("id", beyIds);

      if (beybladesError) throw beybladesError;

      // Create a map of beyblade_id -> type
      const beyTypeMap: Record<string, string> = {};
      if (beybladesData) {
        for (const bey of beybladesData) {
          beyTypeMap[bey.id] = bey.type || "Unknown";
        }
      }

      // Filter participants by type if needed
      let filteredParticipants = participants || [];
      if (selectedType !== "all" && participants) {
        filteredParticipants = participants.filter((p: any) => beyTypeMap[p.beyblade_id] === selectedType);
      }

      // Get unique match IDs from filtered participants
      const filteredMatchIds = new Set(filteredParticipants.map((p: any) => p.match_id));
      const filteredMatches = matches.filter((m) => filteredMatchIds.has(m.id));

      // Fetch events for filtered matches
      const { data: events, error: eventsError } = await supabase
        .from("match_events")
        .select("match_id, event_type, count")
        .in("match_id", Array.from(filteredMatchIds));

      if (eventsError) throw eventsError;

      // Calculate stats
      const playerStatsMap: Record<string, MatchStats> = {};
      const beyStatsMap: Record<string, MatchStats> = {};
      const typeStatsMap: Record<string, MatchStats> = {};
      const eventStatsMap: EventStats = { burst: 0, knockout: 0, extreme_knockout: 0, spin_finish: 0 };
      let overall: MatchStats = {
        total: 0,
        wins: 0,
        losses: 0,
        winRate: 0,
        bursts: 0,
        knockouts: 0,
        extremeKnockouts: 0,
        spinFinishes: 0,
      };

      // Process events
      if (events) {
        for (const event of events) {
          if (filteredMatchIds.has(event.match_id)) {
            if (event.event_type === "burst") eventStatsMap.burst += event.count || 0;
            if (event.event_type === "knockout") eventStatsMap.knockout += event.count || 0;
            if (event.event_type === "extreme_knockout") eventStatsMap.extreme_knockout += event.count || 0;
            if (event.event_type === "spin_finish") eventStatsMap.spin_finish += event.count || 0;
          }
        }
      }

      // Process participants
      if (filteredParticipants && filteredParticipants.length > 0) {
        for (const participant of filteredParticipants) {
          const playerId = participant.player_id;
          const beyId = participant.beyblade_id;
          const beyType = beyTypeMap[beyId] || "Unknown";
          const isWinner = participant.is_winner;

          // Player stats
          if (!playerStatsMap[playerId]) {
            playerStatsMap[playerId] = {
              total: 0,
              wins: 0,
              losses: 0,
              winRate: 0,
              bursts: 0,
              knockouts: 0,
              extremeKnockouts: 0,
              spinFinishes: 0,
            };
          }
          playerStatsMap[playerId].total++;
          if (isWinner) playerStatsMap[playerId].wins++;
          else playerStatsMap[playerId].losses++;

          // Bey stats
          if (!beyStatsMap[beyId]) {
            beyStatsMap[beyId] = {
              total: 0,
              wins: 0,
              losses: 0,
              winRate: 0,
              bursts: 0,
              knockouts: 0,
              extremeKnockouts: 0,
              spinFinishes: 0,
            };
          }
          beyStatsMap[beyId].total++;
          if (isWinner) beyStatsMap[beyId].wins++;
          else beyStatsMap[beyId].losses++;

          // Type stats
          if (!typeStatsMap[beyType]) {
            typeStatsMap[beyType] = {
              total: 0,
              wins: 0,
              losses: 0,
              winRate: 0,
              bursts: 0,
              knockouts: 0,
              extremeKnockouts: 0,
              spinFinishes: 0,
            };
          }
          typeStatsMap[beyType].total++;
          if (isWinner) typeStatsMap[beyType].wins++;
          else typeStatsMap[beyType].losses++;
        }
      }

      overall.total = filteredMatches.length;

      // Calculate win rates
      Object.keys(playerStatsMap).forEach((id) => {
        const stats = playerStatsMap[id];
        stats.winRate = stats.total > 0 ? (stats.wins / stats.total) * 100 : 0;
      });
      Object.keys(beyStatsMap).forEach((id) => {
        const stats = beyStatsMap[id];
        stats.winRate = stats.total > 0 ? (stats.wins / stats.total) * 100 : 0;
      });
      Object.keys(typeStatsMap).forEach((type) => {
        const stats = typeStatsMap[type];
        stats.winRate = stats.total > 0 ? (stats.wins / stats.total) * 100 : 0;
      });

      // Calculate overall stats
      overall.wins = Object.values(playerStatsMap).reduce((sum, s) => sum + s.wins, 0);
      overall.losses = Object.values(playerStatsMap).reduce((sum, s) => sum + s.losses, 0);
      // Win rate is average across all players
      const totalParticipantBattles = overall.wins + overall.losses;
      overall.winRate = totalParticipantBattles > 0 ? (overall.wins / totalParticipantBattles) * 100 : 0;
      overall.bursts = eventStatsMap.burst;
      overall.knockouts = eventStatsMap.knockout;
      overall.extremeKnockouts = eventStatsMap.extreme_knockout;
      overall.spinFinishes = eventStatsMap.spin_finish;

      setPlayerStats(playerStatsMap);
      setBeyStats(beyStatsMap);
      setTypeStats(typeStatsMap);
      setEventStats(eventStatsMap);
      setOverallStats(overall);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  // Prepare chart data
  const playerChartData = Object.entries(playerStats)
    .map(([id, stats]) => {
      const player = players.find((p) => p.id === id);
      return {
        name: player?.display_name || "Unknown",
        wins: stats.wins,
        losses: stats.losses,
        winRate: Number(stats.winRate.toFixed(1)),
      };
    })
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 10);

  const beyChartData = Object.entries(beyStats)
    .map(([id, stats]) => {
      const bey = beyblades.find((b) => b.id === id);
      return {
        name: bey?.name || "Unknown",
        wins: stats.wins,
        losses: stats.losses,
        winRate: Number(stats.winRate.toFixed(1)),
      };
    })
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 10);

  const typeChartData = Object.entries(typeStats).map(([type, stats]) => ({
    name: type,
    value: stats.total,
    wins: stats.wins,
    losses: stats.losses,
    winRate: Number(stats.winRate.toFixed(1)),
  }));

  const eventChartData = [
    { name: "Bursts", value: eventStats.burst, color: COLORS[0] },
    { name: "Knockouts", value: eventStats.knockout, color: COLORS[1] },
    { name: "Extreme Knockouts", value: eventStats.extreme_knockout, color: COLORS[2] },
    { name: "Spin Finishes", value: eventStats.spin_finish, color: COLORS[3] },
  ].filter((item) => item.value > 0);

  const winRateChartData = Object.entries(playerStats)
    .map(([id, stats]) => {
      const player = players.find((p) => p.id === id);
      return {
        name: player?.display_name || "Unknown",
        winRate: Number(stats.winRate.toFixed(1)),
      };
    })
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 8);

  const chartConfig = {
    wins: { label: "Wins", color: "#10b981" },
    losses: { label: "Losses", color: "#ef4444" },
    winRate: { label: "Win Rate %", color: "#3b82f6" },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Battle <span className="text-gradient-primary">Reports</span>
            </h1>
            <p className="text-muted-foreground">Analyze performance by blader, Beyblade, type, and events</p>
          </div>

          {!isSupabaseConfigured ? (
            <div className="rounded-xl bg-gradient-card border border-border p-8 text-center">
              <p className="text-muted-foreground">Supabase is not configured. Please set your environment variables.</p>
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="rounded-xl bg-gradient-card border border-border p-6 mb-8">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">Filters</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Blader</label>
                    <select
                      value={selectedPlayer}
                      onChange={(e) => setSelectedPlayer(e.target.value)}
                      className="h-10 w-full rounded-lg bg-secondary border border-border px-3 text-sm text-foreground"
                    >
                      <option value="all">All Bladers</option>
                      {players.map((player) => (
                        <option key={player.id} value={player.id}>
                          {player.display_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Beyblade</label>
                    <select
                      value={selectedBey}
                      onChange={(e) => setSelectedBey(e.target.value)}
                      className="h-10 w-full rounded-lg bg-secondary border border-border px-3 text-sm text-foreground"
                    >
                      <option value="all">All Beyblades</option>
                      {beyblades.map((bey) => (
                        <option key={bey.id} value={bey.id}>
                          {bey.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="h-10 w-full rounded-lg bg-secondary border border-border px-3 text-sm text-foreground"
                    >
                      <option value="all">All Types</option>
                      <option value="Attack">Attack</option>
                      <option value="Defense">Defense</option>
                      <option value="Stamina">Stamina</option>
                      <option value="Balance">Balance</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedPlayer("all");
                      setSelectedBey("all");
                      setSelectedType("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>

              {/* Overall Stats */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="rounded-xl bg-gradient-card border border-border p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Battles</span>
                    <Swords className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{overallStats.total}</div>
                </div>
                <div className="rounded-xl bg-gradient-card border border-border p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Win Rate</span>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{overallStats.winRate.toFixed(1)}%</div>
                </div>
                <div className="rounded-xl bg-gradient-card border border-border p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Wins</span>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{overallStats.wins}</div>
                </div>
                <div className="rounded-xl bg-gradient-card border border-border p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Losses</span>
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{overallStats.losses}</div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Player Win Rates */}
                <div className="rounded-xl bg-gradient-card border border-border p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">Top Blader Win Rates</h3>
                  {playerChartData.length > 0 ? (
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={playerChartData}>
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="winRate" fill="var(--color-winRate)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">No data available</p>
                  )}
                </div>

                {/* Beyblade Win Rates */}
                <div className="rounded-xl bg-gradient-card border border-border p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">Top Beyblade Win Rates</h3>
                  {beyChartData.length > 0 ? (
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={beyChartData}>
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="winRate" fill="var(--color-winRate)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">No data available</p>
                  )}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Event Distribution */}
                <div className="rounded-xl bg-gradient-card border border-border p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">Event Distribution</h3>
                  {eventChartData.length > 0 ? (
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <PieChart>
                        <Pie
                          data={eventChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {eventChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                      </PieChart>
                    </ChartContainer>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">No event data available</p>
                  )}
                </div>

                {/* Type Distribution */}
                <div className="rounded-xl bg-gradient-card border border-border p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">Battles by Type</h3>
                  {typeChartData.length > 0 ? (
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <PieChart>
                        <Pie
                          data={typeChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {typeChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                      </PieChart>
                    </ChartContainer>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">No type data available</p>
                  )}
                </div>
              </div>

              {/* Wins vs Losses Comparison */}
              <div className="rounded-xl bg-gradient-card border border-border p-6 mb-8">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Blader Performance (Wins vs Losses)</h3>
                {playerChartData.length > 0 ? (
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={playerChartData}>
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="wins" fill="var(--color-wins)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="losses" fill="var(--color-losses)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">No data available</p>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
