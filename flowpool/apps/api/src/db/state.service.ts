import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";

type PolicyMode = "conservative" | "balanced" | "aggressive";

@Injectable()
export class AppStateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventEmitter2
  ) {}

  private now() {
    return new Date();
  }

  private ratios(mode: PolicyMode) {
    if (mode === "conservative") return { available: 0.8, yield: 0.1, reserve: 0.1 };
    if (mode === "aggressive") return { available: 0.55, yield: 0.35, reserve: 0.1 };
    return { available: 0.7, yield: 0.2, reserve: 0.1 };
  }

  private emitRealtime(type: string, payload: Record<string, unknown>) {
    this.events.emit("realtime.event", { type, payload, timestamp: this.now().toISOString() });
  }

  private async getPrimaryUser() {
    const user = await this.prisma.user.findFirst({ orderBy: { id: "asc" } });
    if (!user) throw new NotFoundException("No user seeded");
    return user;
  }

  private async getPrimaryAccount() {
    const account = await this.prisma.account.findFirst({ orderBy: { id: "asc" } });
    if (!account) throw new NotFoundException("No account seeded");
    return account;
  }

  private async ensurePoolState() {
    const existing = await this.prisma.poolState.findFirst({ orderBy: { id: "asc" } });
    if (existing) return existing;

    const account = await this.getPrimaryAccount();
    return this.prisma.poolState.create({
      data: {
        totalLiquidity: account.pooledBalance,
        availableLiquidity: account.availableBalance,
        allocatedLiquidity: Math.max(account.pooledBalance - account.availableBalance - 1, 0),
        safetyReserve: 1,
        policyMode: "balanced"
      }
    });
  }

  private createLedgerEntry(data: Prisma.LedgerEntryUncheckedCreateInput) {
    return this.prisma.ledgerEntry.create({ data });
  }

  private async computePoolOverview() {
    const account = await this.getPrimaryAccount();
    const pool = await this.ensurePoolState();
    const usageEvents = await this.prisma.usageEvent.findMany({
      where: { accountId: account.id, createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
    });
    const agents = await this.prisma.agent.findMany({ where: { accountId: account.id } });
    const recharges = await this.prisma.rechargeRequest.findMany({
      where: { accountId: account.id },
      orderBy: { createdAt: "desc" },
      take: 1
    });

    const usageToday = usageEvents.reduce((sum, item) => sum + item.amountCharged, 0);
    const rechargePressure = account.availableBalance < account.autoRechargeThreshold;
    const poolHealth =
      account.availableBalance < 5 ? "critical" : account.availableBalance < 12 ? "warning" : account.availableBalance < 28 ? "stable" : "healthy";
    const autoRechargeStatus = !account.autoRechargeEnabled
      ? "disabled"
      : recharges[0]?.status === "completed"
        ? "completed"
        : recharges[0]?.status === "pending"
          ? "pending"
          : recharges[0]?.status === "triggered"
            ? "triggered"
            : rechargePressure
              ? "armed"
              : "completed";

    return {
      totalBalance: account.totalBalance,
      availableLiquidity: account.availableBalance,
      inPool: account.pooledBalance,
      yieldAccrued: account.yieldBalance,
      usageToday: Number(usageToday.toFixed(2)),
      autoRechargeStatus,
      activeAgents: agents.filter((agent) => agent.status === "active").length,
      poolHealth,
      policyMode: pool.policyMode,
      totalLiquidity: pool.totalLiquidity,
      allocatedLiquidity: pool.allocatedLiquidity,
      safetyReserve: pool.safetyReserve,
      projectedRunwayDays: usageToday > 0 ? Number((account.availableBalance / usageToday).toFixed(1)) : 30
    };
  }

  async authState() {
    const user = await this.getPrimaryUser();
    const account = await this.getPrimaryAccount();
    return { user, account, pool: await this.computePoolOverview() };
  }

  async createTopup(amount: number) {
    const user = await this.getPrimaryUser();
    const account = await this.getPrimaryAccount();
    return this.prisma.pixPayment.create({
      data: {
        userId: user.id,
        accountId: account.id,
        externalRef: `PIX-${Math.floor(1000 + Math.random() * 9000)}`,
        amount,
        status: "pending",
        qrCodePayload: `mock-pix://${amount}/${Date.now()}`
      }
    });
  }

  async confirmTopup(id: string) {
    const paymentId = Number(id.replace("pix_", "")) || Number(id);
    const payment = await this.prisma.pixPayment.findFirst({ where: { OR: [{ id: paymentId }, { externalRef: id }] } });
    if (!payment) throw new NotFoundException("Payment not found");

    const account = await this.getPrimaryAccount();
    const pool = await this.ensurePoolState();
    const split = this.ratios(pool.policyMode as PolicyMode);
    const available = Number((payment.amount * split.available).toFixed(2));
    const yieldAllocation = Number((payment.amount * split.yield).toFixed(2));
    const reserve = Number((payment.amount * split.reserve).toFixed(2));

    const [, updatedPayment] = await this.prisma.$transaction([
      this.prisma.account.update({
        where: { id: account.id },
        data: {
          totalBalance: { increment: payment.amount },
          availableBalance: { increment: available },
          pooledBalance: { increment: payment.amount }
        }
      }),
      this.prisma.pixPayment.update({
        where: { id: payment.id },
        data: { status: "confirmed", settledAt: this.now() }
      }),
      this.prisma.poolState.update({
        where: { id: pool.id },
        data: {
          totalLiquidity: { increment: payment.amount },
          availableLiquidity: { increment: available },
          allocatedLiquidity: { increment: yieldAllocation },
          safetyReserve: { increment: reserve },
          policyMode: pool.policyMode
        }
      }),
      this.createLedgerEntry({
        accountId: account.id,
        type: "pix_topup",
        direction: "credit",
        amount: payment.amount,
        category: "pix_topup",
        referenceId: payment.externalRef
      }),
      this.createLedgerEntry({
        accountId: account.id,
        type: "pool_deposit",
        direction: "credit",
        amount: available,
        category: "pool_deposit",
        referenceId: payment.externalRef,
        metadataJson: JSON.stringify({ available, yieldAllocation, reserve })
      })
    ]);

    this.emitRealtime("pix.payment_confirmed", { paymentId: updatedPayment.id, externalRef: updatedPayment.externalRef });
    this.emitRealtime("pool.funded", { paymentId: updatedPayment.id, available, yieldAllocation, reserve });
    return updatedPayment;
  }

  async listPayments() {
    return this.prisma.pixPayment.findMany({ orderBy: { createdAt: "desc" } });
  }

  async getPoolOverview() {
    return this.computePoolOverview();
  }

  async setPolicy(policyMode: PolicyMode) {
    const pool = await this.ensurePoolState();
    const account = await this.getPrimaryAccount();
    const split = this.ratios(policyMode);
    const availableLiquidity = Number((pool.totalLiquidity * split.available).toFixed(2));
    const allocatedLiquidity = Number((pool.totalLiquidity * split.yield).toFixed(2));
    const safetyReserve = Number((pool.totalLiquidity - availableLiquidity - allocatedLiquidity).toFixed(2));

    await this.prisma.$transaction([
      this.prisma.poolState.update({
        where: { id: pool.id },
        data: { policyMode, availableLiquidity, allocatedLiquidity, safetyReserve }
      }),
      this.prisma.account.update({
        where: { id: account.id },
        data: { availableBalance: availableLiquidity }
      }),
      this.createLedgerEntry({
        accountId: account.id,
        type: "rebalance",
        direction: "credit",
        amount: 0,
        category: "rebalance",
        metadataJson: JSON.stringify({ policyMode, availableLiquidity, allocatedLiquidity, safetyReserve })
      })
    ]);

    this.emitRealtime("pool.rebalanced", { policyMode, availableLiquidity, allocatedLiquidity, safetyReserve });
    return this.computePoolOverview();
  }

  async getLedger() {
    return this.prisma.ledgerEntry.findMany({ orderBy: { createdAt: "desc" } });
  }

  async getLedgerSummary() {
    const [credits, debits, count] = await Promise.all([
      this.prisma.ledgerEntry.aggregate({ _sum: { amount: true }, where: { direction: "credit" } }),
      this.prisma.ledgerEntry.aggregate({ _sum: { amount: true }, where: { direction: "debit" } }),
      this.prisma.ledgerEntry.count()
    ]);
    return {
      credits: credits._sum.amount ?? 0,
      debits: debits._sum.amount ?? 0,
      count
    };
  }

  async recordUsage(payload: { sourceType: string; sourceName: string; units: number; unitCost: number; metadata?: Record<string, unknown> }) {
    const account = await this.getPrimaryAccount();
    const pool = await this.ensurePoolState();
    const amount = Number((payload.units * payload.unitCost).toFixed(2));

    if (account.availableBalance < amount) {
      const recharge = await this.evaluateRecharge("insufficient_balance");
      const blocked = await this.prisma.usageEvent.create({
        data: {
          accountId: account.id,
          sourceType: payload.sourceType,
          sourceName: payload.sourceName,
          units: payload.units,
          unitCost: payload.unitCost,
          amountCharged: amount,
          metadataJson: JSON.stringify({ ...(payload.metadata ?? {}), blocked: true })
        }
      });
      return { blocked: true, recharge, usage: blocked };
    }

    const [, usage] = await this.prisma.$transaction([
      this.prisma.account.update({
        where: { id: account.id },
        data: {
          totalBalance: { decrement: amount },
          availableBalance: { decrement: amount }
        }
      }),
      this.prisma.usageEvent.create({
        data: {
          accountId: account.id,
          sourceType: payload.sourceType,
          sourceName: payload.sourceName,
          units: payload.units,
          unitCost: payload.unitCost,
          amountCharged: amount,
          metadataJson: JSON.stringify(payload.metadata ?? {})
        }
      }),
      this.prisma.poolState.update({
        where: { id: pool.id },
        data: {
          totalLiquidity: { decrement: amount },
          availableLiquidity: { decrement: amount }
        }
      }),
      this.createLedgerEntry({
        accountId: account.id,
        type: "usage_charge",
        direction: "debit",
        amount,
        category: "usage_charge",
        metadataJson: JSON.stringify(payload.metadata ?? {})
      })
    ]);

    this.emitRealtime("usage.charged", { usageId: usage.id, sourceType: usage.sourceType, amount });
    await this.evaluateRecharge("threshold_check");
    return { blocked: false, usage };
  }

  async getUsageStats() {
    const account = await this.getPrimaryAccount();
    const [count, spend, blocked] = await Promise.all([
      this.prisma.usageEvent.count({ where: { accountId: account.id } }),
      this.prisma.usageEvent.aggregate({ _sum: { amountCharged: true }, where: { accountId: account.id } }),
      this.prisma.usageEvent.count({ where: { accountId: account.id, metadataJson: { contains: "\"blocked\":true" } } })
    ]);
    const overview = await this.computePoolOverview();
    return {
      count,
      spend: spend._sum.amountCharged ?? 0,
      blocked,
      runwayEstimate: overview.projectedRunwayDays
    };
  }

  async getUsageFeed() {
    const account = await this.getPrimaryAccount();
    return this.prisma.usageEvent.findMany({ where: { accountId: account.id }, orderBy: { createdAt: "desc" } });
  }

  async evaluateRecharge(triggerReason = "threshold_check") {
    const account = await this.getPrimaryAccount();
    if (!account.autoRechargeEnabled || account.availableBalance >= account.autoRechargeThreshold) return null;

    const existing = await this.prisma.rechargeRequest.findFirst({
      where: { accountId: account.id, status: { in: ["pending", "triggered"] } },
      orderBy: { createdAt: "desc" }
    });
    if (existing) return existing;

    const recharge = await this.prisma.rechargeRequest.create({
      data: {
        accountId: account.id,
        amount: account.suggestedRechargeAmount,
        status: "triggered",
        triggerReason
      }
    });

    await this.createLedgerEntry({
      accountId: account.id,
      type: "recharge_requested",
      direction: "credit",
      amount: recharge.amount,
      category: "recharge_requested",
      referenceId: String(recharge.id),
      metadataJson: JSON.stringify({ triggerReason })
    });

    this.emitRealtime("recharge.triggered", { rechargeId: recharge.id, amount: recharge.amount });
    return recharge;
  }

  async completeRecharge(id: string) {
    const rechargeId = Number(id.replace("rch_", "")) || Number(id);
    const recharge = await this.prisma.rechargeRequest.findFirst({ where: { OR: [{ id: rechargeId }] } });
    if (!recharge) throw new NotFoundException("Recharge not found");

    const updated = await this.prisma.rechargeRequest.update({
      where: { id: recharge.id },
      data: { status: "completed", completedAt: this.now() }
    });

    const payment = await this.createTopup(updated.amount);
    await this.confirmTopup(String(payment.id));
    return updated;
  }

  async listRecharges() {
    const account = await this.getPrimaryAccount();
    return this.prisma.rechargeRequest.findMany({ where: { accountId: account.id }, orderBy: { createdAt: "desc" } });
  }

  async listAgents() {
    const account = await this.getPrimaryAccount();
    return this.prisma.agent.findMany({ where: { accountId: account.id }, orderBy: { createdAt: "desc" } });
  }

  async getAgent(id: string) {
    const numericId = Number(id.replace("agent_", "")) || Number(id);
    return this.prisma.agent.findFirst({ where: { OR: [{ id: numericId }, { name: id }] } });
  }

  async createAgent(payload: { name: string; maxBudget: number; priority: "low" | "medium" | "high"; permissions: string[] }) {
    const account = await this.getPrimaryAccount();
    return this.prisma.agent.create({
      data: {
        accountId: account.id,
        name: payload.name,
        status: "active",
        maxBudget: payload.maxBudget,
        currentSpend: 0,
        priority: payload.priority,
        permissionsJson: JSON.stringify(payload.permissions)
      }
    });
  }

  async topUpAgentBudget(id: string, amount: number) {
    const agent = await this.getAgent(id);
    if (!agent) throw new NotFoundException("Agent not found");
    return this.prisma.agent.update({
      where: { id: agent.id },
      data: { maxBudget: { increment: amount } }
    });
  }

  async runAgentTask(id: string, taskType: string, cost: number) {
    const agent = await this.getAgent(id);
    if (!agent) throw new NotFoundException("Agent not found");
    if (agent.status === "paused") return null;
    if (agent.currentSpend + cost > agent.maxBudget) {
      const updatedAgent = await this.prisma.agent.update({
        where: { id: agent.id },
        data: { status: "exhausted" }
      });
      return { blocked: true, agent: updatedAgent };
    }

    const nextSpend = Number((agent.currentSpend + cost).toFixed(2));
    const nextStatus = agent.maxBudget - nextSpend < 5 ? "low_budget" : "active";

    const [, task, updatedAgent] = await this.prisma.$transaction([
      this.prisma.agent.update({
        where: { id: agent.id },
        data: { currentSpend: nextSpend, status: nextStatus }
      }),
      this.prisma.agentTask.create({
        data: {
          agentId: agent.id,
          taskType,
          cost,
          status: "completed",
          metadataJson: JSON.stringify({ taskType })
        }
      }),
      this.prisma.agent.findUniqueOrThrow({ where: { id: agent.id } })
    ]);

    const usage = await this.recordUsage({
      sourceType: "agent",
      sourceName: agent.name,
      units: 1,
      unitCost: cost,
      metadata: { taskType, agentId: agent.id }
    });
    this.emitRealtime("agent.task_completed", { agentId: agent.id, taskType, cost });
    return { blocked: false, agent: updatedAgent, task, usage };
  }

  async simulateYield(basisPoints = 24) {
    const account = await this.getPrimaryAccount();
    const pool = await this.ensurePoolState();
    const accruedYield = Number(((pool.allocatedLiquidity * basisPoints) / 10000).toFixed(2));

    const [, snapshot] = await this.prisma.$transaction([
      this.prisma.account.update({
        where: { id: account.id },
        data: {
          yieldBalance: { increment: accruedYield },
          totalBalance: { increment: accruedYield }
        }
      }),
      this.prisma.yieldSnapshot.create({
        data: {
          poolStateId: pool.id,
          allocatedBase: pool.allocatedLiquidity,
          accruedYield,
          apyEstimate: 4.8
        }
      }),
      this.createLedgerEntry({
        accountId: account.id,
        type: "yield_credit",
        direction: "credit",
        amount: accruedYield,
        category: "yield_credit",
        referenceId: `yield_${Date.now()}`
      })
    ]);

    this.emitRealtime("yield.simulated", { accruedYield, basisPoints });
    return snapshot;
  }

  async getYieldStats() {
    const account = await this.getPrimaryAccount();
    const pool = await this.ensurePoolState();
    return {
      yieldBalance: account.yieldBalance,
      allocatedBase: pool.allocatedLiquidity,
      status: pool.allocatedLiquidity > 0 ? "accruing" : "inactive"
    };
  }
}
