const api = (base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") => `${base}/api`;

export async function createTopup(payload: { amount: number; userId?: number }) {
  const response = await fetch(`${api()}/payments/topup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return response.json();
}

export async function confirmTopup(id: string) {
  const response = await fetch(`${api()}/payments/${id}/confirm`, { method: "POST" });
  return response.json();
}
