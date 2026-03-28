import { Zap } from "lucide-react";

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-1 group">
      <span className="text-2xl font-bold text-foreground">0</span>
      <Zap className="w-5 h-5 text-primary group-hover:animate-pulse transition-all" fill="currentColor" />
      <span className="text-2xl font-bold text-foreground">4</span>
      <span className="text-2xl font-bold gradient-text">Cash</span>
    </a>
  );
}
