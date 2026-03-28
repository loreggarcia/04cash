const steps = [
  {
    title: "Fund pool",
    description: "Generate a Pix or testnet deposit request to activate liquidity."
  },
  {
    title: "Allocate liquidity",
    description: "Choose how much stays available, protected, or routed into the yield bucket."
  },
  {
    title: "Power usage & agents",
    description: "Usage and agent tasks debit the available bucket first."
  },
  {
    title: "Track everything",
    description: "Every event updates activity, metrics, and the ledger."
  },
  {
    title: "Maintain runway",
    description: "Reserve and recharge logic keep operational continuity visible."
  }
];

export function FlowOverview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="surface-elevated rounded-3xl p-5 shadow-glow md:p-6">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-cyan">Flow overview</div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">Deposit to allocation to usage to ledger</h3>
        </div>
        <div className="max-w-md text-sm font-medium text-muted-foreground">The core operating loop stays visible across the product.</div>
      </div>
      <div className={`grid gap-3 ${compact ? "md:grid-cols-5" : "md:grid-cols-5"}`}>
        {steps.map((step, index) => (
          <div key={step.title} className="surface-soft rounded-2xl p-4">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[11px] font-semibold tracking-[0.24em] text-primary">
              0{index + 1}
            </div>
            <div className="mt-3 font-semibold text-text">{step.title}</div>
            <div className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
