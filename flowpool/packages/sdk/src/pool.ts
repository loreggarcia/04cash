const api = (base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") => `${base}/api`;

export async function getPoolOverview() {
  const response = await fetch(`${api()}/pool/overview`, { cache: "no-store" });
  return response.json();
}

export async function rebalancePool(payload: { policyMode: string }) {
  const response = await fetch(`${api()}/pool/rebalance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return response.json();
}
