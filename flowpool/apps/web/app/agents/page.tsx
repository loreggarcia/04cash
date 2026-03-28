"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/hooks/use-app-state";
import { EmptyState } from "@/components/ui/empty-state";

export default function AgentsPage() {
  const { agents, runAgentTask, actionStates } = useAppState();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Agent budgets"
        title="Operational consumers of liquidity"
        description="Agents run inside explicit budgets, permissions, and risk states. Every task affects both liquidity and ledger traceability."
      />
      {agents.length === 0 ? (
        <EmptyState title="No agents configured yet" description="Create an agent budget to simulate controlled operational spend from the pool." />
      ) : (
        <div className="mt-8 grid gap-6">
          {agents.map((agent) => (
            <Card key={agent.id}>
              <div className="flex min-h-[220px] flex-col gap-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="text-2xl font-semibold text-foreground">{agent.name}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{agent.permissions.join(" • ")}</div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      Purpose: controlled operational consumer of programmable liquidity.
                    </div>
                  </div>
                  <div className="grid gap-4 text-sm md:grid-cols-4">
                    <div><span className="text-muted-foreground">Status</span><div className={`mt-1 font-medium ${agent.status === "active" ? "text-green" : agent.status === "paused" ? "text-amber" : "text-foreground"}`}>{agent.status}</div></div>
                    <div><span className="text-muted-foreground">Budget total</span><div className="mt-1 text-base font-semibold text-foreground">${agent.maxBudget.toFixed(2)}</div></div>
                    <div><span className="text-muted-foreground">Current spend</span><div className="mt-1 text-base font-semibold text-foreground">${agent.currentSpend.toFixed(2)}</div></div>
                    <div><span className="text-muted-foreground">Remaining</span><div className="mt-1 text-base font-semibold text-green">${(agent.maxBudget - agent.currentSpend).toFixed(2)}</div></div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button onClick={() => runAgentTask(agent.id, 0.5)} disabled={actionStates[`agent-${agent.id}`] === "loading"}>
                    {actionStates[`agent-${agent.id}`] === "loading" ? "Running..." : "Run Agent Task"}
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Estimated cost: $0.50 • This updates usage, liquidity, and ledger together.
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
