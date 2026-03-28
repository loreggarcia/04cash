"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

const colors = ["#53e6d5", "#74f39d", "#f6b663"];

export function AllocationChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <Card className="h-[340px]">
      <div className="mb-5">
        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Allocation</div>
        <h3 className="mt-2 text-xl font-semibold">Available vs yield vs reserve</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">Hover to inspect both absolute value and allocation mix.</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={70} outerRadius={95} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#171820",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              color: "#fcfcfd"
            }}
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
