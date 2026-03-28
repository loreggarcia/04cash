"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, Users, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "performance", label: "/ Performance Incomparavel" },
  { id: "plug-play", label: "/ Plug and Play" },
  { id: "decentralization", label: "/ Descentralizacao Real" }
];

export function BenchmarkSection() {
  const [activeTab, setActiveTab] = useState("performance");

  return (
    <section id="performance" className="py-32 relative">
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-balance">Um novo benchmark para financas.</h2>
      </div>

      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                activeTab === tab.id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        {activeTab === "performance" && <PerformanceContent />}
        {activeTab === "plug-play" && <PlugPlayContent />}
        {activeTab === "decentralization" && <DecentralizationContent />}
      </div>
    </section>
  );
}

function PerformanceContent() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Rapido, familiar, sem friccao</h3>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Sem mais taxas altas ou longas esperas. Apps no 04Cash sao instantaneos, custam centavos e funcionam com as carteiras e ferramentas que voce ja conhece.
        </p>

        <div className="space-y-4">
          <ActionLink icon={FileText} label="Ler a documentacao" />
          <ActionLink icon={Users} label="Explore os validadores do 04Cash" />
          <ActionLink icon={MessageSquare} label="Entre no Discord" />
        </div>
      </div>

      <div className="relative">
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-secondary to-secondary border border-border/50 p-8 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
            <MetricCard value="10K" label="TPS" />
            <MetricCard value="100%" label="EVM" />
            <MetricCard value="0.4s" label="Finalidade" />
            <MetricCard value="1s" label="Blocos" />
          </div>
        </div>
        <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-3xl -z-10" />
      </div>
    </div>
  );
}

function PlugPlayContent() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Plug and Play.</h3>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          04Cash e compativel com EVM no nivel de bytecode. Isso significa que contratos Solidity, enderecos EVM, infraestrutura, ferramentas e bibliotecas funcionam imediatamente. Foque em construir otimos produtos—nao em aprender uma nova stack.
        </p>

        <Button className="bg-foreground hover:bg-foreground/90 text-background rounded-full px-6 group">
          Ver Developer Briefing
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="relative">
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-success/20 via-secondary to-secondary border border-border/50 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-success/20 flex items-center justify-center">
              <svg className="w-12 h-12 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <p className="text-lg font-semibold">100% Compativel</p>
            <p className="text-muted-foreground">com Ethereum</p>
          </div>
        </div>

        <div className="absolute -inset-4 bg-success/10 rounded-3xl blur-3xl -z-10" />
      </div>
    </div>
  );
}

function DecentralizationContent() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Rode um no. Junte-se a rede.</h3>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          O banco de dados customizado e os baixos requisitos de sistema do 04Cash permitem que validadores rodem em hardware comum.
        </p>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Essa e descentralizacao real desde o primeiro dia—com uma rede global pronta para escalar conforme a demanda cresce.
        </p>

        <div className="space-y-4">
          <ActionLink icon={FileText} label="Saiba mais sobre o banco de dados" />
          <ActionLink icon={Users} label="Aprenda a rodar um no" />
        </div>
      </div>

      <div className="relative">
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-secondary to-secondary border border-border/50 p-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl font-bold gradient-text mb-4">200+</p>
            <p className="text-lg text-muted-foreground">Validadores Ativos</p>
          </div>
        </div>

        <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-3xl -z-10" />
      </div>
    </div>
  );
}

function ActionLink({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <a href="#" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group">
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </a>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-4 rounded-2xl bg-background/50 border border-border/50 text-center">
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );
}
