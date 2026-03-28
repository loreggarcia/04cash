"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/wagmi/config";
import { AppStateProvider } from "@/lib/hooks/use-app-state";
import { ToastRegion } from "@/components/ui/toast-region";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppStateProvider>
          {children}
          <ToastRegion />
        </AppStateProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
