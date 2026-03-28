"use client";

import { useMemo, useState } from "react";
import { Wallet } from "lucide-react";
import { useConnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { useWalletState } from "@/lib/hooks/use-wallet-state";
import { formatMon, shortenAddress } from "@/lib/formatters";

export function ConnectButton() {
  const { connectors, connectAsync, isPending } = useConnect();
  const wallet = useWalletState();
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const injectedConnector = useMemo(
    () => connectors.find((connector) => connector.id === "injected"),
    [connectors]
  );

  const fallbackConnector = useMemo(
    () => connectors.find((connector) => connector.id !== "injected"),
    [connectors]
  );

  async function handleConnect() {
    setError(null);

    if (injectedConnector) {
      try {
        setIsChecking(true);
        const provider = await injectedConnector.getProvider();
        if (provider) {
          await connectAsync({ connector: injectedConnector });
          return;
        }
      } catch {
        setError("Injected wallet not detected.");
      } finally {
        setIsChecking(false);
      }
    }

    if (fallbackConnector) {
      try {
        await connectAsync({ connector: fallbackConnector });
        return;
      } catch {
        setError("Wallet connection failed.");
        return;
      }
    }

    setError("No wallet provider found. Install MetaMask or configure WalletConnect.");
  }

  if (wallet.isConnected) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 rounded-full border border-border bg-secondary px-4 py-2 text-sm text-foreground">
          <div>
            <div className="font-medium">{shortenAddress(wallet.address)}</div>
            <div className="text-xs text-muted-foreground">{formatMon(wallet.balance)}</div>
          </div>
          <Button variant="ghost" onClick={() => wallet.disconnect()}>
            Disconnect
          </Button>
        </div>
        {error ? <div className="text-xs text-amber">{error}</div> : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button className="gap-2" onClick={handleConnect} disabled={isPending || isChecking}>
        <Wallet className="h-4 w-4" />
        {isPending || isChecking ? "Connecting..." : "Connect Wallet"}
      </Button>
      {error ? <div className="max-w-64 text-right text-xs text-amber">{error}</div> : null}
    </div>
  );
}
