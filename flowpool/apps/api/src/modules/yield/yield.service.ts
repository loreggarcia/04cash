import { Injectable } from "@nestjs/common";
import { AppStateService } from "../../db/state.service";

@Injectable()
export class YieldService {
  constructor(private readonly store: AppStateService) {}
  simulate() { return this.store.simulateYield(); }
  stats() { return this.store.getYieldStats(); }
}
