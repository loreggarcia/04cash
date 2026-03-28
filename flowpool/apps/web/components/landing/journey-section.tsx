"use client";

import { useState } from "react";
import { ArrowRight, Wallet, TrendingUp, Shield, Gift, ChevronRight } from "lucide-react";
import { MoniMascot } from "./moni-mascot";
import { cn } from "@/lib/utils";

const journeySteps = [
  {
    number: "01",
    icon: Wallet,
    title: "Crie sua conta",
    shortTitle: "Criar conta",
    description: "Comece com uma conta gratuita e tenha acesso a uma wallet inteligente que entende suas necessidades financeiras como autonomo.",
    cta: "Comecar agora",
    status: "available",
    moniMessage: "Vamos comecar sua jornada!"
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Configure seu Smart Split",
    shortTitle: "Smart Split",
    description: "Defina a porcentagem de cada Pix que vai automaticamente para sua previdencia. Voce controla tudo em tempo real.",
    cta: "Configurar",
    status: "available",
    moniMessage: "Deixa que eu cuido!"
  },
  {
    number: "03",
    icon: Shield,
    title: "Receba e invista automaticamente",
    shortTitle: "Investir",
    description: "Cada Pix que voce recebe e automaticamente dividido. Sua previdencia cresce sem voce precisar fazer nada.",
    cta: "Ver como funciona",
    status: "available",
    moniMessage: "Tudo automatico!"
  },
  {
    number: "04",
    icon: Gift,
    title: "Acompanhe seu patrimonio",
    shortTitle: "Patrimonio",
    description: "Veja seu dinheiro crescer no dashboard. Acompanhe rendimentos, historico e projete seu futuro financeiro.",
    cta: "Explorar dashboard",
    status: "available",
    moniMessage: "Olha so o progresso!"
  }
];

export function JourneySection() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = journeySteps[activeStep];

  return (
    <section id="journey" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(131,110,249,0.08),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div className="text-center lg:text-left max-w-2xl">
            <p className="text-sm text-primary font-medium tracking-wider uppercase mb-4">/ Sua Jornada</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Deixe o Moni te guiar no <span className="gradient-text">04Cash</span>
            </h2>
            <p className="text-lg text-muted-foreground">Cada ideia merece ser explorada. Transforme a sua em realidade financeira!</p>
          </div>

          <MoniMascot size="lg" speechBubble={currentStep.moniMessage} />
        </div>

        <div className="flex lg:hidden gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {journeySteps.map((step, index) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(index)}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeStep === index ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              )}
            >
              {step.shortTitle}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="hidden lg:block space-y-2">
            {journeySteps.map((step, index) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border transition-all duration-300 group",
                  activeStep === index ? "bg-primary/10 border-primary/30" : "bg-secondary/30 border-border/50 hover:border-primary/20"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "text-xs font-bold px-2 py-1 rounded-lg transition-colors",
                      activeStep === index ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground group-hover:bg-primary/20"
                    )}
                  >
                    {step.number}
                  </span>
                  <span className={cn("font-medium transition-colors", activeStep === index ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
                    {step.shortTitle}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="relative p-8 md:p-10 rounded-3xl bg-secondary/30 border border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <currentStep.icon className="w-8 h-8 text-primary" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Passo {currentStep.number}</span>
                      <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">Disponivel</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{currentStep.title}</h3>

                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">{currentStep.description}</p>

                    <button className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:bg-foreground/90 transition-colors group/btn">
                      {currentStep.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {journeySteps.map((_, index) => (
                        <div
                          key={index}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            index === activeStep ? "w-10 bg-primary" : index < activeStep ? "w-6 bg-primary/50" : "w-4 bg-border"
                          )}
                        />
                      ))}
                    </div>

                    {activeStep < journeySteps.length - 1 && (
                      <button onClick={() => setActiveStep(activeStep + 1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/next">
                        Proximo passo
                        <ChevronRight className="w-4 h-4 group-hover/next:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
