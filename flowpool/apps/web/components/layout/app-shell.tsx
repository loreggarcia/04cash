"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, Menu, Network, Rocket, X } from "lucide-react";
import { navItems } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import { ConnectButton } from "@/components/wallet/connect-button";
import { Button } from "@/components/ui/button";
import { useWalletState } from "@/lib/hooks/use-wallet-state";
import { EnvironmentBar } from "@/components/dashboard/environment-bar";
import { Logo } from "@/components/landing/logo";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wallet = useWalletState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/78 backdrop-blur-2xl">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-8 xl:gap-10">
            <div className="flex items-center gap-4">
              <Logo />
            </div>
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    pathname === item.href && "bg-secondary/95 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-[6px] left-1/2 h-px w-0 -translate-x-1/2 bg-primary transition-all duration-300",
                      pathname === item.href && "w-full"
                    )}
                  />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2.5 lg:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/8 bg-secondary/95 px-3.5 py-2.5 text-xs lg:flex">
              <Network className="h-3.5 w-3.5 text-cyan" />
              <span className={cn("font-medium", wallet.isWrongNetwork ? "text-amber" : "text-cyan")}>
                {wallet.isWrongNetwork ? "Wrong network" : "Monad Testnet active"}
              </span>
            </div>
            {wallet.isWrongNetwork && (
              <Button variant="secondary" onClick={() => wallet.switchToMonad()}>
                Switch Network
              </Button>
            )}
            <ConnectButton />
            <Button variant="secondary" className="hidden gap-2 lg:inline-flex">
              <Bell className="h-4 w-4" />
              Activity
            </Button>
            <button
              className="p-2 text-foreground lg:hidden"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
            <nav className="container mx-auto flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    pathname === item.href && "bg-secondary text-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3">
                <ConnectButton />
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <EnvironmentBar />
        {children}
      </main>

      <Link
        href="/dashboard"
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-cyan shadow-glow md:hidden"
      >
        <Rocket className="h-4 w-4" />
        Launch
      </Link>
    </div>
  );
}
