"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OnchainAction } from "@/components/pool/onchain-action";
import { formatCurrency } from "@/lib/formatters";
import { useAppState } from "@/lib/hooks/use-app-state";
import { StatusPill } from "@/components/ui/status-pill";

const policies = [
  { key: "conservative", name: "Conservative", split: "80% available / 10% yield / 10% reserve", profile: "Best for stable runway and low operational risk", effect: "Higher immediate liquidity, lower yield allocation" },
  { key: "balanced", name: "Balanced", split: "70% available / 20% yield / 10% reserve", profile: "Best for general treasury operations", effect: "Balanced between runway and background yield" },
  { key: "aggressive", name: "Aggressive", split: "55% available / 35% yield / 10% reserve", profile: "Best for yield-heavy experimentation", effect: "Lower immediate liquidity, higher yield exposure" }
] as const;

export default function PoolPage() {
  const { pool, allocationPreview, setAllocationPreview, applyPolicy, actionStates, simulateYield } = useAppState();
  const preview = allocationPreview ?? pool;
  const applying = actionStates.rebalancePool === "loading";
  const triggeringYield = actionStates.yield === "loading";

  const currentMode = pool.policyMode;
  const isPreviewing = Boolean(allocationPreview);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Pool structure"
        title="Usage continuity, not trading"
        description="Available liquidity funds operational spend, reserve protects continuity, and yield remains secondary. Policy mode controls the split between those buckets."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        <MetricCard label="Total pool size" value={formatCurrency(preview.totalLiquidity)} detail="All capital currently inside pool accounting" />
        <MetricCard label="Available liquidity" value={formatCurrency(preview.availableLiquidity)} detail="Used first for operational charges" tone="success" />
        <MetricCard label="Allocated to yield" value={formatCurrency(preview.allocatedLiquidity)} detail="Secondary growth bucket for background accrual" />
        <MetricCard label="Safety reserve" value={formatCurrency(preview.safetyReserve)} detail="Protected continuity buffer" tone="warning" />
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Policy mode</div>
          <div className="mt-5 space-y-4">
            {policies.map((policy) => (
              <button
                key={policy.key}
                className={`w-full rounded-2xl border px-5 py-5 text-left transition ${preview.policyMode === policy.key ? "border-cyan bg-cyan/5" : "border-line bg-background/30 hover:border-cyan/30"}`}
                onClick={() => setAllocationPreview(policy.key)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-lg font-semibold text-foreground">{policy.name}</div>
                  {currentMode === policy.key && !isPreviewing ? <StatusPill label="Current" tone="success" /> : null}
                  {allocationPreview?.policyMode === policy.key ? <StatusPill label="Preview" tone="info" /> : null}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{policy.split}</div>
                <div className="mt-3 text-sm font-medium text-foreground">{policy.profile}</div>
                <div className="mt-2 text-sm text-muted-foreground">{policy.effect}</div>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Current vs new allocation</div>
          <h3 className="mt-2 text-2xl font-semibold">{isPreviewing ? "Preview before applying" : "Current allocation live"}</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Rebalancing updates the bucket split used for immediate spend, reserve protection, and yield allocation. The change is recorded in the ledger.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-background/30 p-5">
              <div className="text-sm text-muted-foreground">Available</div>
              <div className="mt-2 text-xl font-semibold text-foreground">{formatCurrency(preview.availableLiquidity)}</div>
            </div>
            <div className="rounded-2xl border border-line bg-background/30 p-5">
              <div className="text-sm text-muted-foreground">Yield</div>
              <div className="mt-2 text-xl font-semibold text-foreground">{formatCurrency(preview.allocatedLiquidity)}</div>
            </div>
            <div className="rounded-2xl border border-line bg-background/30 p-5">
              <div className="text-sm text-muted-foreground">Reserve</div>
              <div className="mt-2 text-xl font-semibold text-foreground">{formatCurrency(preview.safetyReserve)}</div>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-4">
            <Button onClick={() => applyPolicy(preview.policyMode)} disabled={applying || !isPreviewing}>
              {applying ? "Rebalancing..." : "Apply Policy"}
            </Button>
            <Button variant="secondary" onClick={() => setAllocationPreview(null)} disabled={!isPreviewing}>
              Clear Preview
            </Button>
            <Button variant="secondary" onClick={() => simulateYield()} disabled={triggeringYield}>
              {triggeringYield ? "Triggering..." : "Trigger Yield"}
            </Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Yield trigger is simulated. It credits the background yield bucket and records the event in the ledger.
          </div>
        </Card>
        <OnchainAction />
      </div>
    </AppShell>
  );
}
