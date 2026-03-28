"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "./animated-counter";
import { MoniMascot } from "./moni-mascot";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(131,110,249,0.15),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-primary font-medium">Powered by Monad</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-8 text-balance">
              A Conta Inteligente para <span className="relative"><span className="gradient-text">Autonomos</span><span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" /></span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed text-pretty">
              O Moni te ajuda a transformar cada Pix em investimento automatico, com finalidade em 0.4s e taxas minimas. Previdencia descentralizada para todos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
              <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background text-base px-8 py-6 rounded-full group">
                Comecar Agora
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-border/50 hover:bg-secondary/50 text-base px-8 py-6 rounded-full">
                Conhecer o Moni
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <StatCard value={<AnimatedCounter end={10000} suffix="" />} label="TPS" />
              <StatCard value="0.4s" label="Finalidade" />
              <StatCard value="$0.01" label="Taxa media" />
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
            </div>
            <MoniMascot size="xl" speechBubble="Vamos construir seu futuro!" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}

function StatCard({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="text-center lg:text-left">
      <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );
}
