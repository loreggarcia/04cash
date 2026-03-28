import { Injectable } from "@nestjs/common";
import { AppStateService } from "../../db/state.service";

@Injectable()
export class AgentsService {
  constructor(private readonly store: AppStateService) {}
  create(payload: { name: string; maxBudget: number; priority: "low" | "medium" | "high"; permissions: string[] }) { return this.store.createAgent(payload); }
  budget(id: string, amount: number) { return this.store.topUpAgentBudget(id, amount); }
  runTask(id: string, taskType: string, cost: number) { return this.store.runAgentTask(id, taskType, cost); }
  list() { return this.store.listAgents(); }
  get(id: string) { return this.store.getAgent(id); }
}
