"use client";

import { ActivityFeed } from "@/components/activity/activity-feed";
import { AllocationChart } from "@/components/charts/allocation-chart";
import { PoolGrowthChart } from "@/components/charts/pool-growth-chart";
import { FlowOverview } from "@/components/dashboard/flow-overview";
import { MetricCard } from "@/components/dashboard/metric-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecommendationCard } from "@/components/dashboard/recommendation-card";
import { AutomationBuilder } from "@/components/demo/automation-builder";
import { FinancialImpact } from "@/components/demo/financial-impact";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { formatCurrency } from "@/lib/formatters";
import { useAppState } from "@/lib/hooks/use-app-state";

export default function DashboardPage() {
  const { pool, activity } = useAppState();
  const growthSeries = [
    { label: "09:00", liquidity: Number((pool.totalLiquidity * 0.32).toFixed(2)), usage: Number((pool.usageToday * 0.2).toFixed(2)), yield: Number((pool.yieldAccrued * 0.2).toFixed(2)) },
    { label: "11:00", liquidity: Number((pool.totalLiquidity * 0.54).toFixed(2)), usage: Number((pool.usageToday * 0.35).toFixed(2)), yield: Number((pool.yieldAccrued * 0.35).toFixed(2)) },
    { label: "13:00", liquidity: Number((pool.totalLiquidity * 0.7).toFixed(2)), usage: Number((pool.usageToday * 0.55).toFixed(2)), yield: Number((pool.yieldAccrued * 0.55).toFixed(2)) },
    { label: "15:00", liquidity: Number((pool.totalLiquidity * 0.88).toFixed(2)), usage: Number((pool.usageToday * 0.8).toFixed(2)), yield: Number((pool.yieldAccrued * 0.8).toFixed(2)) },
    { label: "17:00", liquidity: pool.totalLiquidity, usage: pool.usageToday, yield: pool.yieldAccrued }
  ];
  const allocationSeries = [
    { name: "Available", value: pool.availableLiquidity },
    { name: "Yield", value: pool.allocatedLiquidity },
    { name: "Reserve", value: pool.safetyReserve }
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Treasury cockpit"
        title="Liquidity activated"
        description="Monitor system state, act on the next recommended task, and watch liquidity move across usage, reserve, yield, and ledger in one place."
      />
      <RecommendationCard />
      <div className="mt-6">
        <AutomationBuilder />
      </div>
      <div className="mt-6">
        <FinancialImpact />
      </div>
      <div className="grid items-stretch gap-5 md:grid-cols-4">
        <MetricCard label="Total balance" value={formatCurrency(pool.totalBalance)} detail="All tracked balances across spend, reserve, and yield" />
        <MetricCard label="Available liquidity" value={formatCurrency(pool.availableLiquidity)} detail="Funds ready for immediate operational spend" tone="success" />
        <MetricCard label="In pool" value={formatCurrency(pool.inPool)} detail="Capital allocated between live buckets" hint={`Policy: ${pool.policyMode}`} />
        <MetricCard label="Yield accrued" value={formatCurrency(pool.yieldAccrued)} detail="Value accumulated outside the primary spend bucket" tone="success" />
        <MetricCard label="Usage today" value={formatCurrency(pool.usageToday)} detail="Debits recorded across APIs, AI, and agents" />
        <MetricCard label="Recharge state" value={pool.autoRechargeStatus.toUpperCase()} detail="Low-liquidity monitoring and recovery status" tone="warning" />
        <MetricCard label="Active agents" value={String(pool.activeAgents)} detail="Operational consumers with budget controls" />
        <MetricCard label="Projected runway" value={`${pool.projectedRunwayDays}d`} detail={`Pool health: ${pool.poolHealth}`} tone={pool.poolHealth === "healthy" ? "success" : "warning"} />
      </div>
      <div className="mt-6">
        <FlowOverview compact />
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <PoolGrowthChart data={growthSeries} />
        <AllocationChart data={allocationSeries} />
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <QuickActions />
        <ActivityFeed items={activity} />
      </div>
    </AppShell>
  );
}
