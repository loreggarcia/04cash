import type { ActivityEvent, AgentSummary, LedgerEntry, PixCharge, PoolOverview, UsageFeedItem } from "@flowpool/types";

export const poolOverview: PoolOverview = {
  totalBalance: 148.4,
  availableLiquidity: 91.75,
  inPool: 129.2,
  yieldAccrued: 4.18,
  usageToday: 18.64,
  autoRechargeStatus: "armed",
  activeAgents: 3,
  poolHealth: "stable",
  policyMode: "balanced",
  totalLiquidity: 129.2,
  allocatedLiquidity: 25.84,
  safetyReserve: 11.61,
  projectedRunwayDays: 8.6
};

export const growthSeries = [
  { label: "09:00", liquidity: 24, usage: 3.4, yield: 0.2 },
  { label: "11:00", liquidity: 58, usage: 5.6, yield: 0.8 },
  { label: "13:00", liquidity: 96, usage: 7.1, yield: 1.1 },
  { label: "15:00", liquidity: 114, usage: 11.2, yield: 2.3 },
  { label: "17:00", liquidity: 129.2, usage: 18.64, yield: 4.18 }
];

export const allocationSeries = [
  { name: "Available", value: 91.75 },
  { name: "Yield", value: 25.84 },
  { name: "Reserve", value: 11.61 }
];

export const activity: ActivityEvent[] = [
  {
    id: "act_1",
    title: "Pool funded",
    description: "Pix payment confirmed and split into balanced policy buckets",
    type: "pool_funded",
    amount: 40,
    status: "success",
    createdAt: "2026-03-22T14:00:00Z",
    reference: "PIX-9021"
  },
  {
    id: "act_2",
    title: "API request settled",
    description: "Vision endpoint charged against available liquidity",
    type: "usage_charged",
    amount: 1.2,
    status: "info",
    createdAt: "2026-03-22T14:08:00Z",
    reference: "REQ-112"
  },
  {
    id: "act_3",
    title: "Recharge armed",
    description: "Available liquidity moved under the configured threshold buffer",
    type: "recharge",
    status: "warning",
    createdAt: "2026-03-22T14:12:00Z"
  },
  {
    id: "act_4",
    title: "Yield credited",
    description: "Mock strategy returned a small background yield snapshot",
    type: "yield",
    amount: 0.62,
    status: "success",
    createdAt: "2026-03-22T14:14:00Z"
  }
];

export const usageFeed: UsageFeedItem[] = [
  { id: "u1", sourceType: "api", sourceName: "Embeddings API", category: "api_call", units: 24, unitCost: 0.04, amountCharged: 0.96, createdAt: "2026-03-22T13:44:00Z" },
  { id: "u2", sourceType: "ai", sourceName: "Inference Runner", category: "model_inference", units: 8, unitCost: 0.15, amountCharged: 1.2, createdAt: "2026-03-22T13:51:00Z" },
  { id: "u3", sourceType: "agent", sourceName: "SalesBot", category: "agent_task", units: 1, unitCost: 2.4, amountCharged: 2.4, createdAt: "2026-03-22T14:07:00Z" },
  { id: "u4", sourceType: "internal_service", sourceName: "Usage Batch Finalizer", category: "internal_payment", units: 1, unitCost: 0.28, amountCharged: 0.28, createdAt: "2026-03-22T14:13:00Z" }
];

export const agents: AgentSummary[] = [
  { id: "a1", name: "SalesBot", status: "active", maxBudget: 40, currentSpend: 15.8, priority: "high", permissions: ["can_use_api", "can_use_ai"], liveSpendRate: 2.8 },
  { id: "a2", name: "DataBot", status: "low_budget", maxBudget: 24, currentSpend: 19.4, priority: "medium", permissions: ["can_use_api", "can_trigger_usage"], liveSpendRate: 1.6 },
  { id: "a3", name: "OpsBot", status: "throttled", maxBudget: 18, currentSpend: 11.1, priority: "medium", permissions: ["can_pay_agents", "can_trigger_usage"], liveSpendRate: 0.9 }
];

export const ledgerEntries: LedgerEntry[] = [
  { id: "l1", type: "pix_topup", direction: "credit", amount: 40, category: "pix_topup", referenceId: "PIX-9021", createdAt: "2026-03-22T14:00:00Z" },
  { id: "l2", type: "pool_deposit", direction: "credit", amount: 28, category: "pool_deposit", referenceId: "ALLOC-990", createdAt: "2026-03-22T14:01:00Z" },
  { id: "l3", type: "usage_charge", direction: "debit", amount: 1.2, category: "usage_charge", referenceId: "REQ-112", createdAt: "2026-03-22T14:08:00Z" },
  { id: "l4", type: "yield_credit", direction: "credit", amount: 0.62, category: "yield_credit", referenceId: "YIELD-119", createdAt: "2026-03-22T14:14:00Z" }
];

export const pixCharge: PixCharge = {
  id: "pix_1",
  externalRef: "PIX-9021",
  amount: 40,
  status: "pending",
  qrCodePayload: "00020101021226810014br.gov.bcb.pix2579flowpool.example/charge/PIX-90215204000053039865802BR5921Lorena Demo FlowPool6009Sao Paulo62070503***6304A12F",
  createdAt: "2026-03-22T13:58:00Z"
};
