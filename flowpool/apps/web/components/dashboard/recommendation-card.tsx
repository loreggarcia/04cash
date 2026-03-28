"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/hooks/use-app-state";
import { useWalletState } from "@/lib/hooks/use-wallet-state";

export function RecommendationCard() {
  const { recommendedStep, pool } = useAppState();
  const wallet = useWalletState();

  const cta =
    !wallet.isConnected
      ? { href: "/pool", label: "Connect wallet for onchain mode" }
      : pool.inPool <= 0
        ? { href: "/add-funds", label: "Start funding flow" }
        : pool.availableLiquidity < 5
          ? { href: "/add-funds", label: "Review recharge path" }
          : { href: "/usage", label: "Simulate operational spend" };

  return (
    <Card className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4">
        <div className="mt-1 rounded-2xl border border-amber/30 bg-amber/10 p-3">
          <AlertTriangle className="h-5 w-5 text-amber" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Recommended next step</div>
          <div className="mt-2 text-xl font-semibold">{recommendedStep}</div>
          <div className="mt-2 text-sm text-muted-foreground">
            The system uses this card to reduce ambiguity between funding, allocation, usage, and audit.
          </div>
        </div>
      </div>
      <Button asChild>
        <Link href={cta.href}>
          {cta.label}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}
