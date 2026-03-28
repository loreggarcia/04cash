import { Injectable } from "@nestjs/common";
import { AppStateService } from "../../db/state.service";

@Injectable()
export class PaymentsService {
  constructor(private readonly store: AppStateService) {}
  createTopup(amount: number) { return this.store.createTopup(amount); }
  confirmTopup(id: string) { return this.store.confirmTopup(id); }
  list() { return this.store.listPayments(); }
}
