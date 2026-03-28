export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs uppercase tracking-[0.28em] text-cyan">{eyebrow}</div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{description}</p>
    </div>
  );
}
