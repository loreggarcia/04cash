"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, PlayCircle, Vault } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";

type StepState = "idle" | "below_threshold" | "executed";

const threshold = 300;

export function PoolExecutionDemo() {
  const [totalInflow, setTotalInflow] = useState(0);
  const [lastDeposit, setLastDeposit] = useState<number | null>(null);

  const state = useMemo<StepState>(() => {
    if (totalInflow >= threshold) return "executed";
    if (totalInflow > 0) return "below_threshold";
    return "idle";
  }, [totalInflow]);

  const rentPaid = state === "executed" ? 300 : 0;
  const remaining = Math.max(totalInflow - rentPaid, 0);
  const operational = Number((remaining * 0.8).toFixed(2));
  const pension = Number((remaining * 0.2).toFixed(2));

  const timeline = [
    {
      title: "Pix entra na pool programável",
      detail: lastDeposit ? `Novo aporte de R$ ${lastDeposit}` : "O dinheiro passa primeiro pelo cofre inteligente",
      active: totalInflow > 0
    },
    {
      title: "Sistema avalia o gatilho de R$ 300",
      detail: totalInflow >= threshold ? "Meta atingida. Execução automática liberada." : `Saldo atual: R$ ${totalInflow} de R$ ${threshold}`,
      active: totalInflow > 0
    },
    {
      title: "Aluguel é pago automaticamente",
      detail: state === "executed" ? "R$ 300 debitados conforme prioridade configurada." : "Nenhuma obrigação executada ainda.",
      active: state === "executed"
    },
    {
      title: "Saldo restante é dividido",
      detail: state === "executed" ? `R$ ${operational} para uso e R$ ${pension} para previdência.` : "O split só acontece depois do gatilho.",
      active: state === "executed"
    }
  ];

  return (
    <Card className="border-line/80 bg-gradient-to-br from-card via-card to-secondary/80">
      <div className="flex flex-wrap items-start justify-between gap-4 px-6">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-cyan">Demo 2 · execução em tempo real</div>
          <h3 className="mt-2 text-2xl font-semibold">O Pix cai. A pool decide. Tudo executa sozinho.</h3>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Todo dinheiro passa por um cofre inteligente. Milissegundos depois, o gatilho é checado, a obrigação prioritária sai, e o resto já fica dividido.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill label={`Meta: R$ ${threshold}`} tone="warning" />
          <StatusPill label={state === "executed" ? "✓ Executado" : "⏳ Aguardando"} tone={state === "executed" ? "success" : "info"} />
        </div>
      </div>

      <div className="grid gap-5 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-line bg-background/40 p-5">
          <div className="flex flex-wrap gap-3">
            <Button
              className="gap-2"
              onClick={() => {
                setLastDeposit(150);
                setTotalInflow((current) => current + 150);
              }}
            >
              <PlayCircle className="h-4 w-4" />
              Simula Pix R$ 150
            </Button>
            <Button
              variant="secondary"
              className="gap-2"
              onClick={() => {
                setLastDeposit(200);
                setTotalInflow((current) => current + 200);
              }}
            >
              <PlayCircle className="h-4 w-4" />
              +R$ 200 (atinge meta)
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => {
                setLastDeposit(null);
                setTotalInflow(0);
              }}
            >
              Zerar demo
            </Button>
          </div>

          <div className="mt-5 rounded-3xl border border-cyan/30 bg-cyan/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan/30 bg-cyan/10">
                <Vault className="h-5 w-5 text-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted">Cofre programável (pool)</div>
                <div className="text-3xl font-bold text-cyan">R$ {totalInflow.toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
              <span className="inline-block rounded-full bg-background/40 px-3 py-1">Pix entra</span>
              <ArrowRight className="h-4 w-4 text-cyan" />
              <span className="inline-block rounded-full bg-background/40 px-3 py-1">Pool</span>
              <ArrowRight className="h-4 w-4 text-cyan" />
              <span className="inline-block rounded-full bg-background/40 px-3 py-1">Gatilho</span>
              <ArrowRight className="h-4 w-4 text-cyan" />
              <span className="inline-block rounded-full bg-background/40 px-3 py-1">Executa</span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className={`rounded-2xl border p-4 transition-all ${rentPaid > 0 ? "border-green/50 bg-green/5" : "border-line bg-background/30"}`}>
                <div className="text-sm font-medium text-muted">Aluguel pago</div>
                <div className={`mt-2 text-xl font-bold ${rentPaid > 0 ? "text-green" : "text-text"}`}>
                  R$ {rentPaid.toFixed(2)}
                </div>
              </div>
              <div className={`rounded-2xl border p-4 transition-all ${operational > 0 ? "border-cyan/50 bg-cyan/5" : "border-line bg-background/30"}`}>
                <div className="text-sm font-medium text-muted">Uso</div>
                <div className={`mt-2 text-xl font-bold ${operational > 0 ? "text-cyan" : "text-text"}`}>
                  R$ {operational.toFixed(2)}
                </div>
              </div>
              <div className={`rounded-2xl border p-4 transition-all ${pension > 0 ? "border-amber/50 bg-amber/5" : "border-line bg-background/30"}`}>
                <div className="text-sm font-medium text-muted">Previdência</div>
                <div className={`mt-2 text-xl font-bold ${pension > 0 ? "text-amber" : "text-text"}`}>
                  R$ {pension.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {timeline.map((item, index) => (
            <div 
              key={item.title} 
              className={`rounded-2xl border transition-all p-4 ${
                item.active 
                  ? "border-green/50 bg-green/5" 
                  : "border-line/50 bg-background/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-medium text-xs ${
                  item.active 
                    ? "bg-green/20 text-green" 
                    : "bg-line text-muted"
                }`}>
                  {item.active ? "✓" : index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-text">{item.title}</div>
                  <div className="mt-1 text-sm text-muted">{item.detail}</div>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-green/30 bg-green/5 p-4">
            <div className="text-sm font-semibold text-green">💡 Resultado na prática</div>
            <p className="mt-2 text-sm text-muted">
              Terminou a corrida. Abriu o app. O aluguel foi pago automaticamente. E quem trabalha já pode focar no que importa — o trabalho.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
