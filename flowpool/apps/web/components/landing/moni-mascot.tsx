"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface MoniMascotProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
  speechBubble?: string;
}

export function MoniMascot({ size = "md", className, animate = true, speechBubble }: MoniMascotProps) {
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-40 h-40",
    lg: "w-64 h-64",
    xl: "w-80 h-80 md:w-96 md:h-96"
  };

  return (
    <div className={cn("relative inline-block", className)}>
      {speechBubble && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="relative rounded-2xl border border-white/60 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-glow">
            {speechBubble}
            <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-75 opacity-50" />

      <div className={cn(sizeClasses[size], "relative", animate && "animate-float")}>
        <Image src="/images/moni-mascot.png" alt="Moni - Mascote do 04Cash" fill className="object-contain drop-shadow-2xl" priority />
      </div>
    </div>
  );
}
