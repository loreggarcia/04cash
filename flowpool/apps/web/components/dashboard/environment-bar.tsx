"use client";

import { StatusPill } from "@/components/ui/status-pill";
import { useWalletState } from "@/lib/hooks/use-wallet-state";

export function EnvironmentBar() {
  const wallet = useWalletState();

  return (
    <div className="surface-elevated mb-6 flex flex-wrap items-center gap-2 rounded-3xl p-4 md:gap-3 md:p-5">
      <StatusPill label="Environment: Demo + Testnet" tone="info" />
      <StatusPill label={`Wallet: ${wallet.isConnected ? "Connected" : "Disconnected"}`} tone={wallet.isConnected ? "success" : "warning"} />
      <StatusPill label={`Mode: ${wallet.isConnected ? "Onchain-enabled" : "Simulated"}`} tone={wallet.isConnected ? "success" : "neutral"} />
      <StatusPill label="Funding source: Mock Pix" tone="neutral" />
      <span className="ml-auto text-sm font-medium text-muted-foreground">
        {wallet.isConnected
          ? "Running on Monad Testnet. Wallet required only for real onchain deposit."
          : "Prototype running in demo/testnet mode. Simulation flows do not move real funds."}
      </span>
    </div>
  );
}
