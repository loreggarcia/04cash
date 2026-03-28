"use client";

import { createConfig, http, injected } from "wagmi";
import { monadTestnet } from "../viem/chains";

export const wagmiConfig = createConfig({
  ssr: true,
  chains: [monadTestnet],
  connectors: [injected()],
  transports: {
    [monadTestnet.id]: http(monadTestnet.rpcUrls.default.http[0])
  }
});
