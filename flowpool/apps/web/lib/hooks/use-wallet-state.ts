"use client";

import { useEffect, useMemo, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance, useChainId, useDisconnect, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { monadTestnet } from "@/lib/viem/chains";
import { poolVaultAbi } from "@/lib/wagmi/abis";

export function useWalletState() {
  const { address, status: accountStatus, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [lastHash, setLastHash] = useState<`0x${string}` | undefined>();
  const { switchChainAsync, isPending: isSwitching } = useSwitchChain();
  const { data: balance } = useBalance({ address, query: { enabled: Boolean(address) } });
  const { writeContractAsync, isPending: isWriting } = useWriteContract();
  const tx = useWaitForTransactionReceipt({ hash: lastHash, query: { enabled: Boolean(lastHash) } });

  const networkState = !isConnected
    ? "disconnected"
    : chainId !== monadTestnet.id
      ? "wrong_network"
      : tx.isSuccess
        ? "tx_confirmed"
        : isWriting || tx.isLoading
          ? "tx_pending"
          : "connected";

  useEffect(() => {
    if (!tx.isSuccess) return;
    const timer = setTimeout(() => setLastHash(undefined), 5000);
    return () => clearTimeout(timer);
  }, [tx.isSuccess]);

  return {
    address,
    balance: balance ? Number(formatEther(balance.value)) : 0,
    walletState: accountStatus === "connecting" ? "connecting" : isSwitching ? "switching" : networkState,
    isConnected,
    isWrongNetwork: isConnected && chainId !== monadTestnet.id,
    disconnect,
    async switchToMonad() {
      await switchChainAsync({ chainId: monadTestnet.id });
    },
    async depositOnchain(accountId = 1, amount = "0.01") {
      const hash = await writeContractAsync({
        address: (process.env.NEXT_PUBLIC_POOL_VAULT_ADDRESS ?? "0x0000000000000000000000000000000000000000") as `0x${string}`,
        abi: poolVaultAbi,
        functionName: "deposit",
        args: [BigInt(accountId), parseEther(amount)]
      });

      setLastHash(hash);
      return hash;
    },
    txHash: lastHash,
    explorerHref: lastHash ? `${monadTestnet.blockExplorers.default.url}/tx/${lastHash}` : undefined
  };
}
