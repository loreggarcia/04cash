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
exports.UsageService = void 0;
const common_1 = require("@nestjs/common");
const state_service_1 = require("../../db/state.service");
const x402_service_1 = require("../../adapters/x402/x402.service");
let UsageService = class UsageService {
    store;
    x402Service;
    constructor(store, x402Service) {
        this.store = store;
        this.x402Service = x402Service;
    }
    apiCall(units, unitCost, sourceName = "API Gateway") {
        const metadata = this.x402Service.enrichUsage({ endpoint: "/v1/api", consumer: sourceName, units, cost: units * unitCost });
        return this.store.recordUsage({ sourceType: "api", sourceName, units, unitCost, metadata });
    }
    aiCall(units, unitCost, sourceName = "AI Runtime") {
        const metadata = this.x402Service.enrichUsage({ endpoint: "/v1/inference", consumer: sourceName, units, cost: units * unitCost });
        return this.store.recordUsage({ sourceType: "ai", sourceName, units, unitCost, metadata });
    }
    agentTask(units, unitCost, sourceName = "Agent Runner") {
        return this.store.recordUsage({ sourceType: "agent", sourceName, units, unitCost, metadata: { task: "agent_task" } });
    }
    stats() { return this.store.getUsageStats(); }
    feed() { return this.store.getUsageFeed(); }
};
exports.UsageService = UsageService;
exports.UsageService = UsageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [state_service_1.AppStateService, x402_service_1.X402Service])
], UsageService);
//# sourceMappingURL=usage.service.js.map