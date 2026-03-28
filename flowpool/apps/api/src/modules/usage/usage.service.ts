import { Injectable } from "@nestjs/common";
import { AppStateService } from "../../db/state.service";
import { X402Service } from "../../adapters/x402/x402.service";

@Injectable()
export class UsageService {
  constructor(private readonly store: AppStateService, private readonly x402Service: X402Service) {}

  apiCall(units: number, unitCost: number, sourceName = "API Gateway") {
    const metadata = this.x402Service.enrichUsage({ endpoint: "/v1/api", consumer: sourceName, units, cost: units * unitCost });
    return this.store.recordUsage({ sourceType: "api", sourceName, units, unitCost, metadata });
  }

  aiCall(units: number, unitCost: number, sourceName = "AI Runtime") {
    const metadata = this.x402Service.enrichUsage({ endpoint: "/v1/inference", consumer: sourceName, units, cost: units * unitCost });
    return this.store.recordUsage({ sourceType: "ai", sourceName, units, unitCost, metadata });
  }

  agentTask(units: number, unitCost: number, sourceName = "Agent Runner") {
    return this.store.recordUsage({ sourceType: "agent", sourceName, units, unitCost, metadata: { task: "agent_task" } });
  }

  stats() { return this.store.getUsageStats(); }
  feed() { return this.store.getUsageFeed(); }
}
