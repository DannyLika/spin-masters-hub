import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Download, Upload, Save } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import { normalizeBeybladeName } from "@/lib/beybladeUtils";

type PlayerRow = {
  id: string;
  display_name: string;
};

type BeybladeRow = {
  id: string;
  name: string;
  normalized_name: string | null;
};

type CsvRow = {
  id: string;
  matchId: string;
  player1: string;
  player1Bey: string;
  player1Score: string;
  player2: string;
  player2Bey: string;
  player2Score: string;
  winner: string;
  date: string;
  bursts: string;
  knockouts: string;
  extremeKnockouts: string;
  spinFinishes: string;
};

export default function CsvEditor() {
  const [players, setPlayers] = useState<PlayerRow[]>([]);
  const [beyblades, setBeyblades] = useState<BeybladeRow[]>([]);
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [player1Filter, setPlayer1Filter] = useState<Record<string, string>>({});
  const [player2Filter, setPlayer2Filter] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      const [playersRes, beybladesRes] = await Promise.all([
        supabase.from("players").select("id, display_name").order("display_name"),
        supabase.from("beyblades").select("id, name, normalized_name").order("name"),
      ]);

      if (playersRes.data) setPlayers(playersRes.data);
      if (beybladesRes.data) setBeyblades(beybladesRes.data);

      // Load existing CSV
      try {
        const response = await fetch(`/batch-import.csv?ts=${Date.now()}`);
        if (response.ok) {
          const text = await response.text();
          const lines = text.split(/\r?\n/).filter((line) => line.trim());
          if (lines.length > 1) {
            const headerCells = lines[0].split(",").map((c) => c.trim().toLowerCase());
            const dataRows: CsvRow[] = [];
            for (let i = 1; i < lines.length; i++) {
              const cells = lines[i].split(",").map((c) => c.trim());
              if (cells.length >= 8) {
                const getCol = (name: string) => {
                  const idx = headerCells.findIndex((h) => h === name.toLowerCase() || h === name.toLowerCase().replace("_", ""));
                  return idx >= 0 && idx < cells.length ? cells[idx] : "";
                };
                dataRows.push({
                  id: `row-${i}`,
                  matchId: getCol("match_id"),
                  player1: getCol("player1"),
                  player1Bey: getCol("player1_bey"),
                  player1Score: getCol("player1_score"),
                  player2: getCol("player2"),
                  player2Bey: getCol("player2_bey"),
                  player2Score: getCol("player2_score"),
                  winner: getCol("winner"),
                  date: getCol("date"),
                  bursts: getCol("bursts") || "0",
                  knockouts: getCol("knockouts") || "0",
                  extremeKnockouts: getCol("extreme_knockouts") || "0",
                  spinFinishes: getCol("spin_finishes") || "0",
                });
              }
            }
            setRows(dataRows);
          }
        }
      } catch (error) {
        console.error("Failed to load CSV:", error);
      }

      setIsLoading(false);
    };

    loadData();
  }, []);

  const addRow = () => {
    const newRow: CsvRow = {
      id: `row-${Date.now()}`,
      matchId: `match-${Date.now()}`,
      player1: "",
      player1Bey: "",
      player1Score: "0",
      player2: "",
      player2Bey: "",
      player2Score: "0",
      winner: "",
      date: new Date().toLocaleDateString("en-US"),
      bursts: "0",
      knockouts: "0",
      extremeKnockouts: "0",
      spinFinishes: "0",
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  const updateRow = (id: string, field: keyof CsvRow, value: string) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const getFilteredBeyblades = (rowId: string, isPlayer1: boolean) => {
    const filterKey = isPlayer1 ? player1Filter[rowId] || "" : player2Filter[rowId] || "";
    const search = filterKey.toLowerCase();
    if (!search) return beyblades.slice(0, 20);
    
    return beyblades
      .filter((bey) => {
        const name = bey.name.toLowerCase();
        const normalized = (bey.normalized_name || normalizeBeybladeName(bey.name)).toLowerCase();
        return name.includes(search) || normalized.includes(search);
      })
      .slice(0, 20);
  };

  const exportCsv = () => {
    const header = "match_id,player1,player1_bey,player1_score,player2,player2_bey,player2_score,winner,date,bursts,knockouts,extreme_knockouts,spin_finishes";
    const csvRows = rows.map((r) =>
      [
        r.matchId,
        r.player1,
        r.player1Bey,
        r.player1Score,
        r.player2,
        r.player2Bey,
        r.player2Score,
        r.winner,
        r.date,
        r.bursts,
        r.knockouts,
        r.extremeKnockouts,
        r.spinFinishes,
      ].join(",")
    );
    const csv = [header, ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "batch-import.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              CSV <span className="text-gradient-primary">Editor</span>
            </h1>
            <p className="text-muted-foreground">
              Edit your battle import CSV with validated Beyblade selection
            </p>
          </div>

          <div className="mb-4 flex gap-2">
            <Button onClick={addRow} variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add Row
            </Button>
            <Button onClick={exportCsv} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="rounded-lg border border-border overflow-hidden bg-background">
            <div className="overflow-x-auto max-h-[calc(100vh-300px)]">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-secondary border-b-2 border-border">
                  <tr>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95">Match ID</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95">Player 1</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95">Bey 1</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95 w-16">Score 1</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95">Player 2</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95">Bey 2</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95 w-16">Score 2</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95">Winner</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95 w-24">Date</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95 w-16">Bursts</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95 w-16">KOs</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95 w-20">Extreme KOs</th>
                    <th className="px-2 py-1.5 text-left text-xs font-semibold text-foreground border-r border-border bg-secondary/95 w-20">Spin Finishes</th>
                    <th className="px-1 py-1.5 text-left text-xs font-semibold text-foreground bg-secondary/95 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={14} className="px-4 py-8 text-center text-muted-foreground border-r border-border">
                        No rows yet. Click "Add Row" to get started.
                      </td>
                    </tr>
                  ) : (
                    rows.map((row) => {
                      const player1BeyOptions = getFilteredBeyblades(row.id, true);
                      const player2BeyOptions = getFilteredBeyblades(row.id, false);

                      return (
                        <tr key={row.id} className="border-b border-border hover:bg-secondary/30">
                          <td className="px-1 py-0.5 border-r border-border">
                            <input
                              value={row.matchId}
                              onChange={(e) => updateRow(row.id, "matchId", e.target.value)}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded"
                              placeholder="match-001"
                            />
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <select
                              value={row.player1}
                              onChange={(e) => {
                                updateRow(row.id, "player1", e.target.value);
                                setPlayer1Filter({ ...player1Filter, [row.id]: "" });
                              }}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded cursor-pointer"
                            >
                              <option value="">-</option>
                              {players.map((p) => (
                                <option key={p.id} value={p.display_name}>
                                  {p.display_name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <div className="relative">
                              <input
                                value={row.player1Bey}
                                onChange={(e) => {
                                  updateRow(row.id, "player1Bey", e.target.value);
                                  setPlayer1Filter({ ...player1Filter, [row.id]: e.target.value });
                                }}
                                onFocus={() => {
                                  if (!player1Filter[row.id]) {
                                    setPlayer1Filter({ ...player1Filter, [row.id]: row.player1Bey });
                                  }
                                }}
                                className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded"
                                placeholder="Type..."
                                list={`bey1-${row.id}`}
                              />
                              <datalist id={`bey1-${row.id}`}>
                                {player1BeyOptions.map((bey) => (
                                  <option key={bey.id} value={bey.name} />
                                ))}
                              </datalist>
                            </div>
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <input
                              type="number"
                              value={row.player1Score}
                              onChange={(e) => updateRow(row.id, "player1Score", e.target.value)}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground text-right focus:outline-none focus:ring-1 focus:ring-primary rounded"
                            />
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <select
                              value={row.player2}
                              onChange={(e) => {
                                updateRow(row.id, "player2", e.target.value);
                                setPlayer2Filter({ ...player2Filter, [row.id]: "" });
                              }}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded cursor-pointer"
                            >
                              <option value="">-</option>
                              {players.map((p) => (
                                <option key={p.id} value={p.display_name}>
                                  {p.display_name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <div className="relative">
                              <input
                                value={row.player2Bey}
                                onChange={(e) => {
                                  updateRow(row.id, "player2Bey", e.target.value);
                                  setPlayer2Filter({ ...player2Filter, [row.id]: e.target.value });
                                }}
                                onFocus={() => {
                                  if (!player2Filter[row.id]) {
                                    setPlayer2Filter({ ...player2Filter, [row.id]: row.player2Bey });
                                  }
                                }}
                                className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded"
                                placeholder="Type..."
                                list={`bey2-${row.id}`}
                              />
                              <datalist id={`bey2-${row.id}`}>
                                {player2BeyOptions.map((bey) => (
                                  <option key={bey.id} value={bey.name} />
                                ))}
                              </datalist>
                            </div>
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <input
                              type="number"
                              value={row.player2Score}
                              onChange={(e) => updateRow(row.id, "player2Score", e.target.value)}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground text-right focus:outline-none focus:ring-1 focus:ring-primary rounded"
                            />
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <select
                              value={row.winner}
                              onChange={(e) => updateRow(row.id, "winner", e.target.value)}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded cursor-pointer"
                            >
                              <option value="">-</option>
                              <option value={row.player1}>{row.player1 || "Player 1"}</option>
                              <option value={row.player2}>{row.player2 || "Player 2"}</option>
                            </select>
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <input
                              value={row.date}
                              onChange={(e) => updateRow(row.id, "date", e.target.value)}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded"
                              placeholder="2/3/2026"
                            />
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <input
                              type="number"
                              value={row.bursts}
                              onChange={(e) => updateRow(row.id, "bursts", e.target.value)}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground text-right focus:outline-none focus:ring-1 focus:ring-primary rounded"
                            />
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <input
                              type="number"
                              value={row.knockouts}
                              onChange={(e) => updateRow(row.id, "knockouts", e.target.value)}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground text-right focus:outline-none focus:ring-1 focus:ring-primary rounded"
                            />
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <input
                              type="number"
                              value={row.extremeKnockouts}
                              onChange={(e) => updateRow(row.id, "extremeKnockouts", e.target.value)}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground text-right focus:outline-none focus:ring-1 focus:ring-primary rounded"
                            />
                          </td>
                          <td className="px-1 py-0.5 border-r border-border">
                            <input
                              type="number"
                              value={row.spinFinishes}
                              onChange={(e) => updateRow(row.id, "spinFinishes", e.target.value)}
                              className="w-full h-7 bg-transparent border-0 px-1.5 text-xs text-foreground text-right focus:outline-none focus:ring-1 focus:ring-primary rounded"
                            />
                          </td>
                          <td className="px-1 py-0.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRow(row.id)}
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
