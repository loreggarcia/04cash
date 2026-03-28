"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWalletState } from "@/lib/hooks/use-wallet-state";

export function OnchainAction() {
  const wallet = useWalletState();

  return (
    <Card>
      <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Monad write path</div>
      <h3 className="mt-2 text-2xl font-semibold">Fund pool onchain</h3>
      <p className="mt-3 text-sm text-muted-foreground">
        Connect a wallet, switch to Monad Testnet, and send a real `deposit(accountId, amount)` transaction to the configured PoolVault contract.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Button disabled={!wallet.isConnected || wallet.isWrongNetwork} onClick={() => wallet.depositOnchain(1, "0.01")}>
          {wallet.walletState === "tx_pending" ? "Transaction Pending..." : "Deposit 0.01 MON"}
        </Button>
        {wallet.explorerHref ? (
          <Button asChild variant="secondary">
            <a href={wallet.explorerHref} target="_blank" rel="noreferrer">
              Explorer
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : null}
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        Wallet state: {wallet.walletState}
        {wallet.txHash ? ` • ${wallet.txHash}` : ""}
      </div>
    </Card>
  );
}
