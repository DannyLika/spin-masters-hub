import { Swords, Trophy, Users, Zap } from "lucide-react";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Spinning rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-accent/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" style={{ animationDuration: '6s' }} />
        
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative z-10 px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-float">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Track. Battle. Dominate.</span>
        </div>

        {/* Main heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="text-foreground">Master Your</span>
          <br />
          <span className="text-gradient-primary">Beyblade Journey</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          The ultimate platform to track tournaments, manage your Beyblade collection, 
          analyze battle statistics, and climb the global rankings.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button variant="hero" size="xl">
            <Swords className="w-5 h-5 mr-2" />
            Start Tracking
          </Button>
          <Button variant="outline" size="xl">
            <Trophy className="w-5 h-5 mr-2" />
            Browse Tournaments
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <StatItem icon={Users} value="10,000+" label="Bladers" />
          <StatItem icon={Swords} value="50,000+" label="Battles Tracked" />
          <StatItem icon={Trophy} value="500+" label="Tournaments" />
          <StatItem value="99%" label="Uptime" icon={Zap} />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function StatItem({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mb-2">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
