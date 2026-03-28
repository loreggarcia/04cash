import { Injectable } from "@nestjs/common";
import { AppStateService } from "../../db/state.service";

@Injectable()
export class LedgerService {
  constructor(private readonly store: AppStateService) {}
  list() { return this.store.getLedger(); }
  summary() { return this.store.getLedgerSummary(); }
}
