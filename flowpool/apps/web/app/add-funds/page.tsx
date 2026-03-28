"use client";

import { useState } from "react";
import { CheckCircle2, Clock3, Copy, QrCode, Wallet } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { PoolExecutionDemo } from "@/components/demo/pool-execution-demo";
import { FinancialImpact } from "@/components/demo/financial-impact";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusPill } from "@/components/ui/status-pill";
import { useAppState } from "@/lib/hooks/use-app-state";
import { formatCurrency } from "@/lib/formatters";

const steps = [
  { key: "awaiting_generation", label: "Awaiting generation" },
  { key: "pix_generated", label: "Pix generated" },
  { key: "payment_pending", label: "Payment pending" },
  { key: "payment_received", label: "Payment received" },
  { key: "allocation_completed", label: "Pool allocation completed" },
  { key: "ready_for_usage", label: "Ready for usage" }
] as const;

export default function AddFundsPage() {
  const [amount, setAmount] = useState("40.00");
  const { currentCharge, paymentStatus, actionStates, generatePixCharge, confirmPixCharge, pool } = useAppState();
  const isGenerating = actionStates.generatePixCharge === "loading";
  const isConfirming = actionStates.confirmPixCharge === "loading";
  const split = {
    available: Number((Number(amount || 0) * 0.7).toFixed(2)),
    yield: Number((Number(amount || 0) * 0.2).toFixed(2)),
    reserve: Number((Number(amount || 0) * 0.1).toFixed(2))
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Mock Pix rail"
        title="Fund the pool"
        description="Create a Pix request, confirm it, and watch the payment move through FlowPool into active liquidity."
      />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="space-y-5">
          <label className="block">
            <div className="mb-2 text-sm text-foreground">Amount</div>
            <input value={amount} onChange={(event) => setAmount(event.target.value)} className="w-full rounded-2xl border border-line bg-background px-4 py-3 outline-none" />
          </label>
          <div className="rounded-3xl border border-dashed border-cyan/40 bg-cyan/5 p-6">
            <div className="mb-4 inline-flex rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan">
              Pix QR mock
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-line bg-panelAlt">
                <QrCode className="h-10 w-10 text-cyan" />
              </div>
              <div className="text-sm text-foreground">{currentCharge ? `${currentCharge.qrCodePayload.slice(0, 120)}...` : "Generate a Pix charge to get the payment payload."}</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 gap-2" onClick={() => generatePixCharge(Number(amount))} disabled={isGenerating}>
              <Wallet className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Pix Charge"}
            </Button>
            <Button variant="secondary" className="gap-2" disabled={!currentCharge}>
              <Copy className="h-4 w-4" />
              Copy payload
            </Button>
          </div>
          <Button className="w-full gap-2" onClick={() => confirmPixCharge()} disabled={!currentCharge || isConfirming}>
            <Wallet className="h-4 w-4" />
            {isConfirming ? "Confirming..." : "Confirm Payment Received"}
          </Button>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="text-xs uppercase tracking-[0.24em] text-foreground">Payment request</div>
            <h3 className="mt-2 text-2xl font-semibold">{currentCharge?.externalRef ?? "Awaiting generation"}</h3>
            <div className="mt-4 grid gap-3 text-sm text-foreground md:grid-cols-2">
              <div>Receiver: Lorena Demo FlowPool</div>
              <div>Status: {paymentStatus.replaceAll("_", " ")}</div>
              <div>Amount: ${Number(amount || 0).toFixed(2)}</div>
              <div>Environment: Demo + Testnet</div>
              <div>Policy split: 70 / 20 / 10</div>
              <div>Source type: Mock Pix</div>
              <div className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> Expires in: 14m</div>
            </div>
          </Card>
          <Card>
            <div className="text-xs uppercase tracking-[0.24em] text-foreground">Payment timeline</div>
            <div className="mt-5 space-y-4">
              {steps.map((step, index) => {
                const active = steps.findIndex((entry) => entry.key === paymentStatus) >= index;
                return (
                  <div key={step.key} className="flex items-center gap-4 rounded-2xl border border-line bg-background/40 p-4">
                    <CheckCircle2 className={`h-5 w-5 ${active ? "text-green" : "text-muted"}`} />
                    <div className={active ? "text-text" : "text-foreground"}>{step.label}</div>
                  </div>
                );
              })}
            </div>
          </Card>
          {paymentStatus === "ready_for_usage" ? (
            <Card>
              <div className="text-xs uppercase tracking-[0.24em] text-green">Funding complete</div>
              <h3 className="mt-2 text-2xl font-semibold">Pool ready for usage</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-line bg-background/30 p-4">
                  <div className="text-sm text-muted">Available</div>
                  <div className="mt-2 text-xl font-semibold">{formatCurrency(split.available)}</div>
                </div>
                <div className="rounded-2xl border border-line bg-background/30 p-4">
                  <div className="text-sm text-muted">Yield</div>
                  <div className="mt-2 text-xl font-semibold">{formatCurrency(split.yield)}</div>
                </div>
                <div className="rounded-2xl border border-line bg-background/30 p-4">
                  <div className="text-sm text-muted">Reserve</div>
                  <div className="mt-2 text-xl font-semibold">{formatCurrency(split.reserve)}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusPill label={`Pool balance: ${formatCurrency(pool.inPool)}`} tone="success" />
                <StatusPill label="Ready for usage" tone="success" />
              </div>
            </Card>
          ) : (
            <EmptyState
              title="No funded pool yet"
              description="Generate a charge, confirm payment, and then route capital into available, reserve, and yield buckets."
            />
          )}
        </div>
      </div>
      <div className="mt-6">
        <PoolExecutionDemo />
      </div>
      <div className="mt-6">
        <FinancialImpact />
      </div>
    </AppShell>
  );
}
