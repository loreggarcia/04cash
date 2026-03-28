"use client";

import { Zap, TrendingUp, Calendar, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";

export function FinancialImpact() {
  const outcomes = [
    {
      icon: Zap,
      label: "Zero ação manual",
      detail: "Regras executadas no primeiro centavo que cai na conta"
    },
    {
      icon: TrendingUp,
      label: "Previdência automática",
      detail: "20% já separado antes de você gastar"
    },
    {
      icon: Calendar,
      label: "Caixa organizado",
      detail: "Aluguel pago sempre na prioridade 1, sem risco de atraso"
    },
    {
      icon: Heart,
      label: "Paz financeira",
      detail: "A vida financeira se organiza sozinha enquanto você trabalha"
    }
  ];

  return (
    <Card className="border-line/80 bg-gradient-to-br from-card via-card to-secondary/80">
      <div className="flex flex-wrap items-start justify-between gap-4 px-6">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-green">Demo 3 · impacto real</div>
          <h3 className="mt-2 text-2xl font-semibold">A vida financeira se organiza enquanto você trabalha</h3>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Terminou a corrida. Abriu o app. E a rotina financeira já se cuidou sozinha.
          </p>
        </div>
        <StatusPill label="Benefício líquido" tone="success" />
      </div>

      <div className="grid gap-4 px-6 md:grid-cols-2">
        {outcomes.map((outcome) => {
          const Icon = outcome.icon;
          return (
            <div
              key={outcome.label}
              className="flex min-h-[112px] gap-4 rounded-2xl border border-line/50 bg-background/40 p-5 transition-all hover:border-line hover:bg-background/60"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-green/20 bg-green/5">
                <Icon className="h-5 w-5 text-green" />
              </div>
              <div>
                <div className="font-medium text-text">{outcome.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">{outcome.detail}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-green/20 bg-green/5 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-green">
          <Zap className="h-4 w-4" />
          O que muda de verdade
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Você não precisa mais lembrar de pagar aluguel. Não precisa mais se preocupar em separar previdência. 
          Não precisa checar quanto sobrou no fim do mês. O sistema faz tudo isso em zero segundos, toda vez que entra dinheiro.
        </p>
      </div>
    </Card>
  );
}
