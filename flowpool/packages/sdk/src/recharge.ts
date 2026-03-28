const api = (base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") => `${base}/api`;

export async function evaluateRecharge() {
  const response = await fetch(`${api()}/recharge/evaluate`, { method: "POST" });
  return response.json();
}
