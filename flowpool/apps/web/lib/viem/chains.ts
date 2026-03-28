import { defineChain } from "viem";

export const monadTestnet = defineChain({
  id: Number(process.env.NEXT_PUBLIC_MONAD_TESTNET_CHAIN_ID ?? 10143),
  name: "Monad Testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_MONAD_TESTNET_RPC_URL ?? "https://testnet-rpc.monad.xyz"] }
  },
  blockExplorers: {
    default: { name: "Monad Vision", url: "https://testnet.monadvision.com" }
  },
  testnet: true
});
