"use client";

import { AppShell } from "@/components/layout/app-shell";
import { FlowOverview } from "@/components/dashboard/flow-overview";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import { EmptyState } from "@/components/ui/empty-state";
import { useAppState } from "@/lib/hooks/use-app-state";

export default function UsagePage() {
  const { usageFeed, pool, simulateUsage, actionStates } = useAppState();
  const latest = usageFeed[0];
  const apiEvents = usageFeed.filter((item) => item.sourceType === "api");
  const aiSpend = usageFeed.filter((item) => item.sourceType === "ai").reduce((sum, item) => sum + item.amountCharged, 0);
  const agentSpend = usageFeed.filter((item) => item.sourceType === "agent").reduce((sum, item) => sum + item.amountCharged, 0);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Pay per use"
        title="Usage settled against live liquidity"
        description="Every usage event debits available liquidity first and records the event in the ledger. The system then recalculates runway and recharge pressure."
      />
      <div className="mb-6">
        <FlowOverview compact />
      </div>
      <div className="mb-6 grid gap-5 md:grid-cols-4">
        <MetricCard label="API requests" value={String(apiEvents.length)} detail="Settled directly from the available liquidity bucket" tone="success" />
        <MetricCard label="AI usage" value={formatCurrency(aiSpend)} detail="Inference spend tracked as operational debit events" />
        <MetricCard label="Agent tasks" value={formatCurrency(agentSpend)} detail="Agent-triggered execution routed through the same usage engine" />
        <MetricCard label="Runway estimate" value={`${pool.projectedRunwayDays} days`} detail="Updated after every new usage event and liquidity change" tone={pool.projectedRunwayDays <= 2 ? "warning" : "default"} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Usage categories</div>
            <h3 className="mt-2 text-2xl font-semibold text-text">Operational spend hits the available bucket first</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Use the same treasury loop from the dashboard: trigger usage, debit live liquidity, and reflect the result immediately in the ledger and runway.
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={() => simulateUsage({ sourceType: "api", sourceName: "Vision API", units: 6, unitCost: 0.18 })} disabled={actionStates["usage-api"] === "loading"}>
              {actionStates["usage-api"] === "loading" ? "Processing..." : "Simulate API Charge"}
            </Button>
            <Button variant="secondary" onClick={() => simulateUsage({ sourceType: "ai", sourceName: "Inference Runner", units: 4, unitCost: 0.42 })} disabled={actionStates["usage-ai"] === "loading"}>
              {actionStates["usage-ai"] === "loading" ? "Processing..." : "Simulate AI Inference Charge"}
            </Button>
          </div>
          <div className="rounded-2xl border border-line bg-background/30 p-4 text-sm text-muted-foreground">
            {latest
              ? `Latest event: ${latest.sourceName} charged ${formatCurrency(latest.amountCharged)} from the available bucket. Remaining available liquidity: ${formatCurrency(pool.availableLiquidity)}.`
              : "No usage simulated yet. Generate a funding event first, then simulate spend to watch the pool and ledger update."}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-background/30 p-4">
              <div className="text-sm text-muted-foreground">Source bucket used</div>
              <div className="mt-2 text-2xl font-semibold text-text">Available liquidity</div>
            </div>
            <div className="rounded-2xl border border-line bg-background/30 p-4">
              <div className="text-sm text-muted-foreground">Remaining available</div>
              <div className="mt-2 text-2xl font-semibold text-text">{formatCurrency(pool.availableLiquidity)}</div>
            </div>
            <div className="rounded-2xl border border-line bg-background/30 p-4">
              <div className="text-sm text-muted-foreground">Latest event cost</div>
              <div className="mt-2 text-2xl font-semibold text-text">{latest ? formatCurrency(latest.amountCharged) : formatCurrency(0)}</div>
            </div>
            <div className="rounded-2xl border border-line bg-background/30 p-4">
              <div className="text-sm text-muted-foreground">Recharge pressure</div>
              <div className="mt-2 text-2xl font-semibold text-text">{pool.autoRechargeStatus}</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Usage feed</div>
          {usageFeed.length === 0 ? (
            <div className="mt-5">
              <EmptyState title="No usage events yet" description="Simulate an API or AI charge to see how operational spend impacts the pool and ledger." />
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {usageFeed.map((item) => (
                <div key={item.id} className="rounded-2xl border border-line bg-background/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-text">{item.sourceName}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {item.category.replaceAll("_", " ")} • {item.units} units @ {formatCurrency(item.unitCost)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-cyan">{formatCurrency(item.amountCharged)}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Recorded in ledger</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
