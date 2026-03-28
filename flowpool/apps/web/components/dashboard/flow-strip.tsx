const nodes = ["PIX INFLOW", "POOL", "USAGE", "YIELD", "RECHARGE"];

export function FlowStrip() {
  return (
    <div className="grid gap-3 rounded-3xl border border-line bg-panel/70 p-4 md:grid-cols-5">
      {nodes.map((node, index) => (
        <div key={node} className="rounded-2xl border border-cyan/10 bg-background/40 p-4 text-center">
          <div className="text-xs tracking-[0.24em] text-muted">{index + 1}</div>
          <div className="mt-2 font-medium text-cyan">{node}</div>
        </div>
      ))}
    </div>
  );
}
