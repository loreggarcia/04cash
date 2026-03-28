import Link from "next/link";
import { Bot, ChartNoAxesCombined, Coins, Database, Repeat, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const actions = [
  { href: "/add-funds", label: "Add Funds", icon: Coins },
  { href: "/usage", label: "Simulate Usage", icon: Sparkles },
  { href: "/agents", label: "Create Agent", icon: Bot },
  { href: "/pool", label: "Rebalance Pool", icon: Repeat },
  { href: "/pool", label: "Trigger Yield", icon: ChartNoAxesCombined },
  { href: "/ledger", label: "View Ledger", icon: Database }
];

export function QuickActions() {
  return (
    <Card>
      <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted">Quick actions</div>
      <div className="grid gap-3 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href} className="flex items-center gap-3 rounded-2xl border border-line bg-background/30 p-4 transition hover:border-cyan/40">
              <Icon className="h-4 w-4 text-cyan" />
              <span className="text-sm">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
