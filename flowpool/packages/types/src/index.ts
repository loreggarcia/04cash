export type PolicyMode = "conservative" | "balanced" | "aggressive";
export type PoolHealth = "healthy" | "stable" | "warning" | "critical";
export type WalletUiState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "wrong_network"
  | "switching"
  | "tx_pending"
  | "tx_confirmed";

export type LedgerCategory =
  | "pix_topup"
  | "pool_deposit"
  | "usage_charge"
  | "agent_payment"
  | "recharge"
  | "yield_credit"
  | "rebalance"
  | "withdrawal";

export interface PoolOverview {
  totalBalance: number;
  availableLiquidity: number;
  inPool: number;
  yieldAccrued: number;
  usageToday: number;
  autoRechargeStatus: "disabled" | "armed" | "triggered" | "pending" | "completed";
  activeAgents: number;
  poolHealth: PoolHealth;
  policyMode: PolicyMode;
  totalLiquidity: number;
  allocatedLiquidity: number;
  safetyReserve: number;
  projectedRunwayDays: number;
}

export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  type:
    | "pix_confirmed"
    | "pool_funded"
    | "usage_charged"
    | "agent_task"
    | "recharge"
    | "yield"
    | "onchain_tx";
  amount?: number;
  status: "info" | "success" | "warning" | "critical";
  createdAt: string;
  reference?: string;
}

export interface UsageFeedItem {
  id: string;
  sourceType: "api" | "ai" | "agent" | "internal_service";
  sourceName: string;
  category: "api_call" | "ai_tokens" | "model_inference" | "agent_task" | "internal_payment";
  units: number;
  unitCost: number;
  amountCharged: number;
  createdAt: string;
  blocked?: boolean;
}

export interface AgentSummary {
  id: string;
  name: string;
  status: "active" | "paused" | "low_budget" | "high_activity" | "throttled" | "exhausted";
  maxBudget: number;
  currentSpend: number;
  priority: "low" | "medium" | "high";
  permissions: string[];
  liveSpendRate: number;
}

export interface LedgerEntry {
  id: string;
  type: string;
  direction: "credit" | "debit";
  amount: number;
  category: LedgerCategory | "recharge_requested";
  referenceId?: string;
  metadataJson?: string;
  createdAt: string;
}

export interface PixCharge {
  id: string;
  externalRef: string;
  amount: number;
  status: "pending" | "confirmed" | "failed";
  qrCodePayload: string;
  createdAt: string;
  settledAt?: string;
}
