import { Navbar } from "@/components/Navbar";

export default function Tournaments() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="text-center py-24">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page not available
            </h1>
            <p className="text-muted-foreground">
              This section is hidden for now.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
