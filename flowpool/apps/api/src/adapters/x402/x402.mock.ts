export function buildX402Context(payload: { endpoint: string; consumer: string; units: number; cost: number }) {
  return {
    requestId: `req_${Date.now()}`,
    endpoint: payload.endpoint,
    consumer: payload.consumer,
    units: payload.units,
    cost: payload.cost,
    metadata: {
      settlementRail: "flowpool-mock",
      pricingMode: "pay-per-request"
    }
  };
}
