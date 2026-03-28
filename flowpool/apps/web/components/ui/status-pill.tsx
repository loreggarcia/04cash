import { cn } from "@/lib/utils/cn";

export function StatusPill({
  label,
  tone = "neutral"
}: {
  label: string;
  tone?: "neutral" | "success" | "warning" | "info" | "error";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm",
        tone === "success" && "border-green/25 bg-green/12 text-green",
        tone === "warning" && "border-amber/25 bg-amber/12 text-amber",
        tone === "info" && "border-cyan/25 bg-cyan/12 text-cyan",
        tone === "error" && "border-critical/25 bg-critical/12 text-critical",
        tone === "neutral" && "border-white/8 bg-white/4 text-muted-foreground"
      )}
    >
      {label}
    </span>
  );
}
