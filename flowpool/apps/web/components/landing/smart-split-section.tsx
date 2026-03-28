"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SmartSplitSection() {
  const [step, setStep] = useState(0);

  const pixAmount = 1500.0;
  const availablePercent = 70;
  const previdenciaPercent = 30;
  const availableAmount = (pixAmount * availablePercent) / 100;
  const previdenciaAmount = (pixAmount * previdenciaPercent) / 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="smart-split" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(131,110,249,0.1),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm text-primary font-medium tracking-wider uppercase mb-4">/ Smart Split</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Construa alem dos limites. <span className="text-muted-foreground">Escale sem compromisso.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              O 04Cash desbloqueia uma nova era de gestao financeira, permitindo produtos que nunca existiram antes. Cada Pix e automaticamente dividido entre sua conta disponivel e previdencia em tempo real.
            </p>

            <Button className="bg-foreground hover:bg-foreground/90 text-background rounded-full px-6 group">
              Saiba mais sobre Smart Split
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-secondary/50 border border-border/50 p-8 md:p-10">
              <div className="space-y-6">
                <div className={`p-6 rounded-2xl border transition-all duration-500 ${step >= 1 ? "bg-background/80 border-primary/50 scale-100" : "bg-background/40 border-border/50 scale-95 opacity-50"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Pix Recebido</p>
                      <p className="text-2xl md:text-3xl font-bold text-foreground">R$ {pixAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                    </div>
                    {step >= 1 && (
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Recebido</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`flex items-center justify-center gap-3 py-4 transition-all duration-500 ${step === 2 ? "opacity-100" : "opacity-0"}`}>
                  <Zap className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-sm text-primary font-medium">Processando Smart Split...</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-5 rounded-2xl border transition-all duration-500 ${
                      step >= 3 ? "bg-success/10 border-success/30 scale-100" : "bg-background/40 border-border/50 scale-95 opacity-50"
                    }`}
                    style={{ transitionDelay: "0ms" }}
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Disponivel</p>
                    <p className="text-xl md:text-2xl font-bold text-success">R$ {availableAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-success/20 text-success rounded-full">{availablePercent}%</span>
                      {step >= 4 && <span className="text-xs text-success/70">0.4s</span>}
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-2xl border transition-all duration-500 ${
                      step >= 3 ? "bg-primary/10 border-primary/30 scale-100" : "bg-background/40 border-border/50 scale-95 opacity-50"
                    }`}
                    style={{ transitionDelay: "100ms" }}
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Previdencia</p>
                    <p className="text-xl md:text-2xl font-bold text-primary">R$ {previdenciaAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">{previdenciaPercent}%</span>
                      {step >= 4 && <span className="text-xs text-primary/70">Investido</span>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-2 pt-4">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step >= s ? "w-8 bg-primary" : "w-2 bg-border"}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-success/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
