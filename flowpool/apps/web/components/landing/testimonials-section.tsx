"use client";

import { useEffect, useRef, useState } from "react";
import { MoniMascot } from "./moni-mascot";

const testimonials = [
  {
    quote: "Eu nunca pensei que conseguiria construir uma previdencia como autonomo, mas o 04Cash tornou isso acessivel e automatico.",
    author: "Maria Silva",
    role: "Designer Freelancer"
  },
  {
    quote: "O Smart Split mudou minha vida financeira. Cada Pix que recebo ja vai automaticamente para minha reserva. Genial!",
    author: "Pedro Santos",
    role: "Motorista de Aplicativo"
  },
  {
    quote: "A velocidade e impressionante. Em 0.4 segundos meu dinheiro ja esta dividido e investido. Nunca vi nada igual.",
    author: "Ana Costa",
    role: "Fotografa"
  },
  {
    quote: "Finalmente uma solucao pensada para quem trabalha por conta propria. O Moni me ajuda a entender tudo de forma simples.",
    author: "Carlos Oliveira",
    role: "Entregador"
  },
  {
    quote: "A transparencia das taxas e a seguranca da blockchain me deram confianca para investir meu futuro aqui.",
    author: "Julia Mendes",
    role: "Manicure"
  },
  {
    quote: "O dashboard e incrivel! Consigo ver exatamente quanto minha previdencia esta rendendo em tempo real.",
    author: "Roberto Lima",
    role: "Eletricista"
  }
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const speed = 0.5;

    const scroll = () => {
      if (!isPaused) {
        scrollPosition += speed;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,209,111,0.05),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-sm text-primary font-medium tracking-wider uppercase mb-4">/ Depoimentos</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
              Sua jornada nao termina aqui. <span className="text-muted-foreground">Junte-se a comunidade!</span>
            </h2>
          </div>

          <div className="hidden md:block">
            <MoniMascot size="md" />
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[350px] md:w-[400px] p-6 rounded-3xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            <p className="text-foreground mb-6 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{testimonial.author.charAt(0)}</div>
              <div>
                <p className="font-medium text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
