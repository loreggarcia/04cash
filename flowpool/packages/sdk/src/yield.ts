const api = (base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") => `${base}/api`;

export async function simulateYield() {
  const response = await fetch(`${api()}/yield/simulate`, { method: "POST" });
  return response.json();
}
