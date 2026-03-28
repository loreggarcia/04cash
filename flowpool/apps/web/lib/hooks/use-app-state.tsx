"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ActivityEvent, AgentSummary, LedgerEntry, PixCharge, PoolOverview, UsageFeedItem } from "@flowpool/types";
import { activity as seededActivity, agents as seededAgents, ledgerEntries as seededLedger, poolOverview as seededPool, usageFeed as seededUsage } from "@/lib/mocks/data";

type ActionState = "idle" | "loading" | "success" | "error";
type PolicyMode = "conservative" | "balanced" | "aggressive";
type ToastTone = "success" | "warning" | "error" | "info";

interface Toast {
  id: string;
  title: string;
  message: string;
  tone: ToastTone;
}

interface AppStateContextValue {
  pool: PoolOverview;
  activity: ActivityEvent[];
  usageFeed: UsageFeedItem[];
  agents: AgentSummary[];
  ledger: LedgerEntry[];
  currentCharge: PixCharge | null;
  paymentStatus: "idle" | "awaiting_generation" | "pix_generated" | "payment_pending" | "payment_received" | "allocation_completed" | "ready_for_usage";
  actionStates: Record<string, ActionState>;
  toasts: Toast[];
  allocationPreview: PoolOverview | null;
  recommendedStep: string;
  setAllocationPreview: (mode: PolicyMode | null) => void;
  generatePixCharge: (amount: number) => Promise<void>;
  confirmPixCharge: () => Promise<void>;
  applyPolicy: (mode: PolicyMode) => Promise<void>;
  simulateUsage: (input: { sourceType: "api" | "ai"; sourceName: string; units: number; unitCost: number }) => Promise<void>;
  runAgentTask: (agentId: string, cost: number) => Promise<void>;
  simulateYield: () => Promise<void>;
  dismissToast: (id: string) => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

const policySplits: Record<PolicyMode, { available: number; yield: number; reserve: number; label: string }> = {
  conservative: { available: 0.8, yield: 0.1, reserve: 0.1, label: "Stable runway, lower yield allocation" },
  balanced: { available: 0.7, yield: 0.2, reserve: 0.1, label: "Balanced between spend readiness and background yield" },
  aggressive: { available: 0.55, yield: 0.35, reserve: 0.1, label: "Higher yield exposure, lower immediate liquidity" }
};

const capabilityLabels: Record<string, string> = {
  can_use_api: "Can execute API-backed tasks",
  can_use_ai: "Can run AI-assisted operations",
  can_trigger_usage: "Can trigger spend events",
  can_pay_agents: "Can route agent-to-agent payments"
};

function clonePool(pool: PoolOverview): PoolOverview {
  return JSON.parse(JSON.stringify(pool)) as PoolOverview;
}

function sleep(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${path}`);
  }

  return response.json() as Promise<T>;
}

function deriveActivityFromLedger(ledger: LedgerEntry[]): ActivityEvent[] {
  return ledger.slice(0, 10).map((entry) => ({
    id: entry.id,
    title:
      entry.type === "pix_topup"
        ? "Payment received"
        : entry.type === "pool_deposit"
          ? "Pool funded"
          : entry.type === "usage_charge"
            ? "Usage settled"
            : entry.type === "yield_credit"
              ? "Yield accrued"
              : entry.type === "recharge_requested"
                ? "Recharge triggered"
                : entry.type === "rebalance"
                  ? "Pool rebalanced"
                  : entry.type,
    description: `${entry.category.replaceAll("_", " ")} recorded in the ledger`,
    type:
      entry.type === "pix_topup"
        ? "pix_confirmed"
        : entry.type === "pool_deposit" || entry.type === "rebalance"
          ? "pool_funded"
          : entry.type === "usage_charge"
            ? "usage_charged"
            : entry.type === "yield_credit"
              ? "yield"
              : entry.type === "recharge_requested"
                ? "recharge"
                : "onchain_tx",
    amount: entry.amount,
    status: entry.direction === "debit" ? "info" : "success",
    createdAt: entry.createdAt,
    reference: entry.referenceId
  }));
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [pool, setPool] = useState<PoolOverview>(clonePool(seededPool));
  const [activity, setActivity] = useState<ActivityEvent[]>(seededActivity);
  const [usageFeed, setUsageFeed] = useState<UsageFeedItem[]>(seededUsage);
  const [agents, setAgents] = useState<AgentSummary[]>(
    seededAgents.map((agent) => ({
      ...agent,
      permissions: agent.permissions.map((permission) => capabilityLabels[permission] ?? permission)
    }))
  );
  const [ledger, setLedger] = useState<LedgerEntry[]>(seededLedger);
  const [currentCharge, setCurrentCharge] = useState<PixCharge | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<AppStateContextValue["paymentStatus"]>("idle");
  const [actionStates, setActionStates] = useState<Record<string, ActionState>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [allocationPreview, setAllocationPreviewState] = useState<PoolOverview | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  function setActionState(key: string, value: ActionState) {
    setActionStates((previous) => ({ ...previous, [key]: value }));
  }

  function pushToast(title: string, message: string, tone: ToastTone) {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((previous) => [{ id, title, message, tone }, ...previous].slice(0, 4));
    setTimeout(() => {
      setToasts((previous) => previous.filter((toast) => toast.id !== id));
    }, 3600);
  }

  function dismissToast(id: string) {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }

  function appendActivity(entry: ActivityEvent) {
    setActivity((previous) => [entry, ...previous].slice(0, 12));
  }

  function appendLedger(entry: LedgerEntry) {
    setLedger((previous) => [entry, ...previous]);
  }

  async function refreshFromApi() {
    const [auth, usage, agentRows, ledgerRows, payments] = await Promise.all([
      fetchJson<{ pool: PoolOverview }>("/auth/me"),
      fetchJson<any[]>("/usage/feed"),
      fetchJson<any[]>("/agents"),
      fetchJson<any[]>("/ledger"),
      fetchJson<any[]>("/payments")
    ]);

    const mappedUsage: UsageFeedItem[] = usage.map((item) => ({
      id: String(item.id),
      sourceType: item.sourceType,
      sourceName: item.sourceName,
      category:
        item.sourceType === "api"
          ? "api_call"
          : item.sourceType === "ai"
            ? "model_inference"
            : item.sourceType === "agent"
              ? "agent_task"
              : "internal_payment",
      units: item.units,
      unitCost: item.unitCost,
      amountCharged: item.amountCharged,
      createdAt: item.createdAt,
      blocked: item.metadataJson?.includes("\"blocked\":true")
    }));

    const mappedAgents: AgentSummary[] = agentRows.map((agent) => {
      const permissions = JSON.parse(agent.permissionsJson ?? "[]") as string[];
      return {
        id: String(agent.id),
        name: agent.name,
        status: agent.status,
        maxBudget: agent.maxBudget,
        currentSpend: agent.currentSpend,
        priority: agent.priority,
        permissions: permissions.map((permission) => capabilityLabels[permission] ?? permission),
        liveSpendRate: Number((agent.currentSpend / Math.max(1, agent.maxBudget)).toFixed(2))
      };
    });

    const mappedLedger: LedgerEntry[] = ledgerRows.map((entry) => ({
      id: String(entry.id),
      type: entry.type,
      direction: entry.direction,
      amount: entry.amount,
      category: entry.category,
      referenceId: entry.referenceId ?? undefined,
      metadataJson: entry.metadataJson ?? undefined,
      createdAt: entry.createdAt
    }));

    const latestPayment = payments[0]
      ? {
          id: String(payments[0].id),
          externalRef: payments[0].externalRef,
          amount: payments[0].amount,
          status: payments[0].status,
          qrCodePayload: payments[0].qrCodePayload,
          createdAt: payments[0].createdAt,
          settledAt: payments[0].settledAt ?? undefined
        }
      : null;

    setPool(auth.pool);
    setUsageFeed(mappedUsage);
    setAgents(mappedAgents);
    setLedger(mappedLedger);
    setActivity(deriveActivityFromLedger(mappedLedger));
    setCurrentCharge(latestPayment);
    setPaymentStatus(
      !latestPayment
        ? "idle"
        : latestPayment.status === "pending"
          ? "pix_generated"
          : "ready_for_usage"
    );
    setIsHydrating(false);
  }

  function recomputeRunway(nextPool: PoolOverview, nextUsageFeed: UsageFeedItem[]) {
    const usageToday = nextUsageFeed.reduce((sum, entry) => sum + entry.amountCharged, 0);
    return {
      ...nextPool,
      usageToday: Number(usageToday.toFixed(2)),
      projectedRunwayDays: usageToday > 0 ? Number((nextPool.availableLiquidity / usageToday).toFixed(1)) : 30,
      poolHealth:
        nextPool.availableLiquidity < 5 ? "critical" : nextPool.availableLiquidity < 12 ? "warning" : nextPool.availableLiquidity < 28 ? "stable" : "healthy"
    } as PoolOverview;
  }

  function buildPreview(mode: PolicyMode) {
    const split = policySplits[mode];
    const totalLiquidity = pool.totalLiquidity;
    const availableLiquidity = Number((totalLiquidity * split.available).toFixed(2));
    const allocatedLiquidity = Number((totalLiquidity * split.yield).toFixed(2));
    const safetyReserve = Number((totalLiquidity - availableLiquidity - allocatedLiquidity).toFixed(2));
    return recomputeRunway(
      {
        ...pool,
        policyMode: mode,
        availableLiquidity,
        allocatedLiquidity,
        safetyReserve
      },
      usageFeed
    );
  }

  function setAllocationPreview(mode: PolicyMode | null) {
    setAllocationPreviewState(mode ? buildPreview(mode) : null);
  }

  useEffect(() => {
    refreshFromApi().catch(() => {
      setIsHydrating(false);
      pushToast("Using demo fallback", "Backend data could not be loaded. Showing local demo state instead.", "warning");
    });
  }, []);

  async function generatePixCharge(amount: number) {
    setActionState("generatePixCharge", "loading");
    setPaymentStatus("awaiting_generation");
    const charge = await fetchJson<any>("/payments/topup", {
      method: "POST",
      body: JSON.stringify({ amount })
    });
    setCurrentCharge(charge);
    setPaymentStatus("pix_generated");
    setActionState("generatePixCharge", "success");
    pushToast("Pix charge generated", "The funding request is ready. This action is simulated and does not move real funds.", "info");
  }

  async function confirmPixCharge() {
    if (!currentCharge) return;
    setActionState("confirmPixCharge", "loading");
    setPaymentStatus("payment_pending");
    await fetchJson(`/payments/${currentCharge.id}/confirm`, { method: "POST" });
    setPaymentStatus("allocation_completed");
    await refreshFromApi();
    setPaymentStatus("ready_for_usage");
    setActionState("confirmPixCharge", "success");
    pushToast("Pool funded successfully", "Funds were routed into operational liquidity, reserve, and the background yield bucket.", "success");
  }

  async function applyPolicy(mode: PolicyMode) {
    setActionState("rebalancePool", "loading");
    await fetchJson("/pool/policy", { method: "POST", body: JSON.stringify({ policyMode: mode }) });
    await refreshFromApi();
    setAllocationPreviewState(null);
    setActionState("rebalancePool", "success");
    pushToast("Policy updated", `${mode[0].toUpperCase()}${mode.slice(1)} allocation is now active.`, "success");
  }

  async function simulateUsage(input: { sourceType: "api" | "ai"; sourceName: string; units: number; unitCost: number }) {
    setActionState(`usage-${input.sourceType}`, "loading");
    const path = input.sourceType === "api" ? "/usage/api-call" : "/usage/ai-call";
    const result = await fetchJson<{ blocked?: boolean }>(path, {
      method: "POST",
      body: JSON.stringify(input)
    });
    await refreshFromApi();
    if (result.blocked) {
      setActionState(`usage-${input.sourceType}`, "error");
      pushToast("Usage event blocked", "Available liquidity is too low. Add funds or complete a recharge.", "warning");
      return;
    }
    setActionState(`usage-${input.sourceType}`, "success");
    pushToast("Usage event recorded", "The debit was applied to available liquidity and logged in the ledger.", "success");
  }

  async function runAgentTask(agentId: string, cost: number) {
    setActionState(`agent-${agentId}`, "loading");
    const result = await fetchJson<{ blocked?: boolean }>(`/agents/${agentId}/run-task`, {
      method: "POST",
      body: JSON.stringify({ taskType: "ui_task", cost })
    });
    await refreshFromApi();
    if (result?.blocked) {
      setActionState(`agent-${agentId}`, "error");
      pushToast("Agent task blocked", "Budget protection prevented this spend from being executed.", "warning");
      return;
    }
    setActionState(`agent-${agentId}`, "success");
    pushToast("Agent task charged", "Agent spend, usage, liquidity, and ledger state were updated together.", "success");
  }

  async function simulateYield() {
    setActionState("yield", "loading");
    await fetchJson("/yield/simulate", { method: "POST" });
    await refreshFromApi();
    setActionState("yield", "success");
    pushToast("Yield simulated", "Background yield was credited and logged to the ledger.", "success");
  }

  const recommendedStep = useMemo(() => {
    if (isHydrating) return "Loading current treasury state from the backend.";
    if (!currentCharge && pool.inPool <= 0) return "Your pool is not funded yet. Generate a Pix charge to activate liquidity.";
    if (currentCharge && currentCharge.status === "pending") return "A Pix charge is open. Confirm funding to route liquidity into the pool.";
    if (pool.availableLiquidity < 5) return "Liquidity is under pressure. Complete a recharge or rebalance toward immediate availability.";
    if (pool.policyMode === "balanced" && !allocationPreview) return "Your pool is funded. Review whether your current policy still matches runway and yield goals.";
    return "Usage is active. Track causal impact across usage, agents, reserve, and ledger.";
  }, [allocationPreview, currentCharge, isHydrating, pool.availableLiquidity, pool.inPool, pool.policyMode]);

  return (
    <AppStateContext.Provider
      value={{
        pool,
        activity,
        usageFeed,
        agents,
        ledger,
        currentCharge,
        paymentStatus,
        actionStates,
        toasts,
        allocationPreview,
        recommendedStep,
        setAllocationPreview,
        generatePixCharge,
        confirmPixCharge,
        applyPolicy,
        simulateUsage,
        runAgentTask,
        simulateYield,
        dismissToast
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within AppStateProvider");
  return context;
}
