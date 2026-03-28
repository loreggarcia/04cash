import { Card } from "@/components/ui/card";

export function MetricCard({
  label,
  value,
  detail,
  tone = "default",
  hint
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "success" | "warning";
  hint?: string;
}) {
  const toneClass = tone === "success" ? "text-green" : tone === "warning" ? "text-amber" : "text-text";

  return (
    <Card className="min-h-[168px] justify-between space-y-0">
      <div className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{label}</div>
      <div className={`text-3xl font-semibold tracking-tight md:text-[2rem] ${toneClass}`}>{value}</div>
      <div className="text-sm text-muted-foreground">{detail}</div>
      {hint ? <div className="text-xs font-medium text-muted-foreground/85">{hint}</div> : null}
    </Card>
  );
}
