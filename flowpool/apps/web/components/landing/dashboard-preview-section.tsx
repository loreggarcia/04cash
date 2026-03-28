"use client";

import { ArrowRight, ArrowUpRight, TrendingUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", value: 2400 },
  { month: "Fev", value: 2800 },
  { month: "Mar", value: 3200 },
  { month: "Abr", value: 3600 },
  { month: "Mai", value: 4100 },
  { month: "Jun", value: 4800 },
  { month: "Jul", value: 5200 },
  { month: "Ago", value: 5900 }
];

const transactions = [
  { id: 1, description: "Pix Recebido - Cliente A", amount: 850.0, type: "in", time: "0.4s" },
  { id: 2, description: "Split Previdencia", amount: 255.0, type: "invest", time: "0.4s" },
  { id: 3, description: "Pix Recebido - Projeto B", amount: 1200.0, type: "in", time: "0.4s" }
];

export function DashboardPreviewSection() {
  return (
    <section id="dashboard" className="py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,209,111,0.08),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm text-success font-medium tracking-wider uppercase mb-4">/ Dashboard</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">Acompanhe seu crescimento em tempo real</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dashboard intuitivo para visualizar sua previdencia crescendo e todas as transacoes finalizadas em 0.4s.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-secondary/30 border border-border/50 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-border/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Saldo Total Previdencia</p>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground">R$ 5.900,00</h3>
                    <span className="flex items-center gap-1 text-success text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      +12.5%
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {["1M", "3M", "6M", "1A"].map((period, i) => (
                    <button
                      key={period}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        i === 2 ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-border/50">
              <div className="lg:col-span-3 p-6 md:p-8">
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#836EF9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#836EF9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#71717A", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#71717A", fontSize: 12 }} tickFormatter={(value) => `R$${value / 1000}k`} />
                    <Area type="monotone" dataKey="value" stroke="#836EF9" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="lg:col-span-2 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-foreground">Transacoes Recentes</h4>
                  <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                    Ver todas
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === "in" ? "bg-success/20 text-success" : "bg-primary/20 text-primary"}`}>
                          {tx.type === "in" ? <ArrowUpRight className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{tx.description}</p>
                          <p className="text-xs text-muted-foreground">Finalizado em {tx.time}</p>
                        </div>
                      </div>
                      <p className={`text-sm font-semibold ${tx.type === "in" ? "text-success" : "text-primary"}`}>
                        {tx.type === "in" ? "+" : ""}R$ {tx.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-foreground hover:bg-foreground/90 text-background rounded-full px-8 group">
            Comece a usar o Dashboard
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
