"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";

export function PoolGrowthChart({ data }: { data: Array<{ label: string; liquidity: number; usage: number; yield: number }> }) {
  return (
    <Card className="h-[340px]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Pool growth</div>
          <h3 className="mt-2 text-xl font-semibold">Liquidity activated through the day</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">Available liquidity shown in USD-equivalent demo units over time.</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="liquidity" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#53e6d5" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#53e6d5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="label" stroke="#aeb5c7" tickLine={false} axisLine={false} />
          <YAxis stroke="#aeb5c7" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "#171820",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              color: "#fcfcfd"
            }}
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Area type="monotone" dataKey="liquidity" stroke="#53e6d5" fill="url(#liquidity)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
