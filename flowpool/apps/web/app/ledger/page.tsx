"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { useAppState } from "@/lib/hooks/use-app-state";
import { EmptyState } from "@/components/ui/empty-state";

export default function LedgerPage() {
  const { ledger } = useAppState();
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState<"all" | "credit" | "debit">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      ledger.filter((entry) => {
        const matchesDirection = direction === "all" ? true : entry.direction === direction;
        const matchesQuery =
          query.length === 0 ||
          entry.type.toLowerCase().includes(query.toLowerCase()) ||
          entry.category.toLowerCase().includes(query.toLowerCase()) ||
          (entry.referenceId ?? "").toLowerCase().includes(query.toLowerCase());
        return matchesDirection && matchesQuery;
      }),
    [direction, ledger, query]
  );

  const selected = filtered.find((entry) => entry.id === selectedId) ?? null;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Financial traceability"
        title="Ledger and history"
        description="Audit every funding, rebalance, usage, recharge, and yield event with search, filters, and contextual metadata."
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search reference, type, category"
              className="w-full rounded-2xl border border-border bg-secondary/80 px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none md:max-w-sm"
            />
            <div className="flex gap-2">
              <button className={`rounded-full px-4 py-2 text-sm font-medium ${direction === "all" ? "bg-cyan text-slate-950" : "bg-secondary text-foreground"}`} onClick={() => setDirection("all")}>All</button>
              <button className={`rounded-full px-4 py-2 text-sm font-medium ${direction === "credit" ? "bg-cyan text-slate-950" : "bg-secondary text-foreground"}`} onClick={() => setDirection("credit")}>Credit</button>
              <button className={`rounded-full px-4 py-2 text-sm font-medium ${direction === "debit" ? "bg-cyan text-slate-950" : "bg-secondary text-foreground"}`} onClick={() => setDirection("debit")}>Debit</button>
            </div>
          </div>
          {filtered.length === 0 ? (
            <EmptyState title="No ledger entries match your filters" description="Adjust the search or trigger a new funding, usage, or yield event." />
          ) : (
            <>
              <div className="grid grid-cols-6 gap-4 border-b border-line pb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <div>Timestamp</div>
                <div>Type</div>
                <div>Direction</div>
                <div>Category</div>
                <div>Reference</div>
                <div>Amount</div>
              </div>
              <div className="space-y-3 pt-5">
                {filtered.map((entry) => (
                  <button key={entry.id} className="grid w-full grid-cols-6 gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-5 text-left text-sm transition hover:border-cyan/30" onClick={() => setSelectedId(entry.id)}>
                    <div className="text-foreground">{new Date(entry.createdAt).toLocaleTimeString()}</div>
                    <div className="font-medium text-foreground">{entry.type}</div>
                    <div className={entry.direction === "credit" ? "font-medium text-green" : "font-medium text-amber"}>{entry.direction}</div>
                    <div className="text-muted-foreground">{entry.category}</div>
                    <div className="text-muted-foreground">{entry.referenceId ?? "-"}</div>
                    <div className={entry.direction === "credit" ? "font-semibold text-green" : "font-semibold text-foreground"}>{formatCurrency(entry.amount)}</div>
                  </button>
                ))}
              </div>
            </>
          )}
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Entry detail</div>
          {selected ? (
            <div className="mt-5 space-y-4 text-sm">
              <div><span className="text-muted-foreground">Type</span><div className="mt-1 font-medium text-foreground">{selected.type}</div></div>
              <div><span className="text-muted-foreground">Module</span><div className="mt-1 font-medium text-foreground">{selected.category}</div></div>
              <div><span className="text-muted-foreground">Reference</span><div className="mt-1 text-foreground">{selected.referenceId ?? "No reference"}</div></div>
              <div><span className="text-muted-foreground">Amount</span><div className="mt-1 text-base font-semibold text-foreground">{formatCurrency(selected.amount)}</div></div>
              <div><span className="text-muted-foreground">Environment</span><div className="mt-1 text-foreground">Demo + Testnet</div></div>
              <div><span className="text-muted-foreground">Metadata</span><div className="mt-1 break-all text-muted-foreground">{selected.metadataJson ?? "No extra metadata"}</div></div>
            </div>
          ) : (
            <div className="mt-4">
              <EmptyState title="Select a ledger row" description="Choose an entry to inspect its module, reference, environment, and resulting state change." />
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
