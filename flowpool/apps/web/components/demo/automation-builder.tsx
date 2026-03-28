"use client";

import { BrainCircuit, CheckCircle2, CircleDollarSign, GripVertical, Split, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";

const obligations = [
  { name: "Aluguel", amount: "R$ 300", priority: "Prioridade 1", status: "Paga primeiro" },
  { name: "Luz", amount: "R$ 90", priority: "Prioridade 2", status: "Fila operacional" },
  { name: "Fornecedor", amount: "R$ 140", priority: "Prioridade 3", status: "Aguarda liberação" }
];

const splitRules = [
  { label: "Uso operacional", value: "80%", tone: "info" as const },
  { label: "Previdência", value: "20%", tone: "success" as const }
];

export function AutomationBuilder() {
  return (
    <Card className="border-line/80 bg-gradient-to-br from-card via-card to-secondary/80">
      <div className="flex flex-wrap items-start justify-between gap-4 px-6">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-cyan">Demo 1 · cereb ro financeiro</div>
          <h3 className="mt-2 text-2xl font-semibold">Monte suas regras em uma tela</h3>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Defina obrigações, estabeleça prioridades, crie gatilhos automáticos. Decisões viram automação. Do zero para o controle total do caixa em dois minutos.
          </p>
        </div>
        <StatusPill label="Funcional" tone="success" />
      </div>

      <div className="grid items-start gap-5 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-line bg-background/40 p-5">
          <div className="mb-4 flex min-h-6 items-center gap-2 text-sm font-medium text-text">
            <GripVertical className="h-4 w-4 text-cyan" />
            Obrigações (arraste para reordenar)
          </div>
          <div className="space-y-3">
            {obligations.map((item) => (
              <div 
                key={item.name} 
                className="group grid min-h-[84px] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 rounded-2xl border border-line/60 bg-panelAlt/40 px-4 py-4 transition-all hover:border-line hover:bg-panelAlt/80"
              >
                <div className="min-w-0">
                  <div className="font-medium">{item.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.status}</div>
                </div>
                <div className="justify-self-end">
                  <StatusPill label={item.priority} tone={item.name === "Aluguel" ? "success" : "neutral"} />
                </div>
                <span className="min-w-[68px] justify-self-end text-right text-sm font-semibold text-cyan">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-line bg-background/40 p-5">
            <div className="flex min-h-6 items-center gap-2 text-sm font-medium text-text">
              <Zap className="h-4 w-4 text-amber" />
              Gatilho de execução
            </div>
            <div className="mt-4 rounded-2xl border border-amber/30 bg-amber/5 p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Quando o saldo chegar em</div>
              <div className="mt-3 text-3xl font-bold text-text">R$ 300</div>
              <div className="mt-3 text-sm font-medium text-amber">» Aluguel sai automaticamente</div>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-background/40 p-5">
            <div className="flex min-h-6 items-center gap-2 text-sm font-medium text-text">
              <Split className="h-4 w-4 text-cyan" />
              Split programado (saldo restante)
            </div>
            <div className="mt-4 space-y-3">
              {splitRules.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-line/50 bg-panelAlt/40 px-4 py-4 transition-all hover:border-line">
                  <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
                  <div className="inline-flex min-w-[72px] items-center justify-end rounded-lg border border-line/60 bg-background/40 px-3 py-2">
                    <span className="text-sm font-bold text-cyan">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-green/20 bg-green/5 p-5">
            <div className="flex min-h-6 items-center gap-2 text-sm font-medium text-green">
              <BrainCircuit className="h-4 w-4" />
              Fluxo automático
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green" />
                Regras saem armadas antes de qualquer Pix entrar
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green" />
                Prioridade garante que o essencial sair primeiro
              </div>
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-4 w-4 text-green" />
                Saldo sobra? Já está dividido 80/20 sem ação manual
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
