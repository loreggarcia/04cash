const api = (base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") => `${base}/api`;

export async function triggerUsage(path: "api-call" | "ai-call" | "agent-task", payload: Record<string, unknown>) {
  const response = await fetch(`${api()}/usage/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return response.json();
}
