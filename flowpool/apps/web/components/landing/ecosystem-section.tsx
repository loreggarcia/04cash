"use client";

import { ArrowRight, Users, BookOpen, Zap } from "lucide-react";
import { MoniMascot } from "./moni-mascot";

const communityCards = [
  {
    icon: Users,
    title: "Co-learning Camps",
    description: "100% gratuito, 2 semanas, com instrutores... aprenda e cresca com seus pares!",
    cta: "Participar",
    color: "primary"
  },
  {
    icon: Zap,
    title: "Eventos Globais",
    description: "Meetups, bootcamps, encontros... Conecte-se com entusiastas do mundo todo!",
    cta: "Ver Eventos",
    color: "success"
  },
  {
    icon: BookOpen,
    title: "Programa Advocate",
    description: "Compartilhe sua experiencia para inspirar outros. Quanto mais compartilha, mais ganha!",
    cta: "Ser Advocate",
    color: "primary"
  }
];

export function EcosystemSection() {
  return (
    <section id="community" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(131,110,249,0.08),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm text-primary font-medium tracking-wider uppercase mb-4">/ Comunidade</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Sua jornada nao termina com o aprendizado. <span className="text-muted-foreground">Junte-se a comunidade!</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {communityCards.map((card) => (
            <div
              key={card.title}
              className="group relative p-8 rounded-3xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  card.color === "success" ? "bg-gradient-to-br from-success/10 to-transparent" : "bg-gradient-to-br from-primary/10 to-transparent"
                }`}
              />

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${card.color === "success" ? "bg-success/20 text-success" : "bg-primary/20 text-primary"}`}>
                  <card.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{card.description}</p>

                <a href="#" className="inline-flex items-center gap-2 text-foreground font-medium group/link">
                  {card.cta}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="relative p-10 md:p-16 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/50 to-success/5 border border-primary/20 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-success/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <MoniMascot size="lg" />

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Comece com um ovo do Moni!</h3>
              <p className="text-muted-foreground mb-6 max-w-xl">
                Assim como no HackQuest, no 04Cash voce comeca sua jornada com o Moni te guiando. Cada conquista financeira desbloqueia novas recompensas!
              </p>
              <button className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-foreground/90 transition-colors group">
                Comecar minha jornada
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
