import { Injectable } from "@nestjs/common";
import { AppStateService } from "../../db/state.service";

@Injectable()
export class RechargeService {
  constructor(private readonly store: AppStateService) {}
  evaluate() { return this.store.evaluateRecharge(); }
  complete(id: string) { return this.store.completeRecharge(id); }
  list() { return this.store.listRecharges(); }
}
