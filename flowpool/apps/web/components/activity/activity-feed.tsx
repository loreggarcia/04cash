import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { ActivityEvent } from "@flowpool/types";

export function ActivityFeed({ items }: { items: ActivityEvent[] }) {
  return (
    <Card>
      <div className="mb-5">
        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Live activity</div>
        <h3 className="mt-2 text-xl font-semibold">Money flow events</h3>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-line bg-background/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
              </div>
              {item.amount ? <div className="text-sm text-cyan">{formatCurrency(item.amount)}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
