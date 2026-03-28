import { Injectable } from "@nestjs/common";
import { AppStateService } from "../../db/state.service";

@Injectable()
export class PoolService {
  constructor(private readonly store: AppStateService) {}
  overview() { return this.store.getPoolOverview(); }
  rebalance(policyMode: "conservative" | "balanced" | "aggressive") { return this.store.setPolicy(policyMode); }
}
