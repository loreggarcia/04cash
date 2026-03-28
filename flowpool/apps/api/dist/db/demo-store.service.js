"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoStoreService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
let DemoStoreService = class DemoStoreService {
    events;
    user = {
        id: 1,
        name: "Lorena Demo",
        email: "demo@flowpool.app",
        walletAddress: "0x8f92a87781C69fb4a1dA9eA8Bbe7F6bE8410FEED",
        pixIdentifier: "lorena-demo@flowpool.app"
    };
    account = {
        id: 1,
        userId: 1,
        totalBalance: 12.8,
        availableBalance: 7.6,
        pooledBalance: 10.4,
        yieldBalance: 0.8,
        autoRechargeEnabled: true,
        autoRechargeThreshold: 5,
        suggestedRechargeAmount: 20
    };
    pool = {
        id: 1,
        totalLiquidity: 10.4,
        availableLiquidity: 7.6,
        allocatedLiquidity: 1.8,
        safetyReserve: 1,
        policyMode: "balanced",
        updatedAt: new Date().toISOString()
    };
    payments = [];
    ledger = [];
    usage = [];
    recharges = [];
    agents = [
        { id: "agent_sales", accountId: 1, name: "SalesBot", status: "active", maxBudget: 40, currentSpend: 6.4, priority: "high", permissions: ["can_use_api", "can_use_ai"], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: "agent_data", accountId: 1, name: "DataBot", status: "active", maxBudget: 24, currentSpend: 5.1, priority: "medium", permissions: ["can_use_api", "can_trigger_usage"], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: "agent_ops", accountId: 1, name: "OpsBot", status: "paused", maxBudget: 18, currentSpend: 1.2, priority: "medium", permissions: ["can_pay_agents", "can_trigger_usage"], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ];
    constructor(events) {
        this.events = events;
    }
    now() {
        return new Date().toISOString();
    }
    ratios(mode) {
        if (mode === "conservative")
            return { available: 0.8, yield: 0.1, reserve: 0.1 };
        if (mode === "aggressive")
            return { available: 0.55, yield: 0.35, reserve: 0.1 };
        return { available: 0.7, yield: 0.2, reserve: 0.1 };
    }
    applyPolicySplit(policyMode) {
        const split = this.ratios(policyMode);
        const totalLiquidity = Number(this.pool.totalLiquidity.toFixed(2));
        const availableLiquidity = Number((totalLiquidity * split.available).toFixed(2));
        const allocatedLiquidity = Number((totalLiquidity * split.yield).toFixed(2));
        const safetyReserve = Number((totalLiquidity - availableLiquidity - allocatedLiquidity).toFixed(2));
        this.pool.policyMode = policyMode;
        this.pool.availableLiquidity = availableLiquidity;
        this.pool.allocatedLiquidity = allocatedLiquidity;
        this.pool.safetyReserve = safetyReserve;
        this.pool.updatedAt = this.now();
        this.account.availableBalance = availableLiquidity;
    }
    addLedger(entry) {
        const next = { id: `led_${this.ledger.length + 1}`, createdAt: this.now(), ...entry };
        this.ledger.unshift(next);
        return next;
    }
    pushRealtime(type, payload) {
        this.events.emit("realtime.event", { type, payload, timestamp: this.now() });
    }
    authState() {
        return { user: this.user, account: this.account, pool: this.getPoolOverview() };
    }
    createTopup(amount) {
        const payment = {
            id: `pix_${this.payments.length + 1}`,
            userId: this.user.id,
            accountId: this.account.id,
            externalRef: `PIX-${9000 + this.payments.length + 1}`,
            amount,
            status: "pending",
            qrCodePayload: `mock-pix://${amount}/${Date.now()}`,
            createdAt: this.now()
        };
        this.payments.unshift(payment);
        return payment;
    }
    confirmTopup(id) {
        const payment = this.payments.find((entry) => entry.id === id);
        if (!payment)
            return null;
        payment.status = "confirmed";
        payment.settledAt = this.now();
        const split = this.ratios(this.pool.policyMode);
        const available = Number((Number(payment.amount) * split.available).toFixed(2));
        const yieldAllocation = Number((Number(payment.amount) * split.yield).toFixed(2));
        const reserve = Number((Number(payment.amount) * split.reserve).toFixed(2));
        this.account.totalBalance = Number((this.account.totalBalance + Number(payment.amount)).toFixed(2));
        this.account.availableBalance = Number((this.account.availableBalance + available).toFixed(2));
        this.account.pooledBalance = Number((this.account.pooledBalance + Number(payment.amount)).toFixed(2));
        this.pool.totalLiquidity = Number((this.pool.totalLiquidity + Number(payment.amount)).toFixed(2));
        this.pool.availableLiquidity = Number((this.pool.availableLiquidity + available).toFixed(2));
        this.pool.allocatedLiquidity = Number((this.pool.allocatedLiquidity + yieldAllocation).toFixed(2));
        this.pool.safetyReserve = Number((this.pool.safetyReserve + reserve).toFixed(2));
        this.pool.updatedAt = this.now();
        this.addLedger({ accountId: 1, type: "pix_topup", direction: "credit", amount: payment.amount, category: "pix_topup", referenceId: payment.externalRef });
        this.addLedger({
            accountId: 1,
            type: "pool_deposit",
            direction: "credit",
            amount: available,
            category: "pool_deposit",
            referenceId: payment.externalRef,
            metadataJson: JSON.stringify({ available, yieldAllocation, reserve })
        });
        this.pushRealtime("pix.payment_confirmed", payment);
        this.pushRealtime("pool.funded", { paymentId: payment.id, available, yieldAllocation, reserve });
        return payment;
    }
    listPayments() {
        return this.payments;
    }
    getPoolOverview() {
        const usageToday = this.usage.reduce((sum, item) => sum + Number(item.amountCharged ?? 0), 0);
        const activeAgents = this.agents.filter((agent) => agent.status === "active").length;
        const rechargePressure = this.account.availableBalance < this.account.autoRechargeThreshold;
        const poolHealth = this.account.availableBalance > 10 ? "healthy" : this.account.availableBalance > 6 ? "stable" : this.account.availableBalance > 3 ? "warning" : "critical";
        return {
            totalBalance: this.account.totalBalance,
            availableLiquidity: this.account.availableBalance,
            inPool: this.account.pooledBalance,
            yieldAccrued: this.account.yieldBalance,
            usageToday: Number(usageToday.toFixed(2)),
            autoRechargeStatus: !this.account.autoRechargeEnabled ? "disabled" : rechargePressure ? "armed" : "completed",
            activeAgents,
            poolHealth,
            policyMode: this.pool.policyMode,
            totalLiquidity: this.pool.totalLiquidity,
            allocatedLiquidity: this.pool.allocatedLiquidity,
            safetyReserve: this.pool.safetyReserve,
            projectedRunwayDays: usageToday > 0 ? Number((this.account.availableBalance / usageToday).toFixed(1)) : 30
        };
    }
    setPolicy(policyMode) {
        const previous = {
            policyMode: this.pool.policyMode,
            availableLiquidity: this.pool.availableLiquidity,
            allocatedLiquidity: this.pool.allocatedLiquidity,
            safetyReserve: this.pool.safetyReserve
        };
        this.applyPolicySplit(policyMode);
        this.addLedger({
            accountId: 1,
            type: "rebalance",
            direction: "credit",
            amount: 0,
            category: "rebalance",
            metadataJson: JSON.stringify({
                previous,
                next: {
                    policyMode: this.pool.policyMode,
                    availableLiquidity: this.pool.availableLiquidity,
                    allocatedLiquidity: this.pool.allocatedLiquidity,
                    safetyReserve: this.pool.safetyReserve
                }
            })
        });
        this.pushRealtime("pool.rebalanced", {
            previous,
            next: {
                policyMode: this.pool.policyMode,
                availableLiquidity: this.pool.availableLiquidity,
                allocatedLiquidity: this.pool.allocatedLiquidity,
                safetyReserve: this.pool.safetyReserve
            }
        });
        return this.getPoolOverview();
    }
    getLedger() {
        return this.ledger;
    }
    getLedgerSummary() {
        return {
            credits: this.ledger.filter((item) => item.direction === "credit").reduce((sum, item) => sum + Number(item.amount ?? 0), 0),
            debits: this.ledger.filter((item) => item.direction === "debit").reduce((sum, item) => sum + Number(item.amount ?? 0), 0),
            count: this.ledger.length
        };
    }
    recordUsage(payload) {
        const amount = Number((payload.units * payload.unitCost).toFixed(2));
        if (this.account.availableBalance < amount) {
            const recharge = this.evaluateRecharge("insufficient_balance");
            const blocked = { id: `usage_${this.usage.length + 1}`, amountCharged: amount, blocked: true, createdAt: this.now(), ...payload };
            this.usage.unshift(blocked);
            return { blocked: true, recharge, usage: blocked };
        }
        this.account.availableBalance = Number((this.account.availableBalance - amount).toFixed(2));
        this.account.totalBalance = Number((this.account.totalBalance - amount).toFixed(2));
        this.pool.availableLiquidity = this.account.availableBalance;
        this.pool.totalLiquidity = Number((this.pool.availableLiquidity + this.pool.allocatedLiquidity + this.pool.safetyReserve).toFixed(2));
        const usage = {
            id: `usage_${this.usage.length + 1}`,
            accountId: 1,
            sourceType: payload.sourceType,
            sourceName: payload.sourceName,
            units: payload.units,
            unitCost: payload.unitCost,
            amountCharged: amount,
            metadataJson: JSON.stringify(payload.metadata ?? {}),
            createdAt: this.now()
        };
        this.usage.unshift(usage);
        this.addLedger({ accountId: 1, type: "usage_charge", direction: "debit", amount, category: "usage_charge", referenceId: usage.id, metadataJson: usage.metadataJson });
        this.pushRealtime("usage.charged", usage);
        this.evaluateRecharge("threshold_check");
        return { blocked: false, usage };
    }
    getUsageStats() {
        const spend = this.usage.filter((item) => !item.blocked).reduce((sum, item) => sum + Number(item.amountCharged ?? 0), 0);
        return { count: this.usage.length, spend, blocked: this.usage.filter((item) => item.blocked).length, runwayEstimate: this.getPoolOverview().projectedRunwayDays };
    }
    getUsageFeed() {
        return this.usage;
    }
    evaluateRecharge(triggerReason = "threshold_check") {
        if (!this.account.autoRechargeEnabled || this.account.availableBalance >= this.account.autoRechargeThreshold)
            return null;
        const existing = this.recharges.find((item) => item.status === "pending" || item.status === "triggered");
        if (existing)
            return existing;
        const recharge = { id: `rch_${this.recharges.length + 1}`, accountId: 1, amount: this.account.suggestedRechargeAmount, status: "triggered", triggerReason, createdAt: this.now() };
        this.recharges.unshift(recharge);
        this.addLedger({ accountId: 1, type: "recharge_requested", direction: "credit", amount: recharge.amount, category: "recharge_requested", referenceId: recharge.id });
        this.pushRealtime("recharge.triggered", recharge);
        return recharge;
    }
    completeRecharge(id) {
        const recharge = this.recharges.find((item) => item.id === id);
        if (!recharge)
            return null;
        recharge.status = "completed";
        recharge.completedAt = this.now();
        const payment = this.createTopup(Number(recharge.amount));
        this.confirmTopup(String(payment.id));
        return recharge;
    }
    listRecharges() {
        return this.recharges;
    }
    listAgents() {
        return this.agents;
    }
    getAgent(id) {
        return this.agents.find((agent) => agent.id === id) ?? null;
    }
    createAgent(payload) {
        const agent = { id: `agent_${this.agents.length + 1}`, accountId: 1, status: "active", currentSpend: 0, createdAt: this.now(), updatedAt: this.now(), ...payload };
        this.agents.unshift(agent);
        return agent;
    }
    topUpAgentBudget(id, amount) {
        const agent = this.getAgent(id);
        if (!agent)
            return null;
        agent.maxBudget = Number((Number(agent.maxBudget) + amount).toFixed(2));
        agent.updatedAt = this.now();
        return agent;
    }
    runAgentTask(id, taskType, cost) {
        const agent = this.getAgent(id);
        if (!agent || agent.status === "paused")
            return null;
        if (Number(agent.currentSpend) + cost > Number(agent.maxBudget)) {
            agent.status = "exhausted";
            return { blocked: true, agent };
        }
        agent.currentSpend = Number((Number(agent.currentSpend) + cost).toFixed(2));
        agent.updatedAt = this.now();
        if (Number(agent.maxBudget) - Number(agent.currentSpend) < 5)
            agent.status = "low_budget";
        const usage = this.recordUsage({ sourceType: "agent", sourceName: String(agent.name), units: 1, unitCost: cost, metadata: { taskType, agentId: id } });
        this.pushRealtime("agent.task_completed", { id, taskType, cost });
        return { blocked: false, agent, usage };
    }
    simulateYield(basisPoints = 24) {
        const accruedYield = Number(((this.pool.allocatedLiquidity * basisPoints) / 10000).toFixed(2));
        this.account.yieldBalance = Number((this.account.yieldBalance + accruedYield).toFixed(2));
        this.account.totalBalance = Number((this.account.totalBalance + accruedYield).toFixed(2));
        this.addLedger({ accountId: 1, type: "yield_credit", direction: "credit", amount: accruedYield, category: "yield_credit", referenceId: `yield_${Date.now()}` });
        this.pushRealtime("yield.simulated", { accruedYield, basisPoints });
        return { allocatedBase: this.pool.allocatedLiquidity, accruedYield, apyEstimate: 4.8, createdAt: this.now() };
    }
    getYieldStats() {
        return { yieldBalance: this.account.yieldBalance, allocatedBase: this.pool.allocatedLiquidity, status: this.pool.allocatedLiquidity > 0 ? "accruing" : "inactive" };
    }
};
exports.DemoStoreService = DemoStoreService;
exports.DemoStoreService = DemoStoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], DemoStoreService);
//# sourceMappingURL=demo-store.service.js.map